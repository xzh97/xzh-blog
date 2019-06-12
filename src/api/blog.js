/**
 * long description for the file
 *
 * @description blog api
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-04-23 15:48:22
 * Last modified  : 2019-06-06 22:50:50
 */
import config from '../config/index';
import ajax from '../share/ajax';
//获取博客列表
export const getBlogList = () => {
    return ajax({
        url:`${config.apiUrl}/api/blog/list`,
        method:'GET'
    });
}

export const createNewBlog = (data) => {
    return ajax({
        url:`${config.apiUrl}/api/blog/create`,
        method:'POST',
        data
    });
}

