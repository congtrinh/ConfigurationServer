
var userService = require('../service/UserService')
var tokenService = require('../service/TokenService')

var userContoller = {
    login: function (req, res) {
        //Support from params and body
        var username = req.params.username;
        var password = req.params.password;

        if(!username){
            username = req.body.username;
            password = req.body.password;
        }

        if(userService.verifyPassword(username, password)){
            res.statusCode = 200;
            //TODO add token
        } else {
            res.statusCode = 401;
            res.write(JSON.stringify({'message':'Invalid credentials.'}));
        }
        res.end()
    },
    
    logout: function (req, res) {
        var authorizationToken = req.headers.authorization;
        tokenService.deleteToken()
    },

    create: function (req, res) {
        var username = req.params.username;
        var password = req.params.password;

        if(!username){
            username = req.body.username;
            password = req.body.password;
        }

        if(userService.addUser(username, password)){
            res.statusCode = 200;
        } else {
            res.statusCode = 409;
            res.write(JSON.stringify({'message':'User already exist.'}));
        }

        res.end();
    }
    
};


module.exports = userContoller;