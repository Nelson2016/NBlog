import config from '../../config/config'

export default {

    host: config.debug ? 'http://localhost:3000' : 'http://localhost:8080',

    logout: "/api/logout",
    register: "/api/register",
    modifyPassword: "/api/modifyPassword",

    //Admin
    admin: {
        login: "/api/admin/login",
        addCategory: "/api/admin/addCategory",
        getCategory: "/api/admin/getCategory",
        editCategory: "/api/admin/editCategory",

        getUsers: "/api/admin/getUsers",
        editUser: "/api/admin/editUser",
        getUserDetail: "/api/admin/getUserDetail",

        getArticleDetail: "/api/admin/getArticleDetail",
        publishArticle: "/api/admin/publishArticle",
        getArticles: "/api/admin/getArticles",
        editArticle: "/api/admin/editArticle",
    }

}