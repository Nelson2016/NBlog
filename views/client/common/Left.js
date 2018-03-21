import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Input} from 'nr';

import functions from '../../../asset/js/functions';
import api from '../../../asset/js/api';

import N from '../../../asset/images/N-black.png';
import styles from '../../../asset/scss/client/common/left.scss';

class Left extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            navigator: []
        }
    }

    componentDidMount() {
        this.leftMenuContainer.style.minHeight = document.documentElement.clientHeight - 302 + 'px';
        this.leftContainer.classList.add(styles['left-container-active']);

        this.getCategories();
    }

    getCategories() {
        const _this = this;

        functions.request(api.client.getCategory, {
            body: {type: 'all'}
        }).then((res) => {
            if (res.status === 1) {
                _this.setState({
                    navigator: res.data,
                });
            }
        })
    }

    render() {

        const navigator = this.state.navigator;

        const navigatorDom = navigator.map((item, index) => <li key={index}>
            <NavLink activeClassName={styles['navigator-active']} to={"/client/home/" + item._id}>{item.title}</NavLink>
        </li>);

        return <div ref={e => this.leftContainer = e} className={styles["left-container"]}>
            <div className={styles['header']}>
                <img className={styles['logo']} src={N} alt="N"/>
            </div>
            <div className={styles['search-container']}>
                <Input type="search" placeholder="请输入搜索内容" leftIcon="search" checkValue={false} disabled={true}/>
            </div>
            <div ref={e => this.leftMenuContainer = e} className={styles['navigator']}>
                <ul>
                    <li>
                        <NavLink activeClassName={styles['navigator-active']} to={"/client/home/0"}>首页</NavLink>
                    </li>
                    {navigatorDom}
                </ul>
            </div>
            <div className={styles["concat"]} ref={e => this.concat = e}>
                <h2>联系方式</h2>
                <span>Nelson_Lee@outlook.com</span>
            </div>
        </div>
    }

}

export default Left;