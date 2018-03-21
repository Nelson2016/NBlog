import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';

import Root from '../views/Root';

import Client from '../views/client/common/Client';

import Admin from '../views/admin/common/Admin';
import AdminLogin from '../views/admin/AdminLogin';

import NotFound from '../views/NotFound';


const Routes = (state) => <Root>
    <Switch>
        <Route exact path="/" render={() => <Redirect to="/client"/>}/>

        <Route path="/client" component={Client}/>

        <Route path="/admin" render={() => {
            return state.isLogged ? <Admin/> : <Redirect to="/adminLogin"/>
        }}/>
        <Route path="/adminLogin" render={() => {
            return state.isLogged ? <Redirect to="/admin"/> : <AdminLogin/>
        }}/>

        <Route path="/404" component={NotFound}/>
        <Redirect to="/404"/>
    </Switch>
</Root>;

export default Routes;