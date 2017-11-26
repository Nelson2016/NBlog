import React from 'react';

import ReactBreadcrumb from 'react-breadcrumbs';
import styles from "./breadcrumb.scss";

class Breadcrumb extends React.Component {

    render() {
        return <div className={styles["breadcrumb-container"]}>
            <span className={styles["breadcrumb-label"]}>您的位置：</span>
            <ReactBreadcrumb routes={this.props.routes} separator=" / " params={this.props.params || []}/>
        </div>;
    }

}


export default Breadcrumb;