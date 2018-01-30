import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Breadcrumb, Table, Page, Checkbox} from 'nr';

import config from '../../../config/config';

import styles from '../../../asset/scss/admin/content-management/article-management.scss';

import {updateArticleList} from '../../../store/action';

class ArticleManagement extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let datas = [{
            title: "1这里是标题这里是标题这里是标题这里是标题1这里是标题这里是标题这里是标题这里是标题",
            author: "Nelson",
            date: "2017-01-01 12:12:12",
            ups: "12",
            views: "324",
            comments: "123"
        }, {
            title: "2这里是标题这里是标题这里是标题这里是标题",
            author: "Nelson",
            date: "2017-01-01 12:12:12",
            ups: "12",
            views: "324",
            comments: "123"
        }, {
            title: "3这里是标题这里是标题这里是标题这里是标题",
            author: "Nelson",
            date: "2017-01-01 12:12:12",
            ups: "12",
            views: "324",
            comments: "123"
        }];

        this.props.updateArticleList(this.createTableDom(datas));

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
            onClickRow: this.onClickRow.bind(this),
            rows: data.map((tr, index) => [
                {
                    data: [
                        <span key={'checkboxContainer' + index} className={styles["table-checkbox"]}>
                            <Checkbox key={"checkbox" + index} name="checkbox" value={index}
                                      ref={e => this["checkbox" + index] = e}/>
                        </span>
                    ]
                },
                {data: [<span key={"title-" + index} className={styles["table-title"]}>{tr.title}</span>]},
                {data: [<span key={"author-" + index} className={styles["table-author"]}>{tr.author}</span>]},
                {data: [<span key={"date-" + index} className={styles["table-date"]}>{tr.date}</span>]},
                {data: [<span key={"ups-" + index} className={styles["table-ups"]}>{tr.ups}</span>]},
                {data: [<span key={"views-" + index} className={styles["table-views"]}>{tr.views}</span>]},
                {data: [<span key={"comments-" + index} className={styles["table-comments"]}>{tr.comments}</span>]}
            ])
        }
    }

    onClickRow() {
        this.props.history.push({
            pathname: config.common.breadcrumb.admin.articleDetail.path,
        })
    }

    enterPublishArticle(){
        this.props.history.push({
            pathname: config.common.breadcrumb.admin.articleDetail.path,
        })
    }

    render() {

        return <div className={styles["article-management-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles['publish-article-btn']}>
                <Button onClick={this.enterPublishArticle.bind(this)} text="发布文章"/>
            </div>

            <Table data={this.props.state.articleList || {}}/>
            <div className={styles['page-container']}>
                <Page currentPage={1} totalPage={10}/>
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