import {createRouter, createWebHashHistory} from 'vue-router';

import blogsRoute from './blog';
import demosRoute from './demo';

const home = () => import('@/views/home');
const login = () => import('@/views/login');

const routes = [
    {
        path: '/',
        redirect: '/index/index',
        name:'index'
    },
    {
        path: '/index/:navId',
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
routes.push(...demosRoute);

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

// router.beforeEach((to, from, next) => {
//     console.log('beforeEach', router.app.$store);
//     router.app.$store.commit('setIsShowLoading',true);
//     next();
// })
// router.afterEach((to, from) => {
//     console.log('afterEach',router);
//     router.app.$store.commit('setIsShowLoading',false);
// })

export default router;
