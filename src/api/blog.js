/**
 * long description for the file
 *
 * @description blog api
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-04-23 15:48:22
 * Last modified  : 2019-06-01 15:39:43
 */
import config from '../config/index';
import ajax from '../share/ajax';
export const getBlogList = () => {
    return ajax({
        url:`${config.apiUrl}/api/blog/list`,
        method:'GET'
    });
}

