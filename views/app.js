import React from 'react';
import ReactDom from 'react-dom';
import store from '../store/store';
import {Provider} from 'react-redux';
import AppRouter from '../router/AppRouter';

if (module.hot) {
    module.hot.accept()
}

window.console && window.console.log && (
    console.log("%c     ", "font-size:150px;background:url('http://" + window.location.host + "/N-black.png') no-repeat"),
    console.log("%c  NBlog-前端从入门到放弃", "color:#108ee9;font-weight:bold;font-size:18px;")
);

ReactDom.render(
    <Provider store={store}>
        <AppRouter/>
    </Provider>,
    document.getElementById('app')
);