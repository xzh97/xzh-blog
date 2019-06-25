/**
 * long description for the file
 *
 * @description blog api
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-04-23 15:48:22
 * Last modified  : 2019-06-25 22:54:05
 */
import config from '../config/index';
import ajax from '../share/ajax';
//获取文章列表
export const getBlogList = (page,size) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/list?page=${page}&&size=${size}`,
        method:'GET'
    });
}

//新建文章
export const createNewBlog = (data) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/create`,
        method:'POST',
        data
    });
}

//获取文章详情
export const getBlogDetail = (blogOID) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/detail/${blogOID}`,
        method:'GET',
    });
}

//更新文章
export const updateBlog = (data) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/update`,
        method:'PUT',
        data
    });
}

//删除文章
export const deleteBlog = (blogOID) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/delete/${blogOID}`,
        method:'DELETE',
    });
}


//获取文章分类列表
export const getCategories = () => {
    return ajax({
        url:`${config.apiUrl}/api/blog/category/list`,
        method:'GET'
    });
}

//获取分类详情
export const getCategoryDetail = (categoryOID) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/category/detail/${categoryOID}`,
        method:'GET'
    });
}

//新建文章分类
export const createCategory = (data) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/category/create`,
        method:'POST',
        data
    });
}

//更新文章分类
export const updateCategory = (data) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/category/update`,
        method:'PUT',
        data
    });
}

//更新文章分类
export const deleteCategory = (categoryOID) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/category/delete/${categoryOID}`,
        method:'DELETE',
    });
}



