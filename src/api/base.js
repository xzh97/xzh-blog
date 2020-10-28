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
import fetch from '@/share/fetch';
export const getToken = (data) => {
    return fetch({
        url:`/api/token`,
        method: 'POST',
        data,
    })
}

export const register = (data) => {
    return fetch({
        url:`/api/register`,
        method: 'POST',
        data,
    })
}

export default {
    getToken,
    register
}