import Vue from 'vue';
import router from 'vue-router';
Vue.use(router);
const home = () => import('../views/home/index');
const routes = [
    {
        path: '/',
        redirect: '/home',
        name:'index',
        component:home,
    },
    {
        path: '/home',
        name:'index',
        component:home,
    },
]

export default new router({routes})