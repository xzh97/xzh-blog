import ajax from '@/share/ajax'
export const getToken = (params) => {
    return new Promise((resolve, reject) => {
        resolve({
            access_token: '####-####-####-####',
            refresh_token: '####-####-####-####',
        })
    });

    /*return ajax({
        url:`/api/login`,
        method:'POST',
        data
    })*/
}

export default {
    getToken,
}