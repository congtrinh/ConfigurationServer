/**
 * Mock place holder for user DB that contains user/pass
 */

var usersRepo = {

    getPassword: function(username) {
        var userData = data[username];
        return userData === undefined ? undefined: userData.password
    },

    upsert: function(username, password) {
        data[username] = {'password':password};
    },

    delete: function(username) {
        delete data[username];
    }
};

var data = {
    myUserName:{'password':'myPassword'}

}

module.exports = usersRepo;