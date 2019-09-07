import imageViewer from './image-viewer';
let $vm;

const imgViewer = {
    install(Vue,options){
        const imageViewerComp = Vue.extend(imageViewer);
        if(!$vm){
            $vm = new imageViewerComp({
                el:document.createElement('div')
            });
            document.body.appendChild($vm.$el);
        }
        $vm.isShow = false;

        Vue.prototype.$imgViewer = options => {
            if(!options) return
    
            let {imgSrc, width, height} = options;
            $vm.isShow = true;
            $vm.imgSrc = imgSrc;
            $vm.width = width;
            $vm.height = height;
            
        }
    }
}
export default imgViewer;