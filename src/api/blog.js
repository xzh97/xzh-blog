/**
 * long description for the file
 *
 * @description blog api
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-04-23 15:48:22
 * Last modified  : 2019-06-13 22:29:33
 */
import config from '../config/index';
import ajax from '../share/ajax';
//获取博客列表
export const getBlogList = (page,size) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/list?page=${page}&&size=${size}`,
        method:'GET'
    });
}

//新建博客
export const createNewBlog = (data) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/create`,
        method:'POST',
        data
    });
}

//获取博客详情
export const getBlogDetail = (blogOID) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/detail/${blogOID}`,
        method:'GET',
    });
}
