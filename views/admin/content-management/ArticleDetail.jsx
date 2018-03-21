import React from 'react';
import {Button, Breadcrumb, Input, Form, Upload, Editor, Toast} from 'nr';

const EditorComponent = Editor.Editor;

import config from '../../../config/config';
import functions from '../../../asset/js/functions';
import api from '../../../asset/js/api';

import styles from '../../../asset/scss/admin/content-management/article-detail.scss';

const Textarea = Input.Textarea;
const Cascader = Input.Cascader;

class ArticleDetail extends React.Component {

    constructor(props, context) {
        super(props);

        this.state = {
            articleId: this.props.match.params.articleId,
            categories: [],
        }

    }

    async componentDidMount() {

        const articleDetail = await this.getArticleDetail();

        if (articleDetail) {
            this.setContent(articleDetail);
            this.coverInput.setFiles([{local: '', server: articleDetail.cover}]);
            await this.getCategories([articleDetail.category._id]);
        } else {
            await this.getCategories();
        }

    }

    /**
     * @description 设置表单值
     * @param articleDetail
     */
    setContent(articleDetail) {
        this.titleInput.val(articleDetail.title);
        this.abstractInput.val(articleDetail.abstract);
        this.contentInput.val(articleDetail.content);
    }

    /**
     * @description 获取文章详情
     */
    async getArticleDetail() {
        const articleId = this.state.articleId;

        if (articleId) {

            const res = await functions.request(api.admin.getArticleDetail, {
                body: {articleId}
            });

            return res.status === 1 ? res.data : undefined;

        } else {
            return undefined;
        }
    }

    /**
     * @description 获取分类列表
     */
    async getCategories(value = []) {
        const _this = this;

        await functions.request(api.admin.getCategory, {
            body: {type: 'all'}
        }).then((res) => {
            if (res.status === 1) {
                _this.categoryInput.setData({
                    data: res.data,
                    value,
                });
            }
        });
    }

    async onSubmit(canSubmit) {
        if (!canSubmit) {
            return;
        }

        const title = this.titleInput.val(),
            content = this.contentInput.val(),
            abstract = this.abstractInput.val(),
            categoryId = this.categoryInput.val().value[0] || '',
            _this = this;

        let cover = this.coverInput.getFiles()[0]

        if (cover) {
            if (cover.server.indexOf('/dist') === 0) {
                cover = cover.server.substring(5);
            } else {
                cover = cover.server;
            }
        }

        if (!cover) {
            Toast.error('请选择文章封面');
            return;
        }
        if (!categoryId) {
            Toast.error('请选择分类');
            return;
        }
        if (!content) {
            Toast.error('请输入文章内容');
            return;
        }

        let postData = {
            title,
            cover,
            content,
            abstract,
            categoryId
        };

        const articleId = this.state.articleId;

        articleId && (postData.articleId = articleId);

        const res = await functions.request(articleId ? api.admin.editArticle : api.admin.publishArticle, {
            method: "POST",
            body: postData
        });

        if (res.status === 1) {
            Toast.success(res.message);
            setTimeout(() => {
                _this.props.history.push({
                    pathname: config.common.breadcrumb.admin.articleManagement.path
                });
            }, 500);
        }

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
                           maxLength="60"/>
                    <Textarea ref={e => this.abstractInput = e}
                              nRef="abstractInput"
                              label="文章摘要"
                              placeholder="请输入文章摘要"/>
                    <div className={styles["article-cover"]}>
                        <label>文章封面</label>
                        <Upload ref={e => this.coverInput = e}
                                max="1"
                                action={api.host + "/api/admin/uploadArticleCover"}/>
                    </div>

                    <Cascader label="所属分类"
                              ref={e => this.categoryInput = e}
                              nRef="categoryInput"
                              placeholder="请选择所属分类"/>

                    <div className={styles["editor-container"]}>
                        <EditorComponent ref={e => this.contentInput = e}/>
                    </div>

                    <Button ref={e => this.loginBtn = e} text="发布" type="submit"/>
                </Form>
            </div>
        </div>
    }

}


export default ArticleDetail;