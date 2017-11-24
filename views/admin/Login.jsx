import React from 'react';
import {browserHistory} from 'react-router';

import Form from '../../views/components/Form/Form';
import {LiteralInput} from '../../views/components/Input/Input';
import {Button} from '../../views/components/Button/Button';

import styles from '../../asset/scss/admin/login.scss';

import logo from '../../asset/images/N-shadow.png';

class Login extends React.Component {

    onSubmit(canSubmit, children) {

        if (canSubmit) {
            //这里应是登录逻辑
            const loginButton = children.loginButton;
            loginButton.startLoading();
            setTimeout(function () {
                loginButton.endLoading();
                browserHistory.push('/admin')
            }, 1000)
        }
    }

    render() {
        return <div className="login-container">
            <div className={styles['login-page']}>
                <div className={styles['login-container']}>
                    <img src={logo} alt="Logo" className={styles['logo']}/>
                    <div className={styles['login-form']}>
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <LiteralInput ref="username" leftIcon="username" placeholder="请输入用户名" dataType="username"/>
                            <LiteralInput ref="password" leftIcon="password" type="password" placeholder="请输入密码"
                                          dataType="password"/>
                            <Button ref="loginButton" type="submit" text="登录" style={{'width': '100%'}}/>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    }

}

export default Login;