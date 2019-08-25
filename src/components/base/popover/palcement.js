export const init =  (vm) => {
    console.log(vm);
    let {popDom,triDom} = getDom(vm);
    computeStyle(popDom,triDom);
}
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
}

/**
 * @param popDom popover所在的dom
 * @param triDom 触发popover的dom元素
 * @description  计算popover位置
 */
export const computeStyle = (popDom,triDom) => {
    let popRect = popDom.getBoundingClientRect();
    let domRect = triDom.getBoundingClientRect();
    console.log('调用popover组件dom',popRect);
    console.log('触发元素的dom结构',domRect);

    let popWrapper = popDom.querySelector('.popover-wrapper');
    console.log(popWrapper)
    console.dir(popWrapper)
    popWrapper.style.left = domRect.left + 'px';
    popWrapper.style.top = (domRect.top - 50) + 'px';    
}
export default {
    init
}