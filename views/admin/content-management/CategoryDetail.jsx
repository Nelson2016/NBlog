import React from 'react';
import {Button, Breadcrumb, Input, Form, Upload, Toast} from 'nr';

import config from '../../../config/config';

import styles from '../../../asset/scss/admin/content-management/category-detail.scss';

import api from '../../../asset/js/api';
import functions from '../../../asset/js/functions';

const Cascader = Input.Cascader;

class CategoryDetail extends React.Component {

    constructor(props, context) {
        super(props);

        this.state = {
            categoryId: this.props.match.params.categoryId,
            categories: []
        }
    }

    async componentDidMount() {
        const categoryDetail = await this.getCategoryDetail();

        if (categoryDetail) {
            this.titleInput.val(categoryDetail.name);
            this.getCategories(categoryDetail.parentIds);
        } else {
            this.getCategories();
        }

    }

    /**
     * @description 获取分类列表
     */
    getCategories(value = []) {
        const _this = this;

        functions.request(api.admin.getCategory, {
            body: {type: 'all'}
        }).then((res) => {
            if (res.status === 1) {
                _this.categoryInput.setData({
                    data: res.data,
                    value
                });
            }
        })
    }

    /**
     * @description 获取分类详情
     */
    async getCategoryDetail() {
        const categoryId = this.state.categoryId;
        if (categoryId) {
            return await functions.request(api.admin.getCategory, {
                body: {id: categoryId}
            }).then((res) => {
                if (res.status === 1) {
                    return Promise.resolve(res.data);
                } else {
                    return Promise.resolve(undefined);
                }
            })
        } else {
            return undefined;
        }
    }

    /**
     * @description 添加分类
     */
    onSubmit() {
        const parentIds = this.categoryInput.val().value, categoryId = this.state.categoryId;
        let postData = {
            name: this.titleInput.val(),
            parentIds
        };
        categoryId && (postData.id = categoryId);
        functions.request(categoryId ? api.admin.editCategory : api.admin.addCategory, {
            method: "POST",
            body: postData
        }).then((res) => {
            if (res.status === 1) {
                Toast.success(res.message);
            } else {
                Toast.error(res.message);
            }
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