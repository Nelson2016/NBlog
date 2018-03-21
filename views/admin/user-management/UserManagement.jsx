import React from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Table, Page, Checkbox} from 'nr';

import config from '../../../config/config';
import functions from '../../../asset/js/functions';
import api from '../../../asset/js/api';

import styles from '../../../asset/scss/admin/user-management/user-management.scss';

import {updateUserList} from '../../../store/action';

class UserManagement extends React.Component {

    constructor(props, context) {
        super(props);
    }

    componentDidMount() {
        this.getUsers();
    }

    /**
     * @description 获取用户列表
     * @param page  页码
     */
    getUsers(page = 1) {
        const _this = this;
        functions.request(api.admin.getUsers, {
            body: {page}
        }).then((res) => {
            if (res.status === 1) {
                const data = res.data, pages = data.pages;

                _this.props.updateUserList(data.list);
                _this.pages.setPageData(pages.page, pages.totalPage)
            }
        })
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
     * @description     进入用户详情/编辑
     */
    goUserDetail(uid) {
        let pathname = config.common.breadcrumb.admin.userDetail.path;
        uid && (pathname = pathname + '/' + uid);

        this.props.history.push({
            pathname
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
            rows: data.map((tr, index) => {

                const createAtObj = functions.getStrTime(tr.createAt);
                const createAt = createAtObj.year + '-' + createAtObj.month + '-' + createAtObj.day;

                return [
                    {
                        data: [
                            <span key={'checkboxContainer' + index} className={styles["table-checkbox"]}>
                            <Checkbox key={"checkbox" + index} name="checkbox" value={index}
                                      ref={e => this["checkbox" + index] = e}/></span>
                        ]
                    },
                    {
                        data: [
                            <span key={"username-" + index}
                                  className={styles["table-username"]}
                                  onClick={this.goUserDetail.bind(this, tr._id)}>{tr.username}</span>]
                    },
                    {
                        data: [
                            <span key={"email-" + index}
                                  className={styles["table-email"]}
                                  onClick={this.goUserDetail.bind(this, tr._id)}>{tr.mail}</span>]
                    },
                    {
                        data: [
                            <span key={"date-" + index}
                                  className={styles["table-date"]}
                                  onClick={this.goUserDetail.bind(this, tr._id)}>{createAt}</span>]
                    },
                    {
                        data: [
                            <span key={"comments-" + index}
                                  className={styles["table-comments"]}
                                  onClick={this.goUserDetail.bind(this, tr._id)}>0</span>]
                    },
                    {
                        data: [
                            <span key={"oauth-" + index}
                                  className={styles["table-oauth"]}
                                  onClick={this.goUserDetail.bind(this, tr._id)}>否</span>]
                    },
                ]
            })
        }
    }

    render() {

        const list = this.props.state.userList || [];

        return <div className={styles["user-management-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles["user-list-container"]}>
                <Table data={this.createTableDom(list)}/>
            </div>
            <div className={styles['page-container']}>
                <Page ref={e => this.pages = e} onChange={this.getUsers.bind(this)}/>
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