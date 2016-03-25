var userService = require('../service/UserService')
var tokenService = require('../service/TokenService')

var userContoller = {
    login: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        if (userService.verifyPassword(username, password)) {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            var token = tokenService.generateToken();
            tokenService.upsertToken(token, username);
            res.end(JSON.stringify({"token": token}));
        } else {
            res.statusCode = 401;
            res.write(JSON.stringify({'message': 'Invalid credentials.'}));
            res.end();
        }

    },

    logout: function (req, res) {
        var token = req.body.token || req.headers['x-access-token'];
        if (tokenService.deleteToken(token)) {
            res.statusCode = 204;
        } else {
            res.statusCode = 404;
        }
        res.end();
    },

    /**
     * Really isnt within scope of project but needed for testing.
     *
     * @param req
     * @param res
     */
    create: function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        if (userService.addUser(username, password)) {
            res.statusCode = 204;
        } else {
            res.statusCode = 409;
            res.write(JSON.stringify({'message': 'User already exist.'}));
        }

        res.end();
    }
};


module.exports = userContoller;