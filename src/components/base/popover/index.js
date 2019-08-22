import utils from '@/share/utils';
/**
 * @param vm vue实例
 * @description 获取到触发元素 以及气泡元素
 */
export const getDom = (vm) => {
    let popDom = vm.$el; //调用popover组件的dom
    let triDom = vm.$slots.element[0].elm;  //触发元素的dom结构
    console.log('调用popover组件dom',popDom);
    console.log('触发元素的dom结构',triDom);
    return {popDom,triDom};
}
/**
 * @param popoDom popover所在的dom
 * @param dom 触发popover的dom元素
 */
export const separatePopover = (popoDom,dom) => {
    let parent = popoDom.parentNode;
    parent.removeChild(popoDom);
    parent.appendChild(dom);
    document.body.appendChild(popoDom);
    return {}
}

/**
 * @param popDom popover所在的dom
 * @param triDom 触发popover的dom元素
 * @description  计算popover位置
 */
export const computeStyle = (popDom,triDom,flag = true) => {
    let popRect = popDom.getBoundingClientRect();
    let domRect = triDom.getBoundingClientRect();
    console.log('调用popover组件dom',popRect);
    console.log('触发元素的dom结构',domRect);

    let popWrapper = popDom.querySelector('.popover-wrapper');
    console.log('popoverwrapper',popWrapper,popWrapper.offsetWidth, utils.getStyle(popWrapper,'height'));
    popWrapper.style.left = domRect.left + 'px';
    popWrapper.style.top = domRect.top - popRect.height  + 'px';

    //分离popover
    flag && separatePopover(popDom,triDom);
    
}
export default {
    getDom,
    computeStyle
}