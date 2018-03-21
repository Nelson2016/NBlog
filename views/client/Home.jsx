import React from 'react';
import {Image, Page} from 'nr';
import {connect} from 'react-redux';

import functions from '../../asset/js/functions';
import api from '../../asset/js/api';

import CommonList from './common/CommonList';

import Banner from '../../asset/images/client/banner.jpg';
import styles from '../../asset/scss/client/home.scss';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            articleList: [],
            pages: []
        };
    }

    componentDidMount() {
        this.getArticles();
    }

    componentDidUpdate() {
        this.getArticles();
    }

    getArticles(page = 1) {
        const categoryId = this.props.match.params.categoryId;

        const _this = this;
        functions.request(api.client.getArticles, {
            body: {page, categoryId}
        }).then((res) => {
            if (res.status === 1) {
                const data = res.data, pages = data.pages;

                _this.commonList.setData(data.list);
                _this.pages.setPageData(pages.page, pages.totalPage)
            }
        })
    }

    render() {

        return <div className={styles['home-container']}>
            <div className={styles['banner']}>
                <Image src={Banner} alt={Banner}/>
            </div>

            <div className={styles['home-list']}>
                <CommonList ref={e => this.commonList = e} data={this.state.articleList} pages={this.state.pages}/>
            </div>

            <Page ref={e => this.pages = e} onChange={this.getArticles.bind(this)}/>
        </div>
    }

}


const mapStateToProps = (state, ownProps) => {
    return {state: state}
};

export default connect(mapStateToProps)(Home);