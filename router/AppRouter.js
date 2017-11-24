import React from 'react';
import {Router, browserHistory} from 'react-router';
import AppRoutes from './AppRoutes';

class AppRouter extends React.Component {
    render() {
        return <Router history={browserHistory}>
            {AppRoutes}
        </Router>
    }
}

export default AppRouter;