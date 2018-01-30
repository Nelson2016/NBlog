import React from 'react';
import {Button, Breadcrumb, Input, Form, Upload} from 'nr';

import config from '../../../config/config';

import styles from '../../../asset/scss/admin/content-management/category-detail.scss';

import api from '../../../asset/js/api';
import functions from '../../../asset/js/functions';

const Cascader = Input.Cascader;

class CategoryDetail extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        const _this = this;

        functions.request(api.admin.getCategory).then((res) => {
            if (res.status === 1) {
                _this.categoryInput.setData(res.data);
            }
        })
    }

    onSubmit() {
        const parentIds = this.categoryInput.val().valueIdArr;
        const parentId = parentIds[parentIds.length - 1] || '';

        functions.request(api.admin.addCategory, {
            method: "POST",
            body: {
                name: this.titleInput.val(),
                parentId
            }
        }).then((res) => {
            console.log(res);
        })
    }

    render() {

        return <div className={styles["article-detail-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles["edit-inputs"]}>
                <Form onSubmit={this.onSubmit.bind(this)} ctx={this}>
                    <Input ref={e => this.titleInput = e}
                           nRef="titleInput"
                           label="分类名称"
                           placeholder="请输入分类名称"
                           maxLength="8"/>

                    <Cascader label="所属分类"
                              ref={e => this.categoryInput = e}
                              nRef="categoryInput"
                              ignore="ignore"
                              data={this.state.categories}
                              placeholder="请选择所属分类"/>

                    <Button ref={e => this.loginBtn = e} text="保存" type="submit"/>
                </Form>
            </div>
        </div>
    }

}


export default CategoryDetail;