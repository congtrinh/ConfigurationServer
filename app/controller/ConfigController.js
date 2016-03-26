/**
 * Created by CT on 3/23/16.
 */
var tokenService = require('../service/TokenService'),
    configService = require('../service/ConfigService');


var configController = {
    createConfig: function (req, res) {
        var token = req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        } else {
            var normalizedConfig = createConfigObject(req.body.name, req.body.hostname, req.body.port, req.body.username)
            if (configService.saveConfig(tokenUser.username, normalizedConfig)) {
                res.statusCode = 200;
                res.end();
            } else {
                res.statusCode = 400;
                res.write(JSON.stringify({'message': 'Config already exist.'}))
                res.end();
            }
        }
    },

    updateConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        } else {
            var oldConfig = configService.getConfig(tokenUser.username, req.params.name)
            var normalizedConfig = createConfigObject(req.body.name, req.body.hostname, req.body.port, req.body.username)

            if(oldConfig.name != normalizedConfig.name){
                responseWithInvalid(res);
                return;
            }

            configService.deleteConfig(tokenUser.username, req.params.name) //delete if there
            if (configService.saveConfig(tokenUser.username, normalizedConfig)) {
                res.statusCode = 200;
            } else {
                configService.saveConfig(tokenUser.username, oldConfig) //Attempt to roll back

                res.statusCode = 500; //Theres really no reason why this should work. Returning 500 so client retry.
                res.write(JSON.stringify({'message': 'Unable to delete or save config.'}))
            }

            res.end();
        }
    },

    getConfig: function (req, res) {
        var token = req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        } else {
            var config = configService.getConfig(tokenUser.username, req.params.name)
            if (config) {
                res.statusCode = 200;
                res.write(JSON.stringify(config));
            } else {
                res.statusCode = 404;
                res.write(JSON.stringify({'message': "Not found."}));
            }
            res.end();
        }
    },

    getAllConfig: function (req, res) {
        var token = req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        } else {
            var configs = configService.getAll(tokenUser.username);
            if (configs) {
                res.statusCode = 200;
                var configuration = [];
                for (var key in configs) {
                    configuration.push(configs[key]);
                }
                //Sort if there is a query. Unknown key will just return unsorted
                if(req.body.sort){
                    configuration.sort(function (a, b) {
                        return a[req.body.sort] > b[req.body.sort]
                    })
                }
                
                res.write(JSON.stringify({'configuration': configuration}));
            } else {
                res.statusCode = 404;
                res.write(JSON.stringify({'message': "Not found."}));
            }
            res.end();
        }
    },

    deleteConfig: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        var tokenUser = tokenService.getUsername(token);

        if (!tokenUser) {
            responseWithUnauthorized(res);
            return;
        } else {
            if (configService.deleteConfig(tokenUser.username, req.params.name)) {
                res.statusCode = 200;
                res.write(JSON.stringify({'message': "Deleted."}));
            } else {
                res.statusCode = 404;
                res.write(JSON.stringify({'message': "Not found."}));
            }
            res.end();
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