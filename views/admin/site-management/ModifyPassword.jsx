import React from 'react';

import Form from '../../components/Form/Form';
import {Button} from '../../components/Button/Button';
import {LiteralInput} from '../../components/Input/Input';
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

import styles from "../../../asset/scss/admin/site-management/modify-password.scss";

class ModifyPassword extends React.Component {

    onSubmit(canSubmit) {
    }

    render() {
        return <div className={styles["modify-password-container"]}>
            <Breadcrumb routes={this.props.routes} params={this.props.params}/>

            <div className={styles["modify-password-inputs"]}>
                <Form onSubmit={this.onSubmit.bind(this)}>
                    <LiteralInput ref="password" type='password' placeholder='请输入原密码' label='原密码'
                                  dataType='password'></LiteralInput>
                    <LiteralInput ref="newPassword" type='password' placeholder='请输入新密码' label='新密码'
                                  dataType='password'></LiteralInput>
                    <LiteralInput ref="confirmPassword" type='password' placeholder='请确认新密码' label='新密码'
                                  dataType='password'></LiteralInput>
                    <Button ref="modifyPasswordButton" type="submit" text="修改密码" style={{'width': '100%'}}/>
                </Form>
            </div>
        </div>
    }

}

export default ModifyPassword;