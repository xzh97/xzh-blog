<template>
    <transition name="fade">
        <div v-if="isShow" class="image-viewer-wrapper" @click="hideImageViewer">
            <div class="image-viewer-inner">
                <img ref="img" :style="imgStyle" class="img-center" :src="imgSrc" alt="">
            </div>
        </div>
    </transition>
</template>

<script>
import errorImg from '@/assets/images/404.png';
export default {
    name:'image-viewer',
    data(){
        return {
            isShow:false,
            imgSrc:errorImg,
            width:0,
            height:0,
        }
    },
    computed:{
        imgStyle(){
            let {width, height} = this;
            if(width >= height){
                return {
                    height:height + 'px'
                }
            }
            else{
                return {
                    width:width + 'px',
                }
            }
        }
    },
    methods:{
        hideImageViewer(){
            this.isShow = false;
            //todo 会有滚动条跳动问题  body的宽度会变化
            console.dir(document.body);
            document.body.style.overflow = 'auto';
        }
    }
}
</script>

<style lang='scss' scoped>
    .image-viewer-wrapper{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.45);
        z-index: 8;
        cursor: zoom-out;
        .image-viewer-inner{
            padding: 20px;
            .img-center{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);

                //cursor: zoom-out;
            }
        }
    }
</style>
