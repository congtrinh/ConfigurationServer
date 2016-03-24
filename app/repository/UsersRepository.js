/**
 * Mock place holder for user DB that contains user/pass.
 * Pass should be be hashed before storing. Shouldnt be storing plain password.
 */

var usersRepo = {

    getUserInfo: function(username) {
        return data[username];
    },

    upsert: function(username, userInfo) {
        data[username] = userInfo;
    }
};

var data = {
    myUserName:{'password':'1d03f19f3d6a26ec67b956598b31bef1c0ae01109e5dd6bf94404d95c73329a4', 'salt':'salt'}

}

module.exports = usersRepo;