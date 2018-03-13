import config from '../../config/config'

export default {

    host: config.debug ? 'http://localhost:3000' : 'http://localhost:8080',

    logout: "/api/logout",
    register: "/api/register",

    //Admin
    admin: {
        login: "/api/admin/login",
        addCategory: "/api/admin/addCategory",
        getCategory: "/api/admin/getCategory",
        editCategory: "/api/admin/editCategory",
    }

}