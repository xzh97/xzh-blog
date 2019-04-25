const blogsList = () => import('@/views/blogs/list/index');
const blogsDetail = () => import('@/views/blogs/list/index');
const addBlog = () => import('@/views/blogs/list/index');
const routes = [
    {
        path:'/blog/list',
        name: 'blogList',
        component:blogsList,
        meta:{},
    },
    {
        path:'/blog/detail',
        name: 'blogDetail',
        component:blogsDetail,
        meta:{},
    },
    {
        path:'/blog/new',
        name: 'addBlog',
        component:addBlog,
        meta:{},
    },
]
export default routes;