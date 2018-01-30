import React from 'react';
import {Form, Input, Button, Toast} from 'nr';
import {connect} from 'react-redux';

import styles from '../../asset/scss/login.scss';

import logo from '../../asset/images/N-shadow.png';

import functions from '../../asset/js/functions';
import api from '../../asset/js/api';

import {changeLoginStatus} from '../../store/action'

class AdminLogin extends React.Component {

    constructor(props) {
        super(props);
    }

    login(canSubmit) {
        if (canSubmit) {
            let loginBtn = this.loginBtn;
            loginBtn.startLoading();
            functions.request(api.admin.login, {
                method: "POST",
                body: {
                    mail: this.mailInput.val(),
                    password: this.passwordInput.val(),
                }
            }).then((res) => {
                if (res.status === 1) {
                    this.props.changeLoginStatus({isLogged: true, admin: res.data.admin})
                } else {
                    loginBtn.endLoading();
                }
            });
        }
    }


    render() {
        return <div className="login-container">
            <div className={styles['login-page']}>
                <div className={styles['login-container']}>
                    <img src={logo} alt="Logo" className={styles['logo']}/>
                    <div className={styles['login-form']}>
                        <Form onSubmit={this.login.bind(this)} ctx={this}>
                            <Input ref={e => this.mailInput = e} nRef="mailInput" leftIcon="username"
                                   placeholder="请输入邮箱" dataType="mail"/>
                            <Input ref={e => this.passwordInput = e} nRef="passwordInput" leftIcon="password"
                                   type="password" placeholder="请输入密码" dataType="password"/>

                            <Button ref={e => this.loginBtn = e} nRef="loginBtn" text="登录" type="submit"/>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    }

}

const mapStateToProps = (state) => {
    return {state}
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLoginStatus: (args) => dispatch(changeLoginStatus(args))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLogin);