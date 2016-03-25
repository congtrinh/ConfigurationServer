var assert = require('assert'),
    supertest = require('supertest'),
    should = require('should'),
    crypto = require('crypto'),
    constants = require('../app/util/Constants');

var server = supertest.agent('http://localhost:8080');

var getRandomString = function () {
    return crypto.randomBytes(256).toString('hex').slice(0, 5);
}

var parseText = function (textString) {
    return JSON.parse(textString);
}

describe('hello', function () {
    it('respond with json', function (done) {
        server
            .get('/hello')
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });
});


describe('Test', function () {
    var username = getRandomString();
    var password = getRandomString();
    var userRoutes = constants.routes.v1.user;
    var configRoutes = constants.routes.v1.config;

    before(function () {
        server
            .post(userRoutes.create)
            .type('form')
            .send({"username": username, "password": password})
            .expect(200).end(function (err, res) {

        });
    });

    describe('POST 200 ' + userRoutes.login, function () {
        it('Login', function (done) {
            server
                .post(userRoutes.login)
                .type('form')
                .send({"username": username, "password": password})
                .expect(200)
                .end(function (err, res) {
                    parseText(res.text).should.have.property('token');
                    done(err);
                });
        });
    });

    describe('POST 301' + userRoutes.login, function () {
        it('Bad password', function (done) {
            server
                .post(userRoutes.login)
                .type('form')
                .send({"username": username, "password": "unknownPassword"})
                .expect(401)
                .end(function (err, res) {
                    done(err);
                });
        });
    });

    describe('Login/Logout ' + userRoutes.logout, function () {
        var testData = {'token': ""};

        //Login
        before(function (done) {
            server
                .post(userRoutes.login)
                .type('form')
                .send({"username": username, "password": password})
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    testData.token = parseText(res.text).token;
                    done();
                });
        });


        describe('Logout ' + userRoutes.logout, function () {
            it('200 Logout first attempt', function (done) {
                //Should work on first attempt
                server
                    .post(userRoutes.logout)
                    .set({'x-access-token': testData.token})
                    .expect(204) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        res.statusCode.should.equal(204);
                        done()
                    });
            });

            it('404 Logout second attempt', function (done) {
                //Failed on second attempt
                server
                    .post(userRoutes.logout)
                    .set({'x-access-token': testData.token})
                    .expect(404) //Not found
                    .end(function (err, res) {
                        if (err) return done(err);
                        done()
                    });
            });
        });
    });
    describe('Configs ' + configRoutes.create, function () {
        var testData = {'token': ""};

        //Login and get token
        before(function (done) {
            server
                .post(userRoutes.login)
                .type('form')
                .send({"username": username, "password": password})
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    testData.token = parseText(res.text).token;
                    done();
                });
        });

        describe('create/Get 200: ' + configRoutes.create, function () {
            it('200 Create', function (done) {
                server
                    .post(configRoutes.create)
                    .send({
                        'name': 'testName',
                        'hostname': 'testHostname',
                        'port': 'testPort',
                        'username': 'testUsername'
                    })
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                    });
                server
                    .post(configRoutes.create)
                    .send({
                        'name': 'testName2',
                        'hostname': 'testHostname2',
                        'port': 'testPort2',
                        'username': 'testUsername2'
                    })
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                    });
                done();
            });


            it('200 Get', function (done) {
                server
                    .get("/v1/config/testName")
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        var jsonResBody = parseText(res.text);
                        jsonResBody.should.have.property('name');
                        jsonResBody.should.have.property('hostname');
                        jsonResBody.should.have.property('port');
                        jsonResBody.should.have.property('username');

                        done();
                    });
            });

            it('200 GetAll', function (done) {
                server
                    .get("/v1/config")
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        var jsonResBody = parseText(res.text);
                        jsonResBody.should.have.property('configuration');
                        jsonResBody.configuration.should.be.instanceof(Array);

                        done();
                    });
            });
        });
        describe('create 403: ' + configRoutes.create, function () {
            it('403 Create bad token', function (done) {
                server
                    .post(configRoutes.create)
                    .set({'x-access-token': "badToken"})
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe('Get 403: ' + configRoutes.create, function () {
            it('403 Get', function (done) {
                server
                    .get("/v1/config/testName")
                    .set({'x-access-token': "badToken"})
                    .expect(403)
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe('Get 404: ' + configRoutes.create, function () {
            it('404 Get', function (done) {
                server
                    .get("/v1/config/testName_notFound")
                    .set({'x-access-token': testData.token})
                    .expect(404) //Not found
                    .end(function (err, res) {
                        if (err) return done(err);
                        done();
                    });
            });
        });

        describe('create/delete 200: ' + configRoutes.create, function () {
            it('200 Create', function (done) {
                server
                    .post(configRoutes.create)
                    .send({
                        'name': 'deleteMe',
                        'hostname': 'testHostname',
                        'port': 'testPort',
                        'username': 'testUsername'
                    })
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        done()
                    });
            });

            it('200 Delete', function (done) {
                server
                    .delete("/v1/config/deleteMe")
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        done()
                    });
            });

            it('404 Get', function (done) {
                server
                    .get("/v1/config/deleteMe")
                    .set({'x-access-token': testData.token})
                    .expect(404) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        done()
                    });
            });
        });

        describe('create/update 200: ' + configRoutes.create, function () {
            it('200 Create', function (done) {
                server
                    .post(configRoutes.create)
                    .send({
                        'name': 'updateMe',
                        'hostname': 'testHostname',
                        'port': 'testPort',
                        'username': 'testUsername'
                    })
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        done()
                    });
            });

            it('200 Get', function (done) {
                server
                    .get("/v1/config/updateMe")
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        parseText(res.text).hostname.should.be.equal("testHostname");

                        done()
                    });
            });

            it('200 Update', function (done) {
                server
                    .put("/v1/config/updateMe")
                    .send({
                        'name': 'updateMe',
                        'hostname': 'updateHostname',
                        'port': 'testPort',
                        'username': 'testUsername'
                    })
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        done()
                    });
            });

            it('200 Get', function (done) {
                server
                    .get("/v1/config/updateMe")
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        if (err) return done(err);
                        parseText(res.text).hostname.should.be.equal("updateHostname");

                        done()
                    });
            });
        });
    });
});
