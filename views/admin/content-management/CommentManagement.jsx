import React from 'react';
import {connect} from 'react-redux';
import {Breadcrumb, Table, Page, Checkbox, Notice} from 'nr';

import config from '../../../config/config';

import styles from '../../../asset/scss/admin/content-management/comment-management.scss';

import {updateCommentList} from '../../../store/action';

class CommentManagement extends React.Component {

    constructor(props, context) {
        super(props);
        // let datas = [{
        //     author: "Nelson",
        //     date: "2017-01-01 12:12:12",
        //     comment: "111",
        // }, {
        //     author: "Nelson",
        //     date: "2017-01-01 12:12:12",
        //     comment: "22222",
        // }, {
        //     author: "Nelson",
        //     date: "2017-01-01 12:12:12",
        //     comment: "333333",
        // }];
        //
        // this.props.updateCommentList(this.createTableDom(datas));
        //
        // this.state = this.props.state;

    }


    // /**
    //  * @description 全选
    //  */
    // toCheckAll() {
    //     let _this = this;
    //     this.state.commentList.rows.map((item, index) => {
    //         _this["checkbox" + index].setChecked(this.checkAll.isChecked());
    //     })
    // }
    //
    // /**
    //  * @description 根据数据创建表格DOM
    //  *
    //  * @param data 数据
    //  * @param type 创建数据的类型
    //  */
    // createTableDom(data) {
    //
    //     const title = [
    //         {
    //             data: [
    //                 <span key='checkAllContainer' className={styles["table-checkbox"]}>
    //                     <Checkbox ref={e => this.checkAll = e} key="checkAll" name="checkAll" value="-1"
    //                               onChange={this.toCheckAll.bind(this)}/>
    //                 </span>
    //             ]
    //         },
    //         {data: [<span key={"author-"} className={styles["table-author"]}>评论人</span>]},
    //         {data: [<span key={"content-"} className={styles["table-content"]}>内容</span>]},
    //         {data: [<span key={"date-"} className={styles["table-date"]}>日期</span>]},
    //     ];
    //
    //     return {
    //         title,
    //         rows: data.map((tr, index) => [
    //             {
    //                 data: [
    //                     <span key={'checkboxContainer' + index} className={styles["table-checkbox"]}>
    //                         <Checkbox key={"checkbox" + index} name="checkbox" value={index}
    //                                   ref={e => this["checkbox" + index] = e}/>
    //                     </span>]
    //             },
    //             {data: [<span key={"author-" + index} className={styles["table-author"]}>{tr.author}</span>]},
    //             {data: [<span key={"content-" + index} className={styles["table-content"]}>{tr.comment}</span>]},
    //             {data: [<span key={"date-" + index} className={styles["table-date"]}>{tr.date}</span>]},
    //         ])
    //     }
    // }

    render() {
        return <div className={styles["comment-management-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles.notice}>
                <Notice title="注意！" description='该功能暂未开放，嘿嘿~' type="warning"/>
            </div>

            {/*<div className={styles['comment-list-container']}>*/}
            {/*<Table data={this.state.commentList}/>*/}
            {/*</div>*/}

            {/*<div className={styles['page-container']}>*/}
            {/*<Page currentPage={1} totalPage={10}/>*/}
            {/*</div>*/}
        </div>
    }

}

const mapStateToProps = (state, ownProps) => {
    return {state: state}
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateCommentList: (args) => dispatch(updateCommentList(args))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CommentManagement);