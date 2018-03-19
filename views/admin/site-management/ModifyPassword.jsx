import React from 'react';
import {Form, Input, Breadcrumb, Button, Toast} from 'nr';

import config from '../../../config/config';
import functions from '../../../asset/js/functions';
import api from '../../../asset/js/api';

import styles from "../../../asset/scss/admin/site-management/modify-password.scss";

class ModifyPassword extends React.Component {

    async onSubmit(canSubmit) {

        if (!canSubmit) {
            return;
        }

        const res = await functions.request(api.modifyPassword, {
            method: "POST",
            body: {
                oldPassword: this.passwordInput.val(),
                newPassword: this.newPasswordInput.val(),
                confirmPassword: this.confirmPasswordInput.val()
            }
        });

        if (res.status === 1) {
            this.passwordInput.val('');
            this.newPasswordInput.val('');
            this.confirmPasswordInput.val('');

            Toast.success(res.message);
        }

    }

    render() {

        return <div className={styles["modify-password-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles["modify-password-inputs"]}>
                <Form onSubmit={this.onSubmit.bind(this)} ctx={this}>
                    <Input ref={e => this.passwordInput = e}
                           nRef="passwordInput"
                           leftIcon="password"
                           type="password"
                           placeholder="请输入原密码"
                           dataType="password"/>
                    <Input ref={e => this.newPasswordInput = e}
                           nRef="newPasswordInput"
                           leftIcon="password"
                           type="password"
                           placeholder="请输入新密码"
                           dataType="password"/>
                    <Input ref={e => this.confirmPasswordInput = e}
                           nRef="confirmPasswordInput"
                           leftIcon="password"
                           type="password"
                           placeholder="请再次输入新密码"
                           dataType="password"/>

                    <Button ref={e => this.modifyPasswordBtn = e} nRef="modifyPasswordBtn" text="修改密码" type="submit"/>
                </Form>
            </div>
        </div>
    }

}

export default ModifyPassword;