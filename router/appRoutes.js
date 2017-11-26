import React from 'react';
import {Route, IndexRoute, IndexRedirect} from 'react-router';

//客户端组件
import Client from '../views/client/Client';
import Admin from '../views/admin/Admin';
import AdminLogin from '../views/admin/Login';
import Welcome from '../views/admin/Welcome';
import SiteManagement from '../views/admin/site-management/SiteManagement';
import ModifyPassword from '../views/admin/site-management/ModifyPassword';
import SiteInformation from '../views/admin/site-management/SiteInformation';


const AppRoutes = <div>
    <Route path="/" component={Client} name="首页"/>
    <Route path="admin" component={Admin} name="后台首页">
        <IndexRedirect to="welcome"/>
        <Route path="welcome" component={Welcome} name="欢迎页"/>
        <Route path="siteManagement" component={SiteManagement} name="站点管理">
            <IndexRedirect to="modifyPassword"/>
            <Route path="modifyPassword" component={ModifyPassword} name="修改密码"/>
            <Route path="siteInformation" component={SiteInformation} name="站点信息"/>
        </Route>
    </Route>
    <Route path="adminLogin" component={AdminLogin} name="后台登录"> </Route>
</div>;

export default AppRoutes;