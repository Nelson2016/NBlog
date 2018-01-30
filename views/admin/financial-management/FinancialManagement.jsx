import React from 'react';
import {Notice, Breadcrumb} from 'nr';

import config from '../../../config/config';
import styles from "../../../asset/scss/admin/financial-management/financial-management.scss";

class FinancialManagement extends React.Component {

    render() {
        return <div className={styles["financial-management-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>
            <div className={styles.notice}>
                <Notice title="注意！" description='暂时还没有什么可设置的，嘿嘿~' type="warning"/>
            </div>
        </div>
    }

}

export default FinancialManagement;