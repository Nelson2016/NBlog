import React from 'react';

import {updateAdminHotList, updateAdminNewList} from "../../store/action";

import Table from '../components/Table/Table';

import styles from '../../asset/scss/admin/welcome.scss';

class Welcome extends React.Component {

    static contextTypes = {
        store: React.PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);

        let datas = [
            {
                title: "这里是标题这里是标题这里是标题这里是标题",
                author: "Nelson",
                date: "2017-01-01 12:12:12",
                ups: "12",
                views: "324",
                comments: "123"
            },
            {
                title: "12这里是标题这里是标题阿萨德这里是标题这里是标题",
                author: "Logan",
                date: "2017-01-01 12:12:12",
                ups: "122",
                views: "3234",
                comments: "1233"
            },
            {
                title: "这里是标题这里是标题这里是标题这里是标题",
                author: "Nelson",
                date: "2017-01-01 12:12:12",
                ups: "12",
                views: "324",
                comments: "123"
            },
            {
                title: "12这里是标题这里是标题阿萨德这里是标题这里是标题",
                author: "Logan",
                date: "2017-01-01 12:12:12",
                ups: "122",
                views: "3234",
                comments: "1233"
            },
        ]

        context.store.dispatch(updateAdminHotList(this.createTableDom(datas, '热门文章')));
        context.store.dispatch(updateAdminNewList(this.createTableDom(datas, '最新动态')));

        const store = context.store.getState();
        this.state = {
            adminHotList: store.adminHotList,
            adminNewList: store.adminNewList
        }
    }

    createTableDom(datas, title) {
        return {
            title: title,
            more: {
                text: 'More',
            },
            rows: datas.map((tr, index) => [
                {data: [<span key={"title-" + index} className={styles["table-title"]}>{title + tr.title}</span>]},
                {data: [<span key={"author-" + index} className={styles["table-author"]}>{tr.author}</span>]},
                {data: [<span key={"date-" + index} className={styles["table-date"]}>{tr.date}</span>]},
                {data: [<span key={"ups-" + index} className={styles["table-ups"]}>{tr.ups}</span>]},
                {data: [<span key={"views-" + index} className={styles["table-views"]}>{tr.views}</span>]},
                {data: [<span key={"comments-" + index} className={styles["table-comments"]}>{tr.comments}</span>]},
            ])
        }
    }

    render() {

        return <div className={styles['welcome-container']}>
            <div className={styles.statistics}>
                <span>今日访问：10000</span>
                <span>新增用户：1000</span>
                <span>总文章数：30000000</span>
                <span>总用户数：20000</span>
                <span>最近登陆：Nelson</span>
            </div>

            <Table data={this.state.adminHotList} style={{"marginTop": "20px"}}/>
            <Table data={this.state.adminNewList} style={{"marginTop": "20px"}}/>

        </div>
    }

}

export default Welcome;