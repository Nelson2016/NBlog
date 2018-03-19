import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    up: Array,
    title: String,
    cover: String,
    author: String,
    content: String,
    createAt: Number,
    updateAt: Number,
    abstract: String,
    categoryId: String,
});

ArticleSchema.pre('save', async function (next) {
    if (!this.created) {
        this.createAt = Date.now();
    }
    this.updateAt = Date.now();
    await next();
});

const Article = mongoose.model('Article', ArticleSchema);

export default Article;