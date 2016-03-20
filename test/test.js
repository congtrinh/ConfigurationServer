var assert = require('assert'),
    supertest = require('supertest')
    should = require('should');

var server = supertest.agent('http://localhost:8080');

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

describe('POST /login', function () {
    it('respond with 200', function (done) {
        server
            .post('/login')
            .type('form')
            .send({"username":"myUserName", "password":"myPassword"})
            .expect(200)
            .end(function (err, res) {
                done(err);
            });
    });
});

describe('POST /login', function () {
    it('respond with 301', function (done) {
        server
            .post('/login')
            .type('form')
            .send({"username":"myUserName", "password":"unknownPassword"})
            .expect(401)
            .end(function (err, res) {
                done(err);
            });
    });
});