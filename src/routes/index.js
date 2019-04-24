import Vue from 'vue';
import vueRouter from 'vue-router';

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

export default new vueRouter({routes});
