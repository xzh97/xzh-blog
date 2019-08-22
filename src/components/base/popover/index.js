/**
 * @param vm vue实例
 */
export const getTriggerDom = (vm) => {
    console.log(vm);
    let targetParent = vm.$el.parentNode;
    let triggerElement = vm.$slots.element[0].elm;
    //console.log(targetParent,triggerElement);
    createTriggerDom(targetParent,triggerElement);
    computeStyle(vm.$el,triggerElement)
}
/**
 * @param target popover所在的dom的父级
 * @param dom 触发popover的dom元素
 */
export const createTriggerDom = (target,dom) => {
    dom && target.appendChild(dom);
}

/**
 * @param target popover所在的dom的父级
 * @param dom 触发popover的dom元素
 */
export const computeStyle = (target,dom) => {
    let targetRect = target.getBoundingClientRect();
    let domRect = dom.getBoundingClientRect();
    console.log(target,targetRect)
    console.log(dom,domRect)
}
export default {
    getTriggerDom,
    computeStyle
}