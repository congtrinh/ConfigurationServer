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
                get: "/v1/config/:name",
                getAll: "/v1/config",
                put: "/v1/config/:name",
                delete: "/v1/config/:name"
            }
        }
    }
};

module.exports = constants;