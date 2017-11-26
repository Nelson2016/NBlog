import React from 'react';

import styles from "./notice.scss";

/**
 * 通用提示组件
 *
 * [String]     Props.title                 提示的标题
 * [String]     Props.description           提示的详细信息
 * [String]     Props.type [error|warning]  提示类型
 *
 */

class Notice extends React.Component {

    render() {
        return <div className={styles["n-notice-" + this.props.type]}>
            <h2>{this.props.title}</h2>
            {
                typeof this.props.description === 'string' ?
                    <p>{this.props.description}</p> :
                    this.props.description.map((item, index) => <p key={index}>{item}</p>)
            }
        </div>
    }

}

export default Notice;