import React from 'react';
import {Table, Title} from 'nr';

import styles from '../../../asset/scss/admin/common/normal-list.scss';

class NormalList extends React.Component {

    render() {
        return <div className={styles["normal-list"]}>
            <Title title={this.props.title} more={this.props.more}/>
            <Table data={this.props.data}/>
        </div>
    }

}

export default NormalList;