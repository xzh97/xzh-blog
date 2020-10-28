/**
 * long description for the file
 *
 * @description blog api
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-04-23 15:48:22
 * Last modified  : 2019-07-15 22:05:03
 */
import ajax from '../share/ajax';
import fetch from '@/share/fetch';
//获取文章列表
export const getBlogList = (params) => {
    return fetch({
        url:`/api/blog/list`,
        method:'GET',
        params
    });
}

//新建文章
export const createNewBlog = (data) => {
    return fetch({
        url:`/api/blog/create`,
        method:'POST',
        data
    });
}

//获取文章详情
export const getBlogDetail = (blogOid) => {
    return fetch({
        url:`/api/blog/detail/${blogOid}`,
        method:'GET',
    });
}

//更新文章
export const updateBlog = (data) => {
    return fetch({
        url:`/api/blog/update`,
        method:'PUT',
        data
    });
}

//删除文章
export const deleteBlog = (blogOid) => {
    return fetch({
        url:`/api/blog/delete/${blogOid}`,
        method:'DELETE',
    });
}


//获取文章分类列表
export const getCategories = () => {
    return fetch({
        url:`/api/blog/category/list`,
        method:'GET'
    });
}

//获取分类详情
export const getCategoryDetail = (categoryOid) => {
    return fetch({
        url:`/api/blog/category/detail/${categoryOid}`,
        method:'GET'
    });
}

//新建文章分类
export const createCategory = (data) => {
    return fetch({
        url:`/api/blog/category/create`,
        method:'POST',
        data
    });
}

//更新文章分类
export const updateCategory = (data) => {
    return fetch({
        url:`/api/blog/category/update`,
        method:'PUT',
        data
    });
}

//更新文章分类
export const deleteCategory = (categoryOid) => {
    return fetch({
        url:`/api/blog/category/delete/${categoryOid}`,
        method:'DELETE',
    });
}

//添加文章评论
export const addNewComment = (data) => {
    return fetch({
        url:`/api/blog/comment/add`,
        method:'POST',
        data
    });
}





