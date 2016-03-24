/**
 * Created by CT on 3/20/16.
 */


var constants = {
    routes: {
        v1: {
            user: {
                create: "/v1/users/create",
                login: "/v1/users/login",
                logout: "/v1/users/logout",
            },
            config :{
                create: "/v1/config",
                get: "/v1/config/*",
                update: "/v1/config/*",
                delete: "/v1/config/*"
            }
        }
    }
};

module.exports = constants;