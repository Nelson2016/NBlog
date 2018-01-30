import React from 'react';
import {connect} from 'react-redux';
import {Button, Breadcrumb, Tree} from 'nr';

import config from '../../../config/config';

import styles from '../../../asset/scss/admin/content-management/category-management.scss';

import {updateCategoryList} from '../../../store/action';

import functions from '../../../asset/js/functions';
import api from '../../../asset/js/api';

class CategoryManagement extends React.Component {

    constructor(props, context) {
        super(props);

        // let data = [
        //     {
        //         title: "这里是主题1",
        //         sub: [
        //             {title: "这里是主题1的子主题1"},
        //             {title: "这里是主题1的子主题1"},
        //             {
        //                 title: "这里是主题1的子主题1",
        //                 sub: [
        //                     {title: "这里是主题1的子主题1的子主题"},
        //                 ]
        //             }
        //         ]
        //     },
        //     {
        //         title: "这里是主题2",
        //         sub: [
        //             {title: "这里是主题2的子主题1"},
        //             {title: "这里是主题2的子主题2"}
        //         ]
        //     }
        // ];
        //
        // this.props.updateCategoryList(data);
        //
        // this.state = this.props.state;

    }

    componentDidMount() {
        functions.request(api.admin.getCategory, {
            body: {
                format: true
            }
        }).then((res) => {
            if (res.status === 1) {
                this.props.updateCategoryList(res.data)
            }
        })
    }

    onChoose() {
        this.props.history.push({
            pathname: config.common.breadcrumb.admin.categoryDetail.path,
        })
    }

    enterAddCategory() {
        this.props.history.push({
            pathname: config.common.breadcrumb.admin.categoryDetail.path,
        })
    }

    render() {

        return <div className={styles["category-management-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles['add-category-btn']}>
                <Button text="创建分类" onClick={this.enterAddCategory.bind(this)}/>
            </div>

            <div className={styles["category-tree-container"]}>
                <Tree data={this.props.state.categoryList || []} onChoose={this.onChoose.bind(this)}/>
            </div>
        </div>
    }

}

const mapStateToProps = (state, ownProps) => {
    return {state: state}
};


const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateCategoryList: (args) => dispatch(updateCategoryList(args))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(CategoryManagement);