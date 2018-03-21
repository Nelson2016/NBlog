import React from 'react';
import {Image, Editor} from 'nr';

const EditorStyle = Editor.Style;

import api from '../../../asset/js/api';
import functions from '../../../asset/js/functions';

import NotFound from '../../NotFound';

import styles from '../../../asset/scss/client/article/articleDetail.scss';

class ArticleDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            got: false
        };
    }

    /**
     * @description 获取文章详情数据
     * @returns {Promise.<void>}
     */
    async componentDidMount() {
        const articleId = this.props.match.params.articleId;

        const res = await functions.request(api.client.getArticleDetail, {
            body: {articleId}
        });

        const state = res.data;
        state.got = true;

        if (res.status === 1) {
            this.setState(state);
        }
    }

    render() {

        const data = this.state;
        let {title, author, abstract, createAt, content, category, cover, got} = data;

        //若没有用标题则显示文章为找到404页面
        if (!title && got) {
            return <div className={styles['article-not-fount']}>
                <NotFound/>
            </div>;
        }

        const createAtObj = functions.getStrTime(createAt);
        createAt = createAtObj.year + '-' + createAtObj.month + '-' + createAtObj.day + ' ' + createAtObj.hour + ':' + createAtObj.minute + ':' + createAtObj.second;

        return <div className={styles['main-container']}>
            {title && <article>
                <h1 className={styles['article-title']}>{title}</h1>
                <div className={styles['article-info']}>
                    <span>
                        {category.name} - {author.username} - {createAt}
                    </span>
                </div>
                <p className={styles['article-abstract']}>{abstract}</p>
                {cover && <div className={styles["article-cover"]}>
                    <Image src={cover} alt={cover}/>
                </div>}
                <div className={EditorStyle['editor-container']}>
                    <p className={styles['article-content']} dangerouslySetInnerHTML={{__html: content}}/>
                </div>
            </article>}
        </div>
    }

}

export default ArticleDetail;