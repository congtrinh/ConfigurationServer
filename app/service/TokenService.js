var tokenRepo = require('../repository/TokenRepository'),
    crypto = require('crypto');

var tokenService = {
    generateToken: function () {
        return crypto.randomBytes(256).toString('hex');
    },

    getUsername: function (token) {
        return tokenRepo.getUsername(token);
    },

    upsertToken: function (token, username) {
        tokenRepo.upsertToken(token, username);
    },

    deleteToken: function (token) {
        if (this.getUsername(token) === undefined) {
            return false;
        } else {
            tokenRepo.deleteToken(token);
            return true;
        }
    }
}

module.exports = tokenService;