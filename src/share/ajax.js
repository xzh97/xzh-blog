/**
 * @description 封装ajax。
 * @author xzh
 * 
 * @param url 请求地址
 * @param method 请求方法
 * @param async 异步或同步
 * @param params url参数
 * @param data request body参数
 * @param header request header参数
 * */

export default function ajax({url, method='GET', async=true, params,data,header }){
    let xhr;
    return new Promise((resolve,reject) => {
        if(window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        }else{// IE 56
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        let symbol = '', reqParam = '';
        if(params){
            symbol = url.indexOf('?') > -1 ? '&&' : '?'; //url参数
            for (let key in params){
                reqParam+=`${key}=${params[key]}`
            }
        }
        let reqUrl = method === 'GET' ? `${url}${symbol}${reqParam}` : url;
        data === method === 'GET' ?　null : data;
    
        xhr.open(method,reqUrl,async);
        if(header){
            for(let key in header) xhr.setRequestHeader(key,header[key]);
        }
    
        xhr.send(JSON.stringify(data));
    
        xhr.onreadystatechange = () => {
            if(xhr.readyState == '4'){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
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