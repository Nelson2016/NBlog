import React from 'react'
import routes from './AppRoutes'
import configStore from '../store/configStore';
import {Provider} from 'react-redux'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'

async function clientRoute(ctx, next) {
    let _renderProps;

    match({routes, location: ctx.url}, (error, redirectLocation, renderProps) => {
        _renderProps = renderProps;
    });

    if (_renderProps) {
        const store = configStore();
        const state = store.getState();
        await ctx.render('index', {
            root: renderToString(
                <Provider store={store}>
                    <RouterContext {..._renderProps}/>
                </Provider>
            ),
            state: `${JSON.stringify(state)}`,
            host: ctx.host,
        })
    } else {
        await next()
    }
}

export default clientRoute
