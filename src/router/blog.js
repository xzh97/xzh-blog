const blogsList = () => import('@/views/blogs/list');
const blogsDetail = () => import('@/views/blogs/detail');
const routes = [
    {
        path:'/blog/list/:categoryOid',
        name: 'blogList',
        component:blogsList,
        meta:{},
    },
    {
        path:'/blog/detail/:blogOid',
        name: 'blogDetail',
        component:blogsDetail,
        meta:{},
    },
]
export default routes;
