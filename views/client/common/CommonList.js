import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Image} from 'nr';

import functions from '../../../asset/js/functions';
import config from '../../../config/config';

import styles from '../../../asset/scss/client/common/common-list.scss';

class CommonList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articleList: [],
        };
    }

    setData(articleList) {
        this.setState({articleList});
    }

    render() {
        const articleListDom = this.state.articleList.map((item, index) => {

            const createAtObj = functions.getStrTime(item.createAt);
            const createAt = createAtObj.year + '-' + createAtObj.month + '-' + createAtObj.day;

            return <li key={item._id}>
                <Link to={config.common.breadcrumb.client.articleDetail.path + '/' + item._id}>
                    {item.cover && <div className={styles["common-list-cover"]}>
                        <Image src={item.cover} alt={item.cover}/>
                    </div>}
                    <div className={styles["common-list-content"]}>
                        <div className={styles["common-list-info"]}>
                            <span className={styles["common-list-category"]}>{item.category.name}</span>
                            <span className={styles["common-list-author"]}>{item.author.username}</span>
                            <span className={styles["common-list-time"]}>{createAt}</span>
                        </div>
                        <h1 className={styles["common-list-title"]}>{item.title}</h1>
                        <p className={styles['common-list-abstract']}>{item.abstract}</p>
                    </div>
                </Link>
            </li>
        });

        return <div className={styles["common-list-container"]}>
            <ul>
                {articleListDom}
            </ul>
        </div>
    }

}

export default CommonList;