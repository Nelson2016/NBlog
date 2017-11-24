import React from 'react'
import routes from './AppRoutes'
import store from '../store/store';
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'

async function clientRoute(ctx, next) {
    let _renderProps;

    match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
        _renderProps = renderProps;
    });

    if (_renderProps) {
        await ctx.render('index', {
            root: renderToString(
                <Provider store={store}>
                    <RouterContext {..._renderProps}/>
                </Provider>
            ),
            state: store.getState(),
            host: ctx.host
        })
    } else {
        await next()
    }
}

export default clientRoute
