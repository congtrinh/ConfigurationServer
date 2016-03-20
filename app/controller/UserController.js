
var userService = require('../service/UserService')
var tokenService = require('../service/TokenService')

var userContoller = {
    login: function (req, res) {
        var username = req.params.username;
        var password = req.params.password;

        if(userService.verifyPassword(username, password)){
            res.statusCode = 200;
        } else {
            res.statusCode = 401;
            res.write(JSON.stringify({'message':'Invalid credentials'}));

        }
        res.end()
    },
    
    logout: function (req, res) {
        var authorizationToken = req.headers.authorization;
        tokenService.deleteToken()
    }
    
};


module.exports = userContoller;