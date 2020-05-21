import Vue from 'vue';
import vueRouter from 'vue-router';

import blogsRoute from './blogs/index';
import pluginsRoute from './plugins/index';

Vue.use(vueRouter);

const home = () => import('@/views/home/index');
const demo = () => import('@/views/demo/index');
const login = () => import('@/views/login/index');

const routes = [
    {
        path: '/',
        component: home,
        redirect: '/login',
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
    },
    {
        path: '/login',
        component: login,
        name:'login'
    },
];
routes.push(...blogsRoute);
routes.push(...pluginsRoute);

const router = new vueRouter({routes});


router.beforeEach((to, from, next) => {
    next();
});

export default router;
