import React from 'react';
import {Route,IndexRoute} from 'react-router';

//客户端组件
import Client from '../views/client/Client';
import Admin from '../views/admin/Admin';
import AdminLogin from '../views/admin/Login';
import Welcome from '../views/admin/Welcome';

const AppRoutes = <div>
    <Route path="/" component={Client}/>
    <Route path="admin" component={Admin}>
        <IndexRoute component={Welcome}/>
        <Route path="welcome" component={Welcome}/>
    </Route>
    <Route path="adminLogin" component={AdminLogin}> </Route>
</div>;

export default AppRoutes;