/**
 * Created by CT on 3/23/16.
 */
var configRepo = require('../repository/ConfigRepository');

var configService = {
    
    saveConfig: function (username, config) {
        var userConfigs =  this.getAll(username);

        if(!userConfigs[config.name]){
            userConfigs[config.name] = config;
            configRepo.saveConfig(username, userConfigs);
            return true;
        } else {
            return false; //Already have a config with the same name
        }
    },

    getConfig: function (username, configName) {
        var userConfigs = this.getAll(username);
        return userConfigs[configName];
    },

    getAll: function (username) {
        var userConfigs = configRepo.getConfigs(username);
        if(!userConfigs){
            userConfigs = {};
        }
        return userConfigs;
    },

    deleteConfig: function (username, configName) {
        var userConfigs = this.getAll(username);
        if(userConfigs[configName]){
            delete userConfigs[configName];
            configRepo.saveConfig(username, userConfigs);
            return true;
        } else {
            return false; //Not found
        }
    }
};


module.exports = configService;