/**
 * Created by CT on 3/20/16.
 */

var userRepo = require('../repository/UsersRepository')
//TODO add crypto


var userService = {
    addUser : function (username, password) {
        userRepo.update(username, password);
    },

    verifyPassword: function (username, password) {
        var usersPassword = userRepo.getPassword(username);
        return password == usersPassword;
    }

};

module.exports = userService;