var http = require('http');
var dispatcher = require('./app/util/HttpDispatcher');
var userController = require('./app/controller/UserController')
var constants = require('./app/util/Constants')

const PORT=8080;

dispatcher.onPost(constants.routes.v1.user.login, function (req, res) {
    userController.login(req,res);
});

dispatcher.onPost(constants.routes.v1.user.create, function (req, res) {
    userController.create(req,res);
});

dispatcher.onPost(constants.routes.v1.user.logout, function (req, res) {
    userController.logout(req,res);
});

dispatcher.onGet('/hello', function (req, res) {
    res.write(JSON.stringify({hi:"Hello to you too"}));
    res.end();
})


//Create a server
http.createServer(function (req, res) {
    dispatcher.dispatch(req, res);}
).listen(PORT, function(){
    console.log("Server listening on: http://localhost:%s", PORT);
});
