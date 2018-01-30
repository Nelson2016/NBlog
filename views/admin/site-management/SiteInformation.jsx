import React from 'react';
import {Notice, Breadcrumb} from 'nr';

import config from '../../../config/config';
import styles from "../../../asset/scss/admin/site-management/site-information.scss";

class SiteInformation extends React.Component {

    render() {
        return <div className={styles["site-information-container"]}>
            <Breadcrumb config={config.common.breadcrumb.admin} path={this.props.location.pathname}/>
            <div className={styles.notice}>
                <Notice title="注意！" description='暂时还没有什么可设置的，嘿嘿~' type="warning"/>
            </div>
        </div>
    }

}

export default SiteInformation;