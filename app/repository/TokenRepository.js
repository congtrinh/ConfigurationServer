/**
 * Mock place holder for token to hold [token,user]
 */


var tokenRepo = {

    getUsername: function(token) {
        return data[token].username;
    },

    upsertToken: function(token, username) {
        data[token].username = username;
    },

    deleteToken: function(token) {
        delete data[token];
    }
};

var data = {
    myToken:{'username':'myUserName'}

}

module.exports = tokenRepo;