import Vue from 'vue';

export default {
    install: function(Vue, options) {
        Vue.component("unex-loading", () =>
            import ('../components/unex-loading/index.vue'));
        Vue.component("unex-dialog", () =>
            import ('../components/unex-dialog/index.vue'));
        Vue.component("unex-search-bar", () =>
            import ('../components/unex-search-bar/index.vue'));
        Vue.component("unex-menu", () =>
            import ('../components/unex-menu/src/menu.vue'));
        Vue.component("unex-select-multiple", () =>
            import ('../components/unex-select-multiple/index.vue'));
        Vue.component("uenx-button", () =>
            import ('../components/unex-button/index.vue'));
        Vue.component("uenx-input", () =>
            import ('../components/unex-input/unex-input.vue'));



        // 1. 添加全局方法或属性
        Vue.myGlobalMethod = function() {
            // 逻辑...
            console.log('myGlobalMethod')
        }

        // 2. 添加全局资源
        Vue.directive('my-directive', {
            bind(el, binding, vnode, oldVnode) {
                // 逻辑...
            }
        })

        // 3. 注入组件
        Vue.mixin({
            created: function() {
                // 逻辑...
            }
        })

        // 4. 添加实例方法
        Vue.prototype.$aluk =
            // 逻辑...
            {
                setItem: function(key, value, time) {
                    // 设置过期原则
                    if (!value) {
                        window.localStorage.removeItem(key)
                    } else {
                        window.localStorage[key] = JSON.stringify({
                            value,
                            expires: time
                        })
                    }
                },
                getItem: function(name) {
                    console.log(name)
                    try {
                        let o = JSON.parse(window.localStorage[name])
                        if (!o || o.expires < Date.now()) {
                            return null
                        } else {
                            return o.value
                        }
                    } catch (e) {
                        // 兼容其他localstorage 
                        console.log(e)
                        return window.localStorage[name]
                    } finally {}
                },
            }
    }
}