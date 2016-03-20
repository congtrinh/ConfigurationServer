var tokenRepo = require('../repository/TokenRepository')

var tokenService = {
    generateToken: function () {

    },

    getUsername: function (token) {
        return tokenRepo.getUsername(token);
    },

    upsertToken: function (token, username) {
        tokenRepo.upsertToken(token, username);
    },

    deleteToken: function (token) {
        tokenRepo.deleteToken(token);
    }
}