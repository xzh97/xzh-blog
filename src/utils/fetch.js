
import axios from 'axios';
import config from '@/config/index';
import store from '@/vuex/index';
// import Vue from 'vue';
const instance = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
})

instance.interceptors.request.use(config => {
    console.log('log fetch 请求配置',config)
    return config
})

instance.interceptors.response.use(res => {
    if(res.status >= 200 && res.status < 300 || res.status === 304){
        return res.data
    }
    else{
        // 接口请求报错了
        return res.response
    }
})

const fetch = (options) => {
    return new Promise((resolve, reject) => {
        let token;
        if(store.getters.getUserToken){
            console.log(store.getters.getUserToken);
            token = store.getters.getUserToken.token
        }
        if(!options.headers){
            options.headers = {
                Authorization: 'Bearer ' + token,
            }
        }
    
        if(options.url.indexOf('api/token') === -1 && options.url.indexOf('api/register') === -1 ){
            options.headers['Authorization'] = 'Bearer ' + token;
        }
    
        instance(options).then(res => {
            resolve(res);
        }).catch(err => {
            // console.log(err.response);
            // Vue.prototype.handleError(err.response);
            reject(err.response);
        })
    })
}
export default fetch;