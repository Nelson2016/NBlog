import React from 'react';
import {Link} from 'react-router';

import navigator from './navigator';

import N from '../../asset/images/N-white.png';
import avatar from '../../asset/images/common/avatar.png';

import fonts from '../../asset/scss/fonts.scss';
import styles from '../../asset/scss/admin/header.scss';

class Header extends React.Component {

    componentDidMount() {
        this.activeSubNavigator();
    }

    componentDidUpdate() {
        this.activeSubNavigator();
    }

    activeSubNavigator() {

        let mainActiveNavigator = document.querySelector("." + styles["nav-container"] + " ." + styles["n-active"])

        if (mainActiveNavigator) {
            let subNavigators = document.querySelectorAll("." + styles["sub-nav"]);
            let mainActiveIndex = parseInt(mainActiveNavigator.getAttribute('data-index'));
            for (let i = 0; i < subNavigators.length; i++) {
                let itemClassList = subNavigators[i].classList;
                if(i === mainActiveIndex){
                    itemClassList.add(styles["n-active"]);
                }else{
                    itemClassList.contains(styles["n-active"]) && itemClassList.remove(styles["n-active"]);
                }
            }
        }

    }

    render() {
        let mainNavigator = navigator.map((mainItem, mainIndex) => <li key={"main-navigator-" + mainIndex}>
            <Link activeClassName={styles['n-active']} to={mainItem.link} data-index={mainIndex}>{mainItem.text}</Link>
        </li>);

        let subNavigator = navigator.map((mainItem, mainIndex) => <menu key={"sub-navigator-container-" + mainIndex}
                                                                        className={styles['sub-nav']}>
            <ul>
                {mainItem.children.map((subItem, subIndex) => <li key={"sub-navigator-" + subIndex}>
                    <Link onlyActiveOnIndex={true}
                          activeClassName={styles['n-active']}
                          to={subItem.link}>{subItem.text}
                    </Link>
                </li>)}
            </ul>
        </menu>);

        return <div className={styles["header-container"]}>
            <div className={styles["header-top"]}>
                <div className={styles["header-top-inner"]}>
                    <div className={styles["logo-container"]}>
                        <img src={N} alt="logo"/>
                        <h1>NBlog</h1>
                    </div>
                    <nav className={styles["nav-container"]}>
                        <ul className={styles["main-nav"]}>
                            {mainNavigator}
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
            </div>
            <div className={styles['header-bottom']}>
                <div className={styles["header-bottom-inner"]}>
                    {subNavigator}
                </div>
            </div>
        </div>
    }

}

export default Header;