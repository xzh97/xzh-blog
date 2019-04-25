import Vue from 'vue';
import vueRouter from 'vue-router';

import blogsRoute from './blogs/index';

Vue.use(vueRouter);

const home = () => import('../views/home/index.vue');

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
];
routes.push(...blogsRoute);

export default new vueRouter({routes});
