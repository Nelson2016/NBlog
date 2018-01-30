import React from 'react';
import {connect} from 'react-redux';

import {updateAdminHotList, updateAdminNewList} from "../../store/action";

import NormalList from './common/NormalList';

import styles from '../../asset/scss/admin/welcome.scss';

class Welcome extends React.Component {

    constructor(props) {
        super(props);

        let data = [
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
        ];


        this.props.updateAdminHotList(this.createTableDom(data, 'hotList'));
        this.props.updateAdminNewList(this.createTableDom(data, 'newList'));

        this.state = this.props.state;
    }

    /**
     * @description 根据数据创建表格DOM
     *
     * @param data 数据
     * @param type 创建数据的类型
     */
    createTableDom(data, type) {

        const title = [
            {data: [<span key={type + "title-"} className={styles["table-title"]}>标题</span>]},
            {data: [<span key={type + "author-"} className={styles["table-author"]}>作者</span>]},
            {data: [<span key={type + "date-"} className={styles["table-date"]}>日期</span>]},
            {data: [<span key={type + "ups-"} className={styles["table-ups"]}>赞</span>]},
            {data: [<span key={type + "views-"} className={styles["table-views"]}>浏览</span>]},
            {data: [<span key={type + "comments-"} className={styles["table-comments"]}>评论</span>]}
        ];

        return {
            title,
            rows: data.map((tr, index) => [
                {data: [<span key={"title-" + index} className={styles["table-title"]}>{tr.title}</span>]},
                {data: [<span key={"author-" + index} className={styles["table-author"]}>{tr.author}</span>]},
                {data: [<span key={"date-" + index} className={styles["table-date"]}>{tr.date}</span>]},
                {data: [<span key={"ups-" + index} className={styles["table-ups"]}>{tr.ups}</span>]},
                {data: [<span key={"views-" + index} className={styles["table-views"]}>{tr.views}</span>]},
                {data: [<span key={"comments-" + index} className={styles["table-comments"]}>{tr.comments}</span>]},
            ])
        }
    }

    more() {
        alert('more')
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

            <div className={styles["normal-list"]}>
                <NormalList data={this.props.state.adminHotList} title="热门文章"
                            more={{text: 'More', onClick: this.more.bind(this)}}/>
            </div>
            <div className={styles["normal-list"]}>
                <NormalList data={this.props.state.adminHotList} title="最新动态"
                            more={{text: 'More', onClick: this.more.bind(this)}}/>
            </div>

        </div>
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateAdminHotList: (args) => dispatch(updateAdminHotList(args)),
        updateAdminNewList: (args) => dispatch(updateAdminNewList(args))
    }
}

const mapStateToProps = (state, ownProps) => {
    return {state: state}
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);