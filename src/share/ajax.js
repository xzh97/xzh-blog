/**
 * @description 封装ajax。
 * @author xzh
 *
 * @param url 请求地址
 * @param method 请求方法
 * @param async 异步或同步
 * @param params url参数
 * @param data request body参数
 * @param headers request headers参数
 * */
import config from '@/config/index';
export default function ajax({url, method='GET', async=true, params, data, headers }){
    let xhr;
    return new Promise((resolve,reject) => {
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }else{// IE 56
            console.log('求你升级下版本好不好');
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        let reqUrl = GetReqUrl(url,params,method);

        data = method === 'GET' ? null : data;

        xhr.open(method,`${config.apiUrl}${reqUrl}`,async);

        /* setRequestHeader 必须在open之后 send之前*/
        xhr.setRequestHeader('Access-Control-Allow-Origin',`${config.apiUrl}`);

        if(headers){
            for(let key in headers) xhr.setRequestHeader(key,headers[key]);
        }

        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304){
                    let result = JSON.parse(xhr.responseText);
                    resolve(result)
                }
                else{
                    reject({
                        errMsg:'请求失败'
                    })
                }
            }
        }
    })
}

/**
 * @param {String} url 请求url
 * @param {Object} obj 参数对象
 * @param {String} method 请求方法
 * @desc 判断url
 * @return String 处理好的字符串
 * */
const GetReqUrl = (url,obj = {},method = 'GET') => {
    if (method !== 'GET') return url;
    //url是否带有参数
    let str = url.indexOf('?') > -1 ? '' : '?';
    let arr = [];

    for(let key in obj){
        let item = `${key}=${obj[key]}`;
        arr.push(item);
    }
    //有参数才加'?' 没有不加
    str = arr.length ? str : '';
    return url + str + arr.join('&');
};
