const blogsList = () => import('@/views/blogs/list/index');
const blogsDetail = () => import('@/views/blogs/detail/index');
const addBlog = () => import('@/views/blogs/create/index');
const routes = [
    {
        path:'/blog/list/',
        name: 'blogList',
        component:blogsList,
        meta:{},
    },
    {
        path:'/blog/detail/:blogId',
        name: 'blogDetail',
        component:blogsDetail,
        meta:{},
    },
    {
        path:'/blog/new',
        name: 'addNewBlog',
        component:addBlog,
        meta:{},
    },
    {
        path:'/blog/update/:blogId',
        name: 'updateNewBlog',
        component:addBlog,
        meta:{},
    },
]
export default routes;