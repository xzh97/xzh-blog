/**
 * long description for the file
 *
 * @summary baseAPI
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-04-23 15:48:22 
 * Last modified  : 2019-04-23 15:48:54
 */

import ajax from '@/share/ajax';
export const getToken = (data) => {
    return ajax({
        url:`/api/token`,
        method: 'POST',
        data,
    })
}

export const register = (data) => {
    return ajax({
        url:`/api/register`,
        method: 'POST',
        data,
    })
}

export default {
    getToken,
    register
}