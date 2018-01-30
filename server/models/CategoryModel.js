import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let CategorySchema = new Schema({
    parentId: String,
    name: String,
    subIds: Array
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;