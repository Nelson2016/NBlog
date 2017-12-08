import React from 'react';
import {Link} from 'react-router';

import styles from './table.scss';

/**
 * 通用表格组件
 *
 * [Object]     Props.data [{td,td},{td,td}]   表格数据
 *
 */

class Table extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const data = this.props.data;
        const rows = data.rows.map((tr, index) => <tr key={"tr-" + index}>
            {
                tr.map((td, index) => <td key={"td-" + index}>
                    {td.data}
                </td>)
            }
        </tr>);

        return <div className={styles["n-table"]} style={this.props.style}>
            <table>
                {data.title && <caption className={styles["n-table-caption"]}>
                    <div className={styles["n-table-caption-row"]}>
                        {data.title && <h4 className={styles["n-table-title"]}>{data.title}</h4>}
                        {data.more && <Link className={styles["n-table-more"]}>{data.more.text}</Link>}
                    </div>
                </caption>}
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    }

}

export default Table;