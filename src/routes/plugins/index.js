const pluginIndex = () => import('@/views/plugins/index');

const routes = [
    {
        path: '/plugins/index',
        component: pluginIndex,
        name:'pluginsIndex',
        meta:{},
    },
]
export default routes;