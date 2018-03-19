import React from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Header from './Header';
import Footer from './Footer';
import Welcome from '../Welcome';

import ModifyPassword from '../site-management/ModifyPassword';
import SiteInformation from '../site-management/SiteInformation';
import FunctionSet from '../site-management/FunctionSet';

import ArticleManagement from '../content-management/ArticleManagement';
import ArticleDetail from '../content-management/ArticleDetail';
import CategoryManagement from '../content-management/CategoryManagement';
import CategoryDetail from '../content-management/CategoryDetail';
import CommentManagement from '../content-management/CommentManagement';

import UserManagement from '../user-management/UserManagement';
import UserDetail from '../user-management/UserDetail';

import FinancialManagement from '../financial-management/FinancialManagement';

import DataStatistics from '../data-stastistics/DataStastistics';

import config from "../../../config/config";

class Admin extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.mainContainer.style.minHeight = document.documentElement.clientHeight - 140 + 'px';
    }

    render() {
        return <div>
            <Header/>
            <div ref={e => this.mainContainer = e} className="main-container">
                <Switch>
                    <Route exact path="/admin/dataStatistics/dataStatistics" component={DataStatistics}/>
                    <Route exact path="/admin/dataStatistics"
                           render={() => <Redirect to="/admin/dataStatistics/dataStatistics"/>}/>

                    <Route exact path="/admin/financialManagement/financialManagement" component={FinancialManagement}/>
                    <Route exact path="/admin/financialManagement"
                           render={() => <Redirect to="/admin/financialManagement/financialManagement"/>}/>

                    <Route exact path="/admin/userManagement/userDetail/:uid" component={UserDetail}/>
                    <Route exact path="/admin/userManagement/userManagement" component={UserManagement}/>
                    <Route exact path="/admin/userManagement"
                           render={() => <Redirect to="/admin/userManagement/userManagement"/>}/>

                    <Route exact path="/admin/contentManagement/commentManagement" component={CommentManagement}/>
                    <Route exact path="/admin/contentManagement/categoryManagement/categoryDetail"
                           component={CategoryDetail}/>
                    <Route exact path="/admin/contentManagement/categoryManagement/categoryDetail/:categoryId"
                           component={CategoryDetail}/>
                    <Route exact path="/admin/contentManagement/categoryManagement" component={CategoryManagement}/>
                    <Route exact path="/admin/contentManagement/articleManagement/articleDetail"
                           component={ArticleDetail}/>
                    <Route exact path="/admin/contentManagement/articleManagement/articleDetail/:articleId"
                           component={ArticleDetail}/>
                    <Route exact path="/admin/contentManagement/articleManagement" component={ArticleManagement}/>
                    <Route exact path="/admin/contentManagement"
                           render={() => <Redirect to="/admin/contentManagement/articleManagement"/>}/>

                    <Route exact path="/admin/siteManagement/functionSet" component={FunctionSet}/>
                    <Route exact path="/admin/siteManagement/siteInformation" component={SiteInformation}/>
                    <Route exact path="/admin/siteManagement/modifyPassword" component={ModifyPassword}/>
                    <Route exact path="/admin/siteManagement"
                           render={() => <Redirect to="/admin/siteManagement/modifyPassword"/>}/>


                    <Route exact path="/admin/welcome" component={Welcome}/>
                    <Route exact path="/admin" render={() => <Redirect to="/admin/welcome"/>}/>

                    <Redirect to="/404"/>
                </Switch>
            </div>
            <Footer/>
        </div>
    }

}

const mapStateToProps = (state, ownProps) => {
    return {state}
};

export default withRouter(connect(mapStateToProps)(Admin));