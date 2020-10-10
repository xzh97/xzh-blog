const demoComp = () => import('@/views/demo/index');
const virtualList = () => import('@/views/demo/virtualList');
const routes = [
    {
        path: '/demo',
        component: demoComp,
        name:'demo'
    },
    {
        path:'/demo/virtual-list',
        name: 'virtualList',
        component:virtualList,
        meta:{},
    },
]
export default routes;
