import React from 'react';

import From from '../../components/Form/Form';
import {Button} from '../../components/Button/Button';
import {LiteralInput} from '../../components/Input/Input';
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

import styles from "../../../asset/scss/admin/site-management/modify-password.scss";

class ModifyPassword extends React.Component {

    onSubmit(canSubmit) {
        console.log(222)
    }

    render() {
        return <div className={styles["modify-password-container"]}>
            <Breadcrumb routes={this.props.routes} params={this.props.params}/>

            <From onSubmit={this.onSubmit.bind(this)}>
                <div className={styles["modify-password-inputs"]}>
                    <LiteralInput type='password' placeholder='请输入原密码' label='原密码' dataType='password'></LiteralInput>
                    <LiteralInput type='password' placeholder='请输入新密码' label='新密码' dataType='password'></LiteralInput>
                    <LiteralInput type='password' placeholder='请确认新密码' label='新密码' dataType='password'></LiteralInput>
                    <Button ref="modifyPasswordButton" type="submit" text="修改密码" style={{'width': '100%'}}/>
                </div>
            </From>
        </div>
    }

}

export default ModifyPassword;