import React from 'react';
import {Link} from 'react-router';

import N from '../../asset/images/N-white.png';
import avatar from '../../asset/images/common/avatar.png';

import fonts from '../../asset/scss/fonts.scss';
import styles from '../../asset/scss/admin/header.scss';

class Header extends React.Component {

    render() {
        return <div className={styles["header-container"]}>
            <div className={styles["header-top"]}>
                <div className={styles["logo-container"]}>
                    <img src={N} alt="logo"/>
                    <h1>NBlog</h1>
                </div>
                <nav className={styles["nav-container"]}>
                    <ul className={styles["main-nav"]}>
                        <li className={styles['n-active']}><Link to="/">站点管理</Link></li>
                        <li><Link to="/">站点内容</Link></li>
                        <li><Link to="/">用户管理</Link></li>
                        <li><Link to="/">财务管理</Link></li>
                        <li><Link to="/">数据统计</Link></li>
                    </ul>
                </nav>
                <div className={styles["user-container"]}>
                    <div className={styles["avatar-container"]}>
                        <img src={avatar} alt="default avatar"/>
                    </div>
                    <p className={styles["username"]}>Admin</p>
                </div>
                <menu className={styles["menu-container"]}>
                    <i className={fonts["icon-logout"]} data-icon></i>
                    <i className={fonts["icon-setting"]} data-icon></i>
                </menu>
            </div>
            <div className={styles['header-bottom']}>
                <menu className={styles['sub-nav']}>
                    <ul>
                        <li><Link to="/">修改密码</Link></li>
                        <li className={styles['n-active']}><Link to="/">站点信息</Link></li>
                        <li><Link to="/">功能设置</Link></li>
                    </ul>
                </menu>
            </div>
        </div>
    }

}

export default Header;