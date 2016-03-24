/**
 * Created by CT on 3/23/16.
 */
var tokenService = require('../service/TokenService'),
 configService = require('../service/ConfigService');



var configController = {
    createConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if(!tokenUser){
            responseWithUnauthorized(res);
            return;
        } else {
            var configObject = createConfigObject("kingcong", "kingcongHost", "kingcongPort", "kingcongUsername");
            configService.saveConfig(tokenUser.username, configObject);
            res.statusCode = 200;
            res.end();
        }

    },
    updateConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if(!tokenUser){
            responseWithUnauthorized(res);
            return;
        }


    },
    getConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if(!tokenUser){
            responseWithUnauthorized(res);
            return;
        }
    },
    deleteConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if(!tokenUser){
            responseWithUnauthorized(res);
            return;
        }
    }
};

var responseWithUnauthorized = function (res) {
    res.statusCode = 403;
    res.write(JSON.stringify({"message":"Unauthorized"}));
    res.end();
}


var createConfigObject = function (name, hostname, port, username) {
    var config = {"name":name, "hostname":hostname, "port":port, "username":username};
    return config;
}


module.exports = configController;