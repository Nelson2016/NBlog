export default {
    /**
     * @description     检测用户名是否合法
     * @param username
     * @returns {boolean}
     */
    isUsername: (username) => {

        const usernameRegExp = /^[a-zA-Z0-9]{4,16}$/;

        if (usernameRegExp.test(username)) {
            return true
        }

        return false;

    },
    /**
     * @description     检测密码是否合法
     * @param username
     * @returns {boolean}
     */
    isPassword: (username) => {
        const passwordRegExp = /^[a-zA-Z0-9._]{6,16}$/;

        if (passwordRegExp.test(username)) {
            return true
        }

        return false;

    },
    /**
     * @description     验证邮箱是否合法
     * @param mail
     * @returns {boolean}
     */
    isMail: (mail) => {
        const mailRegExp = /^[A-Za-z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

        if (mailRegExp.test(mail)) {
            return true
        }

        return false;
    },
    /**
     * @description     同意设置数据返回格式
     * @param status
     * @param message
     * @param data
     * @returns {{status: number, message: string, data: {}}}
     */
    setResponse: (status = 1, message = '', data = {}) => {

        return {
            status,
            message,
            data
        }

    },
    /**
     * @description     返回指定长度的随机字符串（除去不易识别字符）
     * @param length
     * @returns {string}
     */
    randomString: (length) => {
        length = length || 6;
        //默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
        const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let str = '';
        for (let i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return str;
    },
    /**
     * @description 判断是否管理用户
     * @param ctx
     */
    isAdmin: (ctx) => {
        if (!ctx.session.user) {
            ctx.body = this.setResponse(-1, '抱歉，请先登录');
            return false;
        } else if (!ctx.session.user.admin) {
            ctx.body = this.setResponse(0, '抱歉，您没有权限进行此操作');
            return false;
        } else {
            return true;
        }
    },
    /**
     * @description 判断是否登录
     * @param ctx
     */
    isLogged: (ctx) => {
        if (!ctx.session.user) {
            ctx.body = this.setResponse(-1, '抱歉，请先登录');
            return false;
        } else {
            return true;
        }
    }
}