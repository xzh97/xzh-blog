export default (app) => {
    app.directive('body', {
        inserted:function(el){
            document.body.appendChild(el);
        },
        unbind:function(el){
            el.parentNode === document.body && document.body.removeChild(el)
        }
    })
}

