import ArticleModel from '../models/ArticleModel';
import CategoryModel from '../models/CategoryModel';
import UserModel from '../models/UserModel';
import functions from '../functions';

/**
 * @description 发布文章
 * @param ctx
 * @returns {Promise.<void>}
 */

const publishArticle = async (ctx) => {

    if (!functions.isAdmin(ctx)) {
        return;
    }

    const param = ctx.request.body, {title, abstract, cover, categoryId, content} = param;

    const articleIsExist = !!(await ArticleModel.findOne({title}).exec());

    if (articleIsExist) {
        ctx.body = functions.setResponse(0, '抱歉，该文章已存在');
    } else {
        if (!title) {
            ctx.body = functions.setResponse(0, '请输入文章标题');
            return;
        }
        if (!abstract) {
            ctx.body = functions.setResponse(0, '请输入文章摘要');
            return;
        }
        if (!cover) {
            ctx.body = functions.setResponse(0, '请上传文章封面');
            return;
        }
        if (!categoryId) {
            ctx.body = functions.setResponse(0, '请选择文章分类');
            return;
        }
        if (!content) {
            ctx.body = functions.setResponse(0, '请输入文章内容');
            return;
        }
        const article = new ArticleModel({
            up: 0,
            title,
            cover,
            author: ctx.session.user.uid,
            content,
            abstract,
            categoryId
        });

        try {
            await article.save();
            ctx.body = functions.setResponse(1, '恭喜您，发布成功');
        } catch (e) {
            console.log(e);
            ctx.body = functions.setResponse(0, '抱歉，发布失败');
        }
    }
};

/**
 * @description 获取文章列表
 * @param ctx
 * @returns {Promise.<void>}
 */

const getArticles = async (ctx) => {
    const param = ctx.request.query,
        articlesWithName = [],
        {page = 1, categoryId} = param,
        pageSize = 10,
        totalPage = Math.ceil(await ArticleModel.count().exec() / pageSize);

    let articles = [];

    if (categoryId === '0' || categoryId === undefined) {
        articles = await ArticleModel.find().limit(pageSize).skip((page - 1) * pageSize).exec();
    } else {
        articles = await ArticleModel.find({categoryId}).limit(pageSize).skip((page - 1) * pageSize).exec();
    }

    for (let i = 0; i < articles.length; i++) {
        const author = await UserModel.findById(articles[i].author).exec();
        const category = await CategoryModel.findById(articles[i].categoryId).exec();

        articlesWithName.push({
            abstract: articles[i].abstract,
            author: author || {},
            category: category || {},
            content: articles[i].content,
            cover: articles[i].cover,
            createAt: articles[i].createAt,
            title: articles[i].title,
            up: articles[i].up,
            updateAt: articles[i].updateAt,
            _id: articles[i]._id,
        });
    }

    ctx.body = functions.setResponse(1, '恭喜您，获取成功', {
        list: articlesWithName,
        pages: {totalPage, page}
    });
};

/**
 * @description 获取文章详情
 * @param ctx
 * @returns {Promise.<void>}
 */
const getArticleDetail = async (ctx) => {
    const param = ctx.request.query, {articleId} = param;

    const articleDetail = await ArticleModel.findById(articleId).exec();

    const author = await UserModel.findById(articleDetail.author).exec();
    const category = await CategoryModel.findById(articleDetail.categoryId).exec();

    let articleDetailWithAuthor = {
        abstract: articleDetail.abstract,
        author: author || {},
        category: category || {},
        content: articleDetail.content,
        cover: articleDetail.cover,
        createAt: articleDetail.createAt,
        title: articleDetail.title,
        up: articleDetail.up,
        updateAt: articleDetail.updateAt,
        _id: articleId,
    };

    if (!articleDetail) {
        ctx.body = functions.setResponse(0, '抱歉，文章不存在');
    } else {
        ctx.body = functions.setResponse(1, '恭喜您，获取成功', articleDetailWithAuthor);
    }

};

/**
 * @description 编辑文章
 * @param ctx
 */
const editArticle = async (ctx) => {

    if (!functions.isAdmin(ctx)) {
        return;
    }

    const param = ctx.request.body, {title, abstract, cover, categoryId, content, articleId} = param;

    const articleIsExist = !!(await ArticleModel.findById(articleId).exec());

    if (!articleIsExist) {
        ctx.body = functions.setResponse(0, '抱歉，该文章不存在');
    } else {
        if (!title) {
            ctx.body = functions.setResponse(0, '请输入文章标题');
            return;
        }
        if (!abstract) {
            ctx.body = functions.setResponse(0, '请输入文章摘要');
            return;
        }
        if (!cover) {
            ctx.body = functions.setResponse(0, '请上传文章封面');
            return;
        }
        if (!categoryId) {
            ctx.body = functions.setResponse(0, '请选择文章分类');
            return;
        }
        if (!content) {
            ctx.body = functions.setResponse(0, '请输入文章内容');
            return;
        }

        try {
            await ArticleModel.findByIdAndUpdate(articleId, {
                title,
                cover,
                content,
                abstract,
                categoryId
            });
            ctx.body = functions.setResponse(1, '恭喜您，编辑成功');
        } catch (e) {
            console.log(e);
            ctx.body = functions.setResponse(0, '抱歉，编辑失败');
        }
    }
};

export {publishArticle, getArticles, getArticleDetail, editArticle}