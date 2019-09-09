import errorImg from '@/assets/images/404.png';

export const imgMixin = {
    data(){
        return{
            errorImg
        }
    },
    methods:{
        //取不到图片时的处理
        handleImgError($event){
            console.log($event);
            $event.target.src = this.errorImg;
        },
        //点击图片预览
        handleImgClick($event){
            console.log($event);
            let target = $event.target || $event.srcElement;
            if(target.tagName === 'IMG'){
                //todo 会有滚动条跳动问题  body的宽度会变化
                console.log(document.body.getBoundingClientRect());
                console.dir(document.body);
                document.body.style.overflow = 'hidden';
                document.body.style.width = document.body.getBoundingClientRect().width + 'px';
                this.$imgViewer({imgSrc:target.src, width:target.naturalWidth, height:target.naturalHeight})
            }
            else{
                return;
            }
        }
    },
}
