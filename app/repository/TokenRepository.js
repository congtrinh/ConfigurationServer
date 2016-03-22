/**
 * Mock place holder for token to hold [token,user]
 */


var tokenRepo = {

    getUsername: function(token) {
        return data[token];
    },

    upsertToken: function(token, username) {
        var tokenData = {};
        token.username = username;
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