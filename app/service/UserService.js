/**
 * User service backed by a repo.
 * This is where password cypto, username/password validation, etc. should occur.
 */

var userRepo = require('../repository/UsersRepository'),
    crypto = require('crypto');

const SALT_NUM_BYTES = 64;

var userService = {
    /**
     * Add User to repo if user doesnt already exist.
     * @param username
     * @param password
     * @returns {boolean}
     */
    addUser: function (username, password) {
        if (userRepo.getUserInfo(username) === undefined) {
            var userInfo = {};
            userInfo.salt = crypto.randomBytes(SALT_NUM_BYTES);
            userInfo.password = encrypt(password, userInfo.salt);

            userRepo.upsert(username, userInfo);
            return true;
        } else {
            return false;
        }
    },

    verifyPassword: function (username, password) {
        var userInfo = userRepo.getUserInfo(username);
        if (userInfo === undefined) {
            return false;
        } else {
            var userEncryptedPassword = encrypt(password, userInfo.salt);
            return userEncryptedPassword == userInfo.password;
        }
    },
};

var encrypt = function (plainText, salt) {
    return crypto
        .createHmac('sha256', salt)
        .update(plainText)
        .digest('hex');
}

module.exports = userService;