import React from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Table, Page, Checkbox} from 'nr';

import config from '../../../config/config';

import styles from '../../../asset/scss/admin/content-management/user-management.scss';

import {updateUserList} from '../../../store/action';

class UserManagement extends React.Component {

    constructor(props, context) {
        super(props);
        let datas = [{
            username: "Nelson1",
            email: "Nelson2016@aliyun.com",
            date: "2017-01-01 12:12:12",
            comments: "123",
            oauth: "是"
        }, {
            username: "Nelson2",
            email: "Nelson2016@aliyun.com",
            date: "2017-01-01 12:12:12",
            comments: "123",
            oauth: "是"
        }, {
            username: "Nelson",
            email: "Nelson2016@aliyun.com",
            date: "2017-01-01 12:12:12",
            comments: "123",
            oauth: "是"
        }];

        this.props.updateUserList(this.createTableDom(datas));

        this.state = this.props.state;

    }


    /**
     * @description 全选
     */
    toCheckAll() {
        let _this = this;
        this.state.userList.rows.map((item, index) => {
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
                data: [
                    <span key='checkAllContainer' className={styles["table-checkbox"]}>
                        <Checkbox ref={e => this.checkAll = e} key="checkAll" name="checkAll" value="-1"
                                  onChange={this.toCheckAll.bind(this)}/>
                    </span>
                ]
            },
            {data: [<span key={"username-"} className={styles["table-username"]}>用户名</span>]},
            {data: [<span key={"email-"} className={styles["table-email"]}>邮箱</span>]},
            {data: [<span key={"date-"} className={styles["table-date"]}>注册时间</span>]},
            {data: [<span key={"comments-"} className={styles["table-comments"]}>评论数</span>]},
            {data: [<span key={"oauth-"} className={styles["table-oauth"]}>评论权限</span>]}
        ];

        return {
            title,
            rows: data.map((tr, index) => [
                {
                    data: [
                        <span key={'checkboxContainer' + index} className={styles["table-checkbox"]}>
                            <Checkbox key={"checkbox" + index} name="checkbox" value={index}
                                      ref={e => this["checkbox" + index] = e}/>
                        </span>
                    ]
                },
                {data: [<span key={"username-" + index} className={styles["table-username"]}>{tr.username}</span>]},
                {data: [<span key={"email-" + index} className={styles["table-email"]}>{tr.email}</span>]},
                {data: [<span key={"date-" + index} className={styles["table-date"]}>{tr.date}</span>]},
                {data: [<span key={"comments-" + index} className={styles["table-comments"]}>{tr.comments}</span>]},
                {data: [<span key={"oauth-" + index} className={styles["table-oauth"]}>{tr.oauth}</span>]},
            ])
        }
    }

    render() {
        return <div className={styles["user-management-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles["user-list-container"]}>
                <Table data={this.state.userList}/>
            </div>
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
        updateUserList: (args) => dispatch(updateUserList(args))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);