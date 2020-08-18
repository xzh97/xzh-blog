import Vue from 'vue';
import vueRouter from 'vue-router';

import blogsRoute from './blogs/index';
import pluginsRoute from './plugins/index';

Vue.use(vueRouter);

const home = () => import('@/views/home/index');
const demo = () => import('@/views/demo/index');

const routes = [
    {
        path: '/',
        component: home,
        redirect: '/home',
        name:'index'
    },
    {
        path: '/home',
        component: home,
        name:'home'
    },
    {
        path: '/demo',
        component: demo,
        name:'demo'
    }
];
routes.push(...blogsRoute);
routes.push(...pluginsRoute);

const router = new vueRouter({routes});

// router.beforeEach((to, from, next) => {
//     console.log('beforeEach', router.app.$store);
//     router.app.$store.commit('setIsShowLoading',true);
//     next();
// })
// router.afterEach((to, from) => {
//     console.log('afterEach',);
// })

export default router;
