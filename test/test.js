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

describe('GET /hello', function () {
    it('respond with json', function (done) {
        server
            .get('/hello')
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });
});


describe('User', function () {
    var username = getRandomString();
    var password = getRandomString();
    var userRoutes = constants.routes.v1.user;

    before(function () {
        server
            .post(userRoutes.create)
            .type('form')
            .send({"username": username, "password": password})
            .expect(200).end(function (err, res) {

        });
    });

    describe('POST ' + userRoutes.login, function () {
        it('respond with 200', function (done) {
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

    describe('POST ' + userRoutes.login, function () {
        it('respond with 301', function (done) {
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
        var testData = {'token':""};

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
            it('Logout', function (done) {
                //Should work on first attempt
                server
                    .post(userRoutes.logout)
                    .set({'x-access-token': testData.token})
                    .expect(200) //Ok
                    .end(function (err, res) {
                        res.statusCode.should.equal(200);
                    });

                //Failed on second attempt
                server
                    .post(userRoutes.logout)
                    .set({'x-access-token': testData.token})
                    .expect(404) //Not found
                    .end(function (err, res) {
                        done(err)
                    });

            });
        });

    });

});
