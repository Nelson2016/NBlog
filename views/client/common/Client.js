import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Left from './Left';
import Home from '../Home';
import ArticleDetail from '../article/ArticleDetail';

import styles from '../../../asset/scss/client/common/client.scss';

class Client extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className={styles['main-container']}>
            <div className={styles['left-container']}>
                <Left/>
            </div>
            <div className={styles['right-container']}>
                <div className={styles['right-container-center']}>
                    <Switch>

                        <Route exact path="/client/articleDetail/:articleId" component={ArticleDetail}/>
                        <Route exact path="/client/home/:categoryId" component={Home}/>
                        <Route exact path="/client" render={() => <Redirect to="/client/home/0"/>}/>

                        <Redirect to="/404"/>
                    </Switch>
                </div>
            </div>
        </div>
    }

}

export default Client;