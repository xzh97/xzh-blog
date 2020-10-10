import Vue from 'vue';
import vueRouter from 'vue-router';

import blogsRoute from './blog';
import pluginsRoute from './plugin';
import demosRoute from './demo';

Vue.use(vueRouter);

const home = () => import('@/views/home/index');
const login = () => import('@/views/login/index');

const routes = [
    {
        path: '/',
        component: login,
        redirect: '/login',
        name:'index'
    },
    {
        path: '/home',
        component: home,
        name:'home'
    },
    {
        path: '/login',
        component: login,
        name:'login'
    }
];
routes.push(...blogsRoute);
routes.push(...pluginsRoute);
routes.push(...demosRoute);

const router = new vueRouter({routes});

// router.beforeEach((to, from, next) => {
//     console.log('beforeEach', router.app.$store);
//     router.app.$store.commit('setIsShowLoading',true);
//     next();
// })
router.afterEach((to, from) => {
    // console.log('afterEach',router);
    // router.app.$store.commit('setIsShowLoading',false);
})

export default router;
