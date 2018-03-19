import "isomorphic-fetch";
import promise from 'es6-promise';
import {Toast} from 'nr';
import api from './api';

promise.polyfill();

export default {
    request: (url, options) => {

        url = api.host + url;

        const defaultOptions = {method: 'GET', credentials: 'same-origin', body: {}};

        options = Object.assign({}, defaultOptions, options);

        const requestBody = options.body;


        //GET请求序列化数据到URL
        if (options.method.toUpperCase() === 'GET') {
            let paramString = '';
            if (requestBody.toString() === '[object Object]') {
                for (let i in requestBody) {
                    if (requestBody.hasOwnProperty(i)) {
                        paramString += "&" + i + "=" + requestBody[i];
                    }
                }
                paramString = "?" + paramString.substring(1);
                url += paramString;
                delete options.body;
            }
        } else {
            options.headers = {
                'Content-Type': 'application/json'
            };
            options.body = JSON.stringify(requestBody);
        }


        return fetch(url, options).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('Server Error : ' + res.status);
            }
        }).then((res) => {
            if (res.status !== 1) {
                Toast.error(res.message);
            }
            return res;
        })

    },
    /**
     * @description     根据时间戳获取时间值
     * @param stamp     时间戳
     * @returns {{year: number, month: string, day: string, hour: string, minute: string, second: string}}
     */
    getStrTime: (stamp) => {
        const timeObject = new Date(stamp);

        let year = timeObject.getFullYear(),
            month = (timeObject.getMonth() + 1).toString(),
            day = timeObject.getDate().toString(),
            hour = timeObject.getHours().toString(),
            minute = timeObject.getMinutes().toString(),
            second = timeObject.getSeconds().toString();

        //格式化一位数的时间字符串
        month.length < 2 && (month = '0' + month);
        day.length < 2 && (day = '0' + day);
        hour.length < 2 && (hour = '0' + hour);
        minute.length < 2 && (minute = '0' + minute);
        second.length < 2 && (second = '0' + second);

        return {year, month, day, hour, minute, second};
    }
}