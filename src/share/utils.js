/**
 * @description 日期格式化
 * @param {date} date
 * @param {*} format
 */
export const dateFormat = (date,format = 'yyyy-MM-dd') => {
    if(!date) return '';
    let d = new Date(date);
    if(d.toString() === 'Invalid Date'){
        if(typeof date === 'string'){
            d = new Date(date.replace(/-/g,'/'))
        }
        else{
            console.log(date);
            return '请输入合法日期'
        }
    }
    let year,month,day,hour,min,second;
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();
    hour = d.getHours();
    min = d.getMinutes();
    second = d.getSeconds();

    let newTime = format.replace(/yyyy/g,year).
    replace(/MM/g,addZero(month)).
    replace(/dd/g,addZero(day)).
    replace(/hh/g,addZero(hour)).
    replace(/mm/g,addZero(min)).
    replace(/ss/g,addZero(second))

    return newTime;

    function addZero(num){
        return num < 10 ? `0${num}` : num;
    }
};
/**
 * @param obj 传入对象
 * @param attr 获取属性
 */
export const getStyle = (obj = {},attr) => {
    if(!attr) return;
    return obj.currentStyle ?　obj.currentStyle[attr] :　window.getComputedStyle(obj,null)[attr];
};
/**
 * @param obj 传入对象
 * @param type 事件类型
 * @param fn 绑定方法
 * @param isCapture 是否在捕获阶段执行
 * */
export const addEvent = (obj,type,fn,isCapture = false) => {
    if (obj.addEventListener) {
        obj.addEventListener(type,fn,isCapture);
    }
    else if(obj.attachEvent) {
        obj.attachEvent(`on${type}`, fn);
    }
    else{
        obj[`on${type}`] = fn
    }
};
/**
 * @param obj 传入对象
 * @param type 事件类型
 * @param fn 绑定方法
 * @param isCapture 是否在捕获阶段执行
 * */
export const removeEvent = (obj,type,fn,isCapture = false) => {
    if (obj.removeEventListener) {
        obj.removeEventListener(type,fn,isCapture);
    }
    else {
        obj.dettachEvent(`on${type}`, fn);
    }
};

/**
 * @param {Object} dom
 * @param {String} className
 * @desc classList IE10 才支持 做下兼容
 * */
const addClass = (dom,className) => {
    if(dom.classList){
        dom.classList.add(className)
    }
    else {
        let classArr = dom.className.split(' ');
        dom.className = classArr.push(className).join(' ');
    }
};

/**
 * @param {Object} dom
 * @param {String} className
 * @desc classList IE10 才支持 做下兼容
 * */
const removeClass = (dom,className) => {
    if(dom.classList){
        !dom.classList.contains(className) && console.log(`该元素无此类名${className}!` )
        dom.classList.contains(className) && dom.classList.remove(className);
    }
    else {
        let classArr = dom.className.split(' ');
        let index = classArr.indexOf(className);
        dom.className = index > -1 ? classArr.splice(index,1).join(' ') : classArr.join(' ');
    }
};

export default {
    dateFormat,
    getStyle,
    addEvent,
    removeEvent
};
