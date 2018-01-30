import React from 'react';
import {Notice, Breadcrumb} from 'nr';

import config from '../../../config/config';
import styles from "../../../asset/scss/admin/data-stastistics/data-statistics.scss";

class DataStastistics extends React.Component {

    render() {
        return <div className={styles["data-statistics-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>
            <div className={styles.notice}>
                <Notice title="注意！" description='暂未开放该功能，嘿嘿~' type="warning"/>
            </div>
        </div>
    }

}

export default DataStastistics;