import React from 'react';
import {Button, Breadcrumb, Input, Form, Upload, Editor} from 'nr';

import config from '../../../config/config';

import styles from '../../../asset/scss/admin/content-management/article-detail.scss';

import M from '../../../asset/images/N-black.png'

const Textarea = Input.Textarea;
const Cascader = Input.Cascader;

class ArticleDetail extends React.Component {

    constructor(props, context) {
        super(props);


    }

    onSubmit() {

    }

    render() {
        return <div className={styles["article-detail-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles["edit-inputs"]}>
                <Form onSubmit={this.onSubmit.bind(this)} ctx={this}>
                    <Input ref={e => this.titleInput = e}
                           nRef="titleInput"
                           label="文章标题"
                           placeholder="请输入文章标题"
                           maxLength="5"/>
                    <Textarea ref={e => this.abstractInput = e}
                              nRef="abstractInput"
                              label="文章摘要"
                              placeholder="请输入文章摘要"/>
                    <div className={styles["article-cover"]}>
                        <label>文章封面</label>
                        <Upload max="1" action="http://localhost:3000/api/admin/uploadArticleCover"/>
                    </div>

                    <Cascader label="所属分类"
                              ref={e => this.categoryInput = e}
                              nRef="categoryInput"
                              placeholder="请选择所属分类"/>

                    <Editor/>

                    <Button ref={e => this.loginBtn = e} text="发布" type="submit"/>
                </Form>
            </div>
        </div>
    }

}


export default ArticleDetail;