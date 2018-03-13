import mongoose from 'mongoose';

const Schema = mongoose.Schema;


let CategorySchema = new Schema({
    parentIds: Array,
    name: String,
    subIds: Array
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;