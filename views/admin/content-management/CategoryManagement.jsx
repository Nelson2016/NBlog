import React from 'react';
import {connect} from 'react-redux';
import {Button, Breadcrumb, Table, Page, Checkbox} from 'nr';

import config from '../../../config/config';

import styles from '../../../asset/scss/admin/content-management/category-management.scss';

import {updateCategoryList} from '../../../store/action';

import functions from '../../../asset/js/functions';
import api from '../../../asset/js/api';

class CategoryManagement extends React.Component {

    constructor(props, context) {
        super(props);

        this.state = this.props.state;
    }

    componentDidMount() {
        this.getCategoryList();
    }

    /**
     * @description 获取分类列表
     * @param page  页码
     */
    getCategoryList(page = 1) {
        const _this = this;
        functions.request(api.admin.getCategory, {
            body: {page}
        }).then((res) => {
            if (res.status === 1) {
                const data = res.data, pages = data.pages;

                _this.props.updateCategoryList(data);
                _this.pages.setPageData(pages.page, pages.totalPage)
            }
        })
    }

    /**
     * @description 进入添加分类页面
     */
    enterAddCategory(categoryId) {
        let pathname = config.common.breadcrumb.admin.categoryDetail.path;
        categoryId && (pathname += '/' + categoryId);

        this.props.history.push({
            pathname
        })
    }

    /**
     * @description 全选
     */
    toCheckAll() {
        const _this = this, categoryList = this.props.state.categoryList.list || [];

        categoryList.map((item, index) => {
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
            {data: [<span key={"category-name"} className={styles["table-category-name"]}>分类名</span>]},
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
                {
                    data: [<span key={"category-name-" + index}
                                 onClick={this.enterAddCategory.bind(this, tr.id)}
                                 className={styles["table-category-name"]}>{tr.title}</span>]
                },
            ])
        }
    }

    render() {

        const list = this.props.state.categoryList ? this.props.state.categoryList.list : [];

        return <div className={styles["category-management-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>

            <div className={styles['add-category-btn']}>
                <Button text="创建分类" onClick={this.enterAddCategory.bind(this)}/>
            </div>

            <div className={styles["category-list-container"]}>
                <Table data={this.createTableDom(list)}/>
            </div>
            <div className={styles['page-container']}>
                <Page ref={e => this.pages = e} onChange={this.getCategoryList.bind(this)}/>
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