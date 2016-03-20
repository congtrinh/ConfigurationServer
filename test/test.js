var assert = require('assert'),
    supertest = require('supertest')
    should = require('should'),
    crypto = require('crypto'),
    constants = require('../app/util/Constants')

var server = supertest.agent('http://localhost:8080');

var getRandomString = function () {
    return crypto.randomBytes(256).toString('hex').slice(0, 5);
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
});