var http = require('http');
var dispatcher = require('./app/util/HttpDispatcher');
var userController = require('./app/controller/UserController')
var configController = require('./app/controller/ConfigController')
var dispatcher = require('node-simple-router')();

var constants = require('./app/util/Constants')

const PORT=8080;

dispatcher.post(constants.routes.v1.user.login, function (req, res) {
    userController.login(req,res);
});

dispatcher.post(constants.routes.v1.user.create, function (req, res) {
    userController.create(req,res);
});

dispatcher.post(constants.routes.v1.user.logout, function (req, res) {
    userController.logout(req,res);
});

dispatcher.get(constants.routes.v1.config.get, function (req, res) {
    configController.getConfig(req,res);
});

dispatcher.get(constants.routes.v1.config.getAll, function (req, res) {
    configController.getAllConfig(req,res);
});

dispatcher.post(constants.routes.v1.config.create, function (req, res) {
    configController.createConfig(req,res);
});

dispatcher.put(constants.routes.v1.config.put, function (req, res) {
    configController.updateConfig(req,res);
});

dispatcher.delete(constants.routes.v1.config.delete, function (req, res) {
    configController.deleteConfig(req,res);
});

dispatcher.get('/hello', function (req, res) {
    res.write(JSON.stringify({hi:"Hello to you too"}));
    res.end();
})


//Create a server
http.createServer(dispatcher).listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
