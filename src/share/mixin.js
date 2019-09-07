import errorImg from '@/assets/images/404.png';

export const imgMixin = {
    data(){
        return{
            errorImg
        }
    },
    methods:{
        handleImgError($event){
            console.log($event);
            $event.target.src = this.errorImg;
        },
        handleImgClick($event){
            console.log($event);
            let target = $event.target;
            this.$imgViewer({imgSrc:target.src, width:target.naturalWidth, height:target.naturalHeight})
        }
    },
    mounted(){
        this.$nextTick(() => {
            setTimeout(() => {
                let imgs = document.querySelectorAll('img');
                console.log(imgs)
                imgs.forEach(img => {
                    img.addEventListener('click',this.handleImgClick)
                    img.addEventListener('error',this.handleImgError);
                })
            }, 0);
        })
    }
}
