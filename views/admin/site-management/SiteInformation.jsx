import React from 'react';

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Notice from "../../components/Notice/Notice";

import styles from "../../../asset/scss/admin/site-management/site-information.scss";

class SiteInformation extends React.Component {

    render() {
        return <div className={styles["site-information-container"]}>
            <Breadcrumb routes={this.props.routes} params={this.props.params}/>
            <Notice title="注意！" description='暂时还没有什么可设置的，嘿嘿~' type="warning"/>
        </div>
    }

}

export default SiteInformation;