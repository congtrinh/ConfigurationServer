/**
 * Mock place holder for user DB that contains configs for users.
 */

var configRepo = {

    getConfigs: function(username) {
        return data[username];
    },

    saveConfig: function(username, configs) {
        data[username] = configs;
    },

    deleteConfig: function(username) {
        delete data[username];
    }
};

var data = {
    myUserName:{}
}

module.exports = configRepo;