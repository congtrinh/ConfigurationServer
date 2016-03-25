/**
 * Created by CT on 3/23/16.
 */
var tokenService = require('../service/TokenService'),
    configService = require('../service/ConfigService');


var configController = {
    createConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        } else {
            var reqBody = JSON.parse(req.body);
            if (reqBody) {

                configService.saveConfig(tokenUser.username, reqBody);
                res.statusCode = 200;
                res.end();
            } else {

            }
        }

    },
    updateConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        }


    },
    getConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        }
    },
    deleteConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        }
    }
};

var responseWithUnauthorized = function (res) {
    res.statusCode = 403;
    res.write(JSON.stringify({"message": "Unauthorized"}));
    res.end();
}

var responseWithInvalid = function (res) {
    res.statusCode = 400;
    res.write(JSON.stringify({"message": "Invalid"}));
    res.end();
}


var createConfigObject = function (name, hostname, port, username) {
    var config = {"name": name, "hostname": hostname, "port": port, "username": username};
    return config;
}


module.exports = configController;