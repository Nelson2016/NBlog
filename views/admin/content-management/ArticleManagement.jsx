import React from 'react';
import {connect} from 'react-redux';
import {Button, Breadcrumb, Table, Page, Checkbox} from 'nr';

import config from '../../../config/config';
import functions from '../../../asset/js/functions';
import api from '../../../asset/js/api';

import styles from '../../../asset/scss/admin/content-management/article-management.scss';

import {updateArticleList} from '../../../store/action';

class ArticleManagement extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.getArticles();
    }

    /**
     * @description 获取文章列表
     * @param page  页码
     */
    getArticles(page = 1) {
        const _this = this;
        functions.request(api.admin.getArticles, {
            body: {page}
        }).then((res) => {
            if (res.status === 1) {
                const data = res.data, pages = data.pages;

                _this.props.updateArticleList(data.list);
                _this.pages.setPageData(pages.page, pages.totalPage)
            }
        })
    }

    /**
     * @description 全选
     */
    toCheckAll() {
        let _this = this;
        this.state.articleList.rows.map((item, index) => {
            _this["checkbox" + index].setChecked(this.checkAll.isChecked());
        })
    }

    /**
     * @description 根据数据创建表格DOM
     *
     * @param data 数据
     * @param type 创建数据的类型
     */
    createTableDom(data) {

        const title = [
            {
                data: [<Checkbox ref={e => this.checkAll = e} key="checkAll" name="checkAll" value="-1"
                                 onChange={this.toCheckAll.bind(this)}/>]
            },
            {data: [<span key={"title-"} className={styles["table-title"]}>标题</span>]},
            {data: [<span key={"author-"} className={styles["table-author"]}>作者</span>]},
            {data: [<span key={"date-"} className={styles["table-date"]}>日期</span>]},
            {data: [<span key={"ups-"} className={styles["table-ups"]}>赞</span>]},
            {data: [<span key={"views-"} className={styles["table-views"]}>浏览</span>]},
            {data: [<span key={"comments-"} className={styles["table-comments"]}>评论</span>]},
        ];

        return {
            title,
            rows: data.map((tr, index) => {

                const createAtObject = functions.getStrTime(tr.createAt);
                const createAt = createAtObject.year + '-' + createAtObject.month + '-' + createAtObject.day;

                return [
                    {
                        data: [<span key={'checkboxContainer' + index} className={styles["table-checkbox"]}>
                            <Checkbox key={"checkbox" + index} name="checkbox" value={index}
                                      ref={e => this["checkbox" + index] = e}/>
                        </span>]
                    },
                    {
                        data: [<span key={"title-" + index}
                                     className={styles["table-title"]}
                                     onClick={this.goArticleDetail.bind(this, tr._id)}>{tr.title}</span>]
                    },
                    {
                        data: [<span key={"author-" + index}
                                     className={styles["table-author"]}
                                     onClick={this.goArticleDetail.bind(this, tr._id)}>{tr.author.username}</span>]
                    },
                    {
                        data: [<span key={"date-" + index}
                                     className={styles["table-date"]}
                                     onClick={this.goArticleDetail.bind(this, tr._id)}>{createAt}</span>]
                    },
                    {
                        data: [<span key={"ups-" + index}
                                     className={styles["table-ups"]}
                                     onClick={this.goArticleDetail.bind(this, tr._id)}>{tr.up}</span>]
                    },
                    {
                        data: [<span key={"views-" + index}
                                     className={styles["table-views"]}
                                     onClick={this.goArticleDetail.bind(this, tr._id)}>0</span>]
                    },
                    {
                        data: [<span key={"comments-" + index}
                                     className={styles["table-comments"]}
                                     onClick={this.goArticleDetail.bind(this, tr._id)}>0</span>]
                    }
                ]
            })
        }
    }

    goArticleDetail(articleId) {

        let pathname = config.common.breadcrumb.admin.articleDetail.path;
        articleId && (pathname += '/' + articleId);

        this.props.history.push({
            pathname
        })
    }

    enterPublishArticle() {
        this.props.history.push({
            pathname: config.common.breadcrumb.admin.articleDetail.path,
        })
    }

    render() {

        const articleList = this.props.state.articleList || [];

        return <div className={styles["article-management-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles['publish-article-btn']}>
                <Button onClick={this.enterPublishArticle.bind(this)} text="发布文章"/>
            </div>

            <Table data={this.createTableDom(articleList)}/>
            <div className={styles['page-container']}>
                <Page ref={e => this.pages = e} onChange={this.getArticles.bind(this)}/>
            </div>
        </div>
    }

}

const mapStateToProps = (state, ownProps) => {
    return {state: state}
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateArticleList: (args) => dispatch(updateArticleList(args))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ArticleManagement);