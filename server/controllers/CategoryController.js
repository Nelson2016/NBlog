import CategoryModel from '../models/CategoryModel';
import functions from '../functions';

/**
 * @description 添加分类
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
const addCategory = async (ctx, next) => {
    const param = ctx.request.body, {name, parentId} = param;

    if (!name) {
        ctx.body = functions.setResponse(0, '对不起，请填写分类名称');
    } else {

        const findCategory = await CategoryModel.find({name}).exec(), categoryExist = !!findCategory[0];

        if (categoryExist) {

            ctx.body = functions.setResponse(0, '对不起，该分类已存在');

        } else if (parentId) {

            const findParentCategory = await CategoryModel.findById(parentId).exec();
            const parentCategoryExist = !!findParentCategory;

            if (parentCategoryExist) {

                const category = new CategoryModel({
                    parentId,
                    name,
                    subIds: []
                });

                try {
                    const newCategory = await category.save();
                    const newCategoryId = newCategory._id;
                    findParentCategory.subIds.push(newCategoryId)

                    await CategoryModel.findByIdAndUpdate(parentId, {subIds: findParentCategory.subIds});
                    ctx.body = functions.setResponse(1, '恭喜您，添加成功');
                } catch (e) {
                    ctx.body = functions.setResponse(0, '对不起，添加失败');
                }

            } else {

                ctx.body = functions.setResponse(0, '对不起，父分类不存在');

            }

        } else {

            const category = new CategoryModel({
                parentId: "",
                name,
                subIds: []
            });

            try {
                await category.save();
                ctx.body = functions.setResponse(1, '恭喜您，添加成功');
            } catch (e) {
                ctx.body = functions.setResponse(0, '对不起，添加失败');
            }

        }

    }

};

/**
 * @description 格式化分类为前端所用的数据格式
 * @param data
 */
const formatCategory = async (data) => {
    if (!data[0].name) {
        for (let i = 0; i < data.length; i++) {
            data[i] = await CategoryModel.findById(data[i]).exec();
        }
    }

    let result = [];

    for (let j = 0; j < data.length; j++) {

        result.push({
            id: data[j]._id,
            title: data[j].name,
            sub: data[j].subIds.length > 0 && await formatCategory(data[j].subIds)
        })
    }

    return result;
};

/**
 * @description     根据id获取分类，不传id则为全部分类
 * @param ctx
 * @returns {Promise.<void>}
 */
const getCategory = async (ctx) => {
    const param = ctx.request.query, {id, format} = param;

    let result = [];
    if (!id) {
        if (format) {
            const mailCategories = await CategoryModel.find({parentId: ""}).exec();
            result = await formatCategory(mailCategories)
        } else {
            const categories = await CategoryModel.find().exec();
            result = categories.map((item) => {
                return {
                    id: item._id,
                    title: item.name,
                }
            })
        }
        ctx.body = functions.setResponse(1, '恭喜您，获取成功', result);
    } else {
        // ctx.body = functions.setResponse(0, '抱歉，获取失败');
    }
};


export {addCategory, getCategory}