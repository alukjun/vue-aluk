import Vue from 'vue'
import Router from 'vue-router'
import aluk from './aluk'

Vue.use(Router)
Vue.use(aluk)

const routers = {
    mode: 'history',
    routes: [{
            path: '/',
            component: () =>
                import ('./components/layout/layout.vue'),
            name: 'layout',
            redirect: '/platform',
            children: [{
                path: '/platform',
                component: () =>
                    import ('./components/welcome.vue'),
                name: 'welcome',
                meta: { title: '欢迎', icon: 'welcome', keepAlive: false, requireAuth: true },
            }]
        }, {
            path: '/',
            component: () =>
                import ('./components/layout/layout.vue'),
            redirect: '/platform',
            name: 'layout',
            children: [{
                path: '/platform/version',
                component: () =>
                    import ('./pages/userInfo.vue'),
                name: 'userInfo',
                meta: { title: '用户', icon: 'userInfo', keepAlive: false, requireAuth: true },
            }]
        }

    ]
}


const router = new Router(routers);
console.log(router)

function getItem(name) {
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
        return window.localStorage[name]
    } finally {}
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

router.beforeEach((to, from, next) => {
    console.log(from, to)
    if (from.name === null && to.name === 'error_404') {
        next({ path: to.path })
        return
    }
    const token = getCookie("TOKEN");
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        if (token) { // 判断当前的token是否存在
            next();
        } else {
            window.location = 'http://www.demo.com';
        }
    } else {
        next();
    }
});
router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
        router.replace(targetPath);
    }
});

export default router;