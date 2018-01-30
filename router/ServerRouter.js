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
import {login, register, logout} from '../server/controllers/UserController';
import {addCategory, getCategory} from '../server/controllers/CategoryController';

//Models
import UserModel from '../server/models/UserModel';

const serverRoutes = new KoaRouter();

serverRoutes.all('*', async (ctx, next) => {

    const context = {};
    const userSession = ctx.session.user;
    const isLogged = !!userSession;
    const initState = {isLogged};

    if (ctx.url.indexOf('/api') !== 0) {

        if (isLogged) {
            const mail = userSession.mail;
            const userInfo = await UserModel.findOne({mail}).exec();
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
    } else if (ctx.method.toLowerCase() === 'post' && ctx.url.indexOf('/api/admin') === 0 && ctx.url !== '/api/admin/login' && !isLogged) {

        ctx.body = functions.setResponse(-1, '抱歉，请先登录');

    } else {
        if (config.debug) {
            console.log(ctx.request.body);
        }
        await next();
    }

});

//Common
serverRoutes.post('/api/register', register);
serverRoutes.post('/api/logout', logout);

//Admin
serverRoutes.post('/api/admin/login', login);
serverRoutes.post('/api/admin/addCategory', addCategory);
serverRoutes.get('/api/admin/getCategory', getCategory);

export default serverRoutes;