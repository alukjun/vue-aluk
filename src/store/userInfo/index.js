/* moduleA.js */

import Vue from 'vue';
import api from '../../axios/api.js' // 导入api接口

export default {
    namespaced: true,
    state: {
        menuList: []
    },
    mutations: {
        // 设置菜单列表
        setMenuList(state, options) {
            state.menuList = options;
        }
    },

    actions: {
        // 获取用户权限接口
        _getUserInfo(store, options) {
            api.users.getPermission().then(res => {
                store.commit('setMenuList', res.data.data.menuItems)
            });
        }
    },

    getters: {

    }
}