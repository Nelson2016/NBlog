import React from 'react';
import {Form, Input, Breadcrumb, Button} from 'nr';
import config from '../../../config/config';

import styles from "../../../asset/scss/admin/site-management/modify-password.scss";

class ModifyPassword extends React.Component {

    onSubmit() {

    }

    render() {

        return <div className={styles["modify-password-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles["modify-password-inputs"]}>
                <Form onSubmit={this.onSubmit.bind(this)} ctx={this}>
                    <Input ref={e => this.passwordInput = e} nRef="passwordInput" leftIcon="password"
                           placeholder="请输入原密码" dataType="password"/>
                    <Input ref={e => this.newPasswordInput = e} nRef="newPasswordInput" leftIcon="password"
                           placeholder="请输入新密码" dataType="password"/>
                    <Input ref={e => this.confirmPasswordInput = e} nRef="confirmPasswordInput" leftIcon="password"
                           placeholder="请再次输入新密码" dataType="password"/>

                    <Button ref={e => this.modifyPasswordBtn = e} nRef="modifyPasswordBtn" text="修改密码" type="submit"/>
                </Form>
            </div>
        </div>
    }

}

export default ModifyPassword;