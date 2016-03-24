var tokenRepo = require('../repository/TokenRepository'),
    crypto = require('crypto');

var tokenService = {
    /**
     * Simple random token generator. Should use jwt instead but that is outside the scope of this project.
     * @returns {string|String|*}
     */
    
    generateToken: function () {
        return crypto.randomBytes(256).toString('hex');
    },

    getUsername: function (token) {
        return tokenRepo.getTokenData(token);
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