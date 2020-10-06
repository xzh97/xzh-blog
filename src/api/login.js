import ajax from '@/share/ajax';
export const login = (data) => {
    return ajax({
        url:`api/login`,
        method: 'POST',
        data,
    })
}

export const register = (data) => {
    return ajax({
        url:`api/register`,
        method: 'POST',
        data,
    })
}

export default {
    login,
    register
}