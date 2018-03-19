import React from 'react';
import {Button, Breadcrumb, Input, Form, Toast} from 'nr';

import config from '../../../config/config';
import functions from '../../../asset/js/functions';
import api from '../../../asset/js/api';

import styles from '../../../asset/scss/admin/user-management/user-detail.scss';


class UserDetail extends React.Component {

    constructor(props, context) {
        super(props);

        this.state = {
            uid: this.props.match.params.uid,
        }
    }

    componentDidMount() {
        this.getUserDetail();
    }

    async getUserDetail() {
        const res = await functions.request(api.admin.getUserDetail, {
            body: {uid: this.state.uid}
        });

        const data = res.data;

        this.usernameInput.val(data.username);
        this.mailInput.val(data.mail);
    }

    async onSubmit(canSubmit) {

        if (!canSubmit) {
            return;
        }

        const res = await functions.request(api.admin.editUser, {
            method: "POST",
            body: {
                uid: this.state.uid,
                username: this.usernameInput.val(),
                mail: this.mailInput.val(),
            }
        });

        if (res.status === 1) {
            Toast.success(res.message);
        }

    }

    render() {
        return <div className={styles["user-detail-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles["edit-inputs"]}>
                <Form onSubmit={this.onSubmit.bind(this)} ctx={this}>
                    <Input ref={e => this.usernameInput = e}
                           nRef="usernameInput"
                           label="用&nbsp;&nbsp;户&nbsp;&nbsp;名"
                           placeholder="请输入用户名"
                           dataType="username|mail"/>

                    <Input ref={e => this.mailInput = e}
                           nRef="mailInput"
                           label="邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱"
                           placeholder="请输入邮箱"
                           dataType="mail"/>

                    <Input ref={e => this.commentInput = e}
                           nRef="commentInput"
                           defaultValue="否"
                           label="评论权限"
                           disabled={true}/>
                    <Button ref={e => this.saveBtn = e} text="保存" type="submit"/>
                </Form>
            </div>
        </div>
    }

}


export default UserDetail;