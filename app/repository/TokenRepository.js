/**
 * Mock place holder for token to hold [token,user].
 * Real repo should have a auto invalidate mechanism to clean up old tokens.
 */


var tokenRepo = {

    getTokenData: function(token) {
        return data[token];
    },

    upsertToken: function(token, username) {
        var tokenData = {};
        tokenData.username = username;
        data[token] = tokenData;
    },

    deleteToken: function(token) {
        delete data[token];
    }
};

var data = {
    myToken:{'username':'myUserName'}

}

module.exports = tokenRepo;