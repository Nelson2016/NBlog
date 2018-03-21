import crypto from 'crypto';
import UserModel from '../models/UserModel';

import functions from '../functions';
import config from "../../config/config";

/**
 * @description     用户登录
 * @param ctx
 * @returns {Promise.<void>}
 */
const login = async (ctx) => {
    const param = ctx.request.body, {mail, password} = param;

    if (!functions.isMail(mail)) {
        ctx.body = functions.setResponse(0, '邮箱地址有误');
    } else if (!functions.isPassword(password)) {
        ctx.body = functions.setResponse(0, '密码为6-16位字符，可包含.或_');
    } else {
        const userInfo = await UserModel.findOne({mail}).exec();
        const isLogged = !!ctx.session.user;

        if (!userInfo) {
            ctx.body = functions.setResponse(0, '抱歉，用户名或密码错误');
        } else {
            const passwordPlus = crypto.createHash('md5').update(password + userInfo.random).digest('hex');
            if (passwordPlus !== userInfo.password) {
                ctx.body = functions.setResponse(0, '抱歉，用户名或密码错误');
            } else if (isLogged) {
                ctx.body = functions.setResponse(0, '抱歉，该用户已经登录');
            } else {
                ctx.session.user = {
                    mail,
                    passwordPlus,
                    admin: userInfo.jurisdiction.admin,
                    uid: userInfo._id
                };
                ctx.body = functions.setResponse(1, '恭喜您，登陆成功', {
                    admin: userInfo.jurisdiction.admin
                });
            }
        }
    }
};

/**
 * @description     用户注册
 * @param ctx
 * @returns {Promise.<void>}
 */
const register = async (ctx) => {
    const param = ctx.request.body, {mail, password, admin, username = mail} = param;

    if (!config.debug && admin) {
        ctx.body = functions.setResponse(0, '抱歉，您没有权限注册管理用户');
    } else if (!functions.isMail(mail)) {
        ctx.body = functions.setResponse(0, '邮箱地址有误');
    } else if (!functions.isPassword(password)) {
        ctx.body = functions.setResponse(0, '密码为6-16位字符，可包含.或_');
    } else {

        const random = functions.randomString(6);

        const user = new UserModel({
            username,
            mail,
            password: crypto.createHash('md5').update(password + random).digest('hex'),
            random,
            jurisdiction: {
                comment: false,
                admin
            },
            token: crypto.createHash('md5').update(username + random + Date.now()).digest('hex')
        });

        const findUsers = await UserModel.find({
            mail
        }).exec(), userExist = !!findUsers[0];

        if (userExist) {
            ctx.body = functions.setResponse(0, '抱歉，该邮箱已经注册');
        } else {
            try {
                await user.save();
                ctx.body = functions.setResponse(1, '恭喜您，注册成功');
            } catch (e) {
                console.log(e)
                ctx.body = functions.setResponse(0, '抱歉，注册失败');
            }
        }
    }
};

/**
 * @description     退出登录
 * @param ctx
 * @returns {Promise.<void>}
 */
const logout = async (ctx) => {
    ctx.session.user = undefined;
    ctx.body = functions.setResponse(1, '恭喜您，退出登录成功');
};

/**
 * @description 获取用户列表
 * @param ctx
 * @returns {Promise.<void>}
 */
const getUsers = async (ctx) => {

    if (!functions.isAdmin(ctx)) {
        return
    }

    const param = ctx.request.query,
        {page = 1} = param,
        pageSize = 10,
        totalPage = Math.ceil(await UserModel.count().exec() / pageSize);

    const users = await UserModel.find().limit(pageSize).skip((page - 1) * pageSize).exec();

    ctx.body = functions.setResponse(1, '恭喜您，获取成功', {
        list: users,
        pages: {totalPage, page}
    })
};

/**
 * @description 获取用户详情
 * @param ctx
 */
const getUserDetail = async (ctx) => {

    if (!functions.isAdmin(ctx)) {
        return
    }

    const param = ctx.request.query, {uid} = param;
    const userDetail = await UserModel.findById(uid).exec();

    if (!userDetail) {
        ctx.body = functions.setResponse(1, '抱歉，用户不存在')
    } else {
        ctx.body = functions.setResponse(1, '恭喜您，获取成功', userDetail)
    }

};

/**
 * @description     编辑用户信息
 * @param ctx
 * @returns {Promise.<void>}
 */
const editUser = async (ctx) => {

    if (!functions.isAdmin(ctx)) {
        return
    }

    const param = ctx.request.body, {uid, username, mail} = param;
    const userInfo = await UserModel.findById(uid).exec();

    if (!functions.isUsername(username)) {
        ctx.body = functions.setResponse(0, '对不起，用户名输入有误');
        return;
    }

    if (!functions.isPassword(username)) {
        ctx.body = functions.setResponse(0, '对不起，邮箱输入有误');
        return;
    }

    if (!userInfo) {
        ctx.body = functions.setResponse(0, '抱歉，用户不存在');
    } else {
        try {
            await UserModel.findByIdAndUpdate(uid, {username, mail});
            ctx.body = functions.setResponse(1, '恭喜您，修改成功');
        } catch (e) {
            console.log(e);
            ctx.body = functions.setResponse(0, '抱歉，修改失败');
        }
    }
};

/**
 * @description     修改用户密码
 * @param ctx
 * @returns {Promise.<void>}
 */
const modifyPassword = async (ctx) => {
    if (!functions.isLogged(ctx)) {
        return;
    }

    const param = ctx.request.body,
        uid = ctx.session.user.uid,
        {oldPassword, newPassword, confirmPassword} = param;

    if (!functions.isPassword(oldPassword)) {
        ctx.body = functions.setResponse(0, '抱歉，旧密码输入有误，密码为6-16位字符，可包含.或_');
        return;
    }

    const userInfo = await UserModel.findById(uid).exec();
    const random = userInfo.random;
    const oldPasswordPlus = crypto.createHash('md5').update(oldPassword + random).digest('hex');
    const newPasswordPlus = crypto.createHash('md5').update(newPassword + random).digest('hex');

    if (oldPasswordPlus !== userInfo.password) {
        ctx.body = functions.setResponse(0, '抱歉，旧密码输入有误');
        return;
    }

    if (!functions.isPassword(newPassword)) {
        ctx.body = functions.setResponse(0, '抱歉，新密码输入有误，密码为6-16位字符，可包含.或_');
        return;
    }

    if (!functions.isPassword(confirmPassword)) {
        ctx.body = functions.setResponse(0, '抱歉，确认密码输入有误，密码为6-16位字符，可包含.或_');
        return;
    }

    if (confirmPassword !== newPassword) {
        ctx.body = functions.setResponse(0, '抱歉，两次输入的新密码不一致');
        return;
    }

    try {
        await UserModel.findByIdAndUpdate(uid, {
            password: newPasswordPlus
        });
        ctx.body = functions.setResponse(1, '恭喜您，修改成功');
    } catch (e) {
        console.log(e);
        ctx.body = functions.setResponse(0, '抱歉，修改失败');
    }


};

export {login, register, logout, getUsers, getUserDetail, editUser, modifyPassword};