import Vue from 'vue';
import axios from "axios";
import qs from "qs";
import app from "../main.js"
import {
    Toast
} from 'vant';
// import aluk from '../aluk';

// Vue.use(aluk);
function getItem(name) {
    try {
        let o = JSON.parse(window.localStorage[name])
        if (!o || o.expires < Date.now()) {
            return null
        } else {
            return o.value
        }
    } catch (e) {
        // 兼容其他localstorage 
        return window.localStorage[name]
    } finally {}
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

function getCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for (var i = 0; i < arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if (cookieName == arr[0]) {
            return arr[1];
        }
    }
    return "";
}

function delCookie(cookieName) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(cookieName);
    if (cval != null)
        document.cookie = cookieName + "=" + cval + ";expires=" + exp.toGMTString();
}


/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
    Toast({
        message: msg,
        duration: 1000,
        forbidClick: true
    });
}


/****** 创建axios实例 ******/
const service = axios.create({
    // baseURL: process.env.VUE_APP_HOST, // api的base_url
    timeout: 15000, // 请求超时时间
    withCredentials: true, // 携带cookie
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json"
    },
});



// 请求拦截器
service.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        var token = getCookie("TOKEN");
        token && (config.headers.common["Authorization"] = token);
        return config;
    },
    error => {

        return Promise.error(error);
    })


// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面， 并携带当前页面的路径
                // 在登录成功后返回当前页面， 这一步需要在登录页操作。
                case 401:
                    // 清除token                    
                    delCookie('TOKEN');
                    window.location = 'http://www.demo.com';
                    break;
                    // 403 token过期                
                    // 登录过期对用户进行提示                
                    // 清除本地token和清空vuex中token对象                
                    // 跳转登录页面                
                case 403:
                    // 清除token                    
                    delCookie('TOKEN');
                    window.location = 'http://www.demo.com';
                    break;
                    // 404请求不存在                
                case 404:
                    Toast({
                        message: '网络请求不存在',
                        duration: 1500,
                        forbidClick: true
                    });
                    break;
                    // 其他错误，直接抛出错误提示                
                default:
                    Toast({
                        message: error.response.data.message,
                        duration: 1500,
                        forbidClick: true
                    });
            }
            return Promise.reject(error.response);
        }
    }
);
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

export default service;