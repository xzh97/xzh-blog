/**
 * long description for the file
 *
 * @description blog api
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-04-23 15:48:22
 * Last modified  : 2019-04-23 15:48:54
 */
import config from '../config/index';
export const getBlogList = () => {
    return fetch(`${config.apiUrl}/api/blog/list`);
}

