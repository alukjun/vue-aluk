/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from './request'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const users = {
    // 获取权限信息    
    getPermission() {
        return axios.post(
            `/platform/acl/baseInfo`
        );
    },
    // 获取用户版本s   
    getVersion() {
        return axios.post(`/platform/version`);
    },
}

export default users;