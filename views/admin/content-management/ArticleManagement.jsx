import React from 'react';

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import {Checkbox,NumberBox} from "../../components/Input/Input";
import {Button} from "../../components/Button/Button"
import Table from '../../components/Table/Table';

import styles from '../../../asset/scss/admin/content-management/article-management.scss';

import {updateArticleList} from '../../../store/action';

class ArticleList extends React.Component {

    static contextTypes = {
        store: React.PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props);
        let datas = [{
            title: "1这里是标题这里是标题这里是标题这里是标题1这里是标题这里是标题这里是标题这里是标题",
            author: "Nelson",
            date: "2017-01-01 12:12:12",
            ups: "12",
            views: "324",
            comments: "123"
        },{
            title: "2这里是标题这里是标题这里是标题这里是标题",
            author: "Nelson",
            date: "2017-01-01 12:12:12",
            ups: "12",
            views: "324",
            comments: "123"
        },{
            title: "3这里是标题这里是标题这里是标题这里是标题",
            author: "Nelson",
            date: "2017-01-01 12:12:12",
            ups: "12",
            views: "324",
            comments: "123"
        }];

        context.store.dispatch(updateArticleList(this.createTableDom(datas)));

        const store = context.store.getState();
        this.state = {
            articleList: store.articleList,
        }
    }

    createTableDom(datas) {
        return {
            rows: datas.map((tr, index) => [
                {data: [<span key={"checkbox-" + index} className={styles["table-checkbox"]}><Checkbox item='article-checkbox'/></span>]},
                {data: [<span key={"title-" + index} className={styles["table-title"]}>{tr.title}</span>]},
                {data: [<span key={"author-" + index} className={styles["table-author"]}>{tr.author}</span>]},
                {data: [<span key={"date-" + index} className={styles["table-date"]}>{tr.date}</span>]},
                {data: [<span key={"ups-" + index} className={styles["table-ups"]}>{tr.ups}</span>]},
                {data: [<span key={"views-" + index} className={styles["table-views"]}>{tr.views}</span>]},
                {data: [<span key={"comments-" + index} className={styles["table-comments"]}>{tr.comments}</span>]},
                {data: [<span key={"order-" + index} className={styles["table-order"]}><NumberBox/></span>]},
                {data: [<span key={"ctrl-" + index} className={styles["table-ctrl"]}>这里删除</span>]}
            ])
        }
    }

    render() {
        return <div className={styles["article-management-container"]}>
            <Breadcrumb routes={this.props.routes} params={this.props.params}/>

            <Button text={"发布文章"}/>

            <div className={styles['article-list-container']}>
                <div className={styles["article-list-ctrls"]}>
                    <Checkbox style={{"float":"left"}} forItem="article-checkbox"/>
                    <button>删除</button>
                    <button>显示</button>
                    <button>隐藏</button>
                </div>
                <Table data={this.state.articleList}/>
            </div>
        </div>
    }

}

export default ArticleList;