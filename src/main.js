import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex';
import store from './store/index'
import ElementUI from 'element-ui'
import './pattern/index.scss'
import aluk from './aluk'
import uploader from 'vue-simple-uploader'
import api from './axios/api.js' // 导入api接口
import VueI18n from 'vue-i18n'; // 多语言包
import './pattern/index.scss';


Vue.use(ElementUI)
Vue.use(aluk)
Vue.use(uploader)
Vue.use(VueI18n);
Vue.use(Vuex);


Vue.config.productionTip = false
Vue.prototype.$api = api; // 将api挂载到vue的原型上

const i18n = new VueI18n({
    locale: 'zh-CN', // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        'zh-CN': require('./i18n/zh-cn'), // 中文语言包
        'en-US': require('./i18n/en-us'), // 英文语言包
        'zh-HK': require('./i18n/zh-hk') // 繁体语言包
    }
});
// 多语言加入localStorage
localStorage.setItem('lang', i18n.locale);

new Vue({
    router,
    store: new Vuex.Store(store),
    i18n,
    render: h => h(App)
}).$mount('#app')