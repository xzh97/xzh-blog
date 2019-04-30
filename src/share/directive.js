export default (Vue) => {
    Vue.directive('body', {
        inserted:function(el){
            document.body.appendChild(el);
        },
        unbind:function(el){
            el.parentNode === document.body && document.body.removeChild(el)
        }
    })
}

