import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from 'react-redux';
import configStore from '../store/configStore';
import ClientRouter from '../router/ClientRouter';

let store = configStore(window.REDUX_STATE);

if (module.hot) {
    module.hot.accept()
}

window.console && window.console.log && (
    console.log("%c     ", "font-size:150px;background:url('http://" + window.location.host + "/N-black.png') no-repeat"),
        console.log("%c  NBlog-前端从入门到放弃", "color:#108ee9;font-weight:bold;font-size:18px;")
);

hydrate(
    <Provider store={store}>
        <ClientRouter/>
    </Provider>,
    document.getElementById('root')
);