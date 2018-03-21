import React from 'react';
import {Provider} from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router-dom';
import configStore from '../store/configStore';
import KoaRouter from 'koa-router';
import Routes from './Routes';

import config from '../config/config';
import functions from '../server/functions';

//Controllers
import {
    login,
    register,
    logout,
    getUsers,
    getUserDetail,
    editUser,
    modifyPassword
} from '../server/controllers/UserController';
import {addCategory, getCategory, editCategory} from '../server/controllers/CategoryController';
import {publishArticle, getArticles, getArticleDetail, editArticle} from '../server/controllers/ArticleController';

//Models
import UserModel from '../server/models/UserModel';

const serverRoutes = new KoaRouter();

serverRoutes.all('*', async (ctx, next) => {

    const context = {}, userSession = ctx.session.user;

    let userInfo = null;

    if (userSession) {
        const mail = userSession.mail;
        userInfo = await UserModel.findOne({mail}).exec();
    } else {
        ctx.session.user = undefined;
    }

    const isLogged = userSession && userInfo;
    const isAdmin = userSession && userSession.admin;
    const initState = {isLogged};

    if (ctx.url.indexOf('/api') !== 0) {

        if (isLogged) {
            initState.admin = userInfo.jurisdiction.admin;
        }

        const store = configStore(initState);
        const state = store.getState();

        await ctx.render('index', {
            root: ReactDOMServer.renderToString(
                <Provider store={store}>
                    <StaticRouter location={ctx.url} context={context}>
                        {Routes(initState)}
                    </StaticRouter>
                </Provider>
            ),
            state: `${JSON.stringify(state)}`,
            host: ctx.host,
        })
    } else if (ctx.url.indexOf('/api/admin') === 0 && ctx.url !== '/api/admin/login' && (!isLogged || !isAdmin)) {

        ctx.body = functions.setResponse(-1, '抱歉，请先登录');

    } else {
        if (config.debug) {
            console.log('start-------' + ctx.url + '---------')
            console.log(ctx.request.body);
            console.log(ctx.request.query);
            console.log('end-------' + ctx.url + '---------')
        }
        await next();
    }

});

//Common----------
serverRoutes.post('/api/register', register);
serverRoutes.post('/api/logout', logout);
serverRoutes.post('/api/modifyPassword', modifyPassword);

//Admin-----------
serverRoutes.post('/api/admin/login', login);
//分类
serverRoutes.post('/api/admin/addCategory', addCategory);
serverRoutes.post('/api/admin/editCategory', editCategory);
serverRoutes.get('/api/admin/getCategory', getCategory);

//用户
serverRoutes.get('/api/admin/getUsers', getUsers);
serverRoutes.get('/api/admin/getUserDetail', getUserDetail);
serverRoutes.post('/api/admin/editUser', editUser);

//文章
serverRoutes.post('/api/admin/publishArticle', publishArticle);
serverRoutes.post('/api/admin/editArticle', editArticle);
serverRoutes.get('/api/admin/getArticles', getArticles);
serverRoutes.get('/api/admin/getArticleDetail', getArticleDetail);

//Admin-----------
//分类
serverRoutes.get('/api/client/getCategory', getCategory);

//文章
serverRoutes.get('/api/client/getArticles', getArticles);
serverRoutes.get('/api/client/getArticleDetail', getArticleDetail);

export default serverRoutes;