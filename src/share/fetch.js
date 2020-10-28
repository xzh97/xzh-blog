
import axios from 'axios';
import config from '@/config/index';
import store from '@/vuex/index';
import Vue from 'vue';
const instance = axios.create({
    baseURL: config.apiUrl,
    timeout: 10000,
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
            console.log(err.response);
            Vue.prototype.handleError(err.response);
        })
    })
}
export default fetch;