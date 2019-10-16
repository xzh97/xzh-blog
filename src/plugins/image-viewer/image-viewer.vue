<template>
    <transition name="fade">
        <div v-if="isShow" class="image-viewer-wrapper" @click="hideImageViewer">
            <div class="image-viewer-inner">
                <img ref="img"  class="img-center" :src="imgSrc" alt="">
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
            clientWidth:document.documentElement.clientWidth || document.body.clientWidth, //浏览器宽度边界值
            clientHeight:document.documentElement.clientHeight || document.body.clientHeight, //浏览器高度边界值
        }
    },
    computed:{
        imgStyle(){
            let {width, height, clientHeight, clientWidth} = this;
            if(width >= height){
                if(height > clientHeight){
                    return {
                        height:clientHeight + 'px'
                    }
                }
                else{
                    return {
                        height:height + 'px'
                    }
                }

            }
            else{
                if(width > clientWidth){
                    return {
                        width:clientWidth + 'px',
                    }
                }
                else{
                    return {
                        width:width + 'px',
                    }
                }
            }
        }
    },
    methods:{
        hideImageViewer(){
            this.isShow = false;
            //todo windows 会有滚动条跳动问题  body的宽度会变化  暂时不解决了
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
        overflow: auto;
        .image-viewer-inner{
            padding: 20px;
            width: 520px;
            height: auto;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            background: #ffffff;
            .img-center{
                width: 100%;
            }
        }
    }
</style>
