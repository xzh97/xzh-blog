<template>
    <!--:class="'bg'+randomNumber"-->
    <div id="app">
        <router-view></router-view>
        <footer-comp></footer-comp>
        <canvas id="live2d" width="280" height="250"></canvas>
    </div>
</template>

<script>
import FooterComp from "@/components/business/footer/index";
import CanvasNest from 'canvas-nest.js'
export default {
    name: "app",
    computed: {
        randomNumber() {
            return Math.floor(Math.random() * 5 + 1)
        },
        config(){
            return {
                color: '115,150,167',
                count: 99,
                opacity: 0.7,
                zIndex: -1
            }
        }
    },
    methods:{
        createCanvasNest(){
            const el = document.querySelector('body');
            this.cn = new CanvasNest(el,this.config)
        }
    },
    mounted(){
        loadlive2d("live2d", 'static/live2d/kesshouban/model.json');
        this.createCanvasNest();

    },
    beforeDestroy () {
        this.cn.destroy()
    },
    components: {
        FooterComp,
    }
};
</script>

<style lang='scss'>
@import "styles/media.scss";
#app {
    margin: 0 auto;
}
#app::after {
    content: "";
    width: 100vw;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.1;
    background-size: 100%;
}
.bg1::after{
    background: url('./assets/images/bg1.jpg');
}
.bg2::after{
    background: url('./assets/images/bg2.jpg');
}
.bg3::after{
    background: url('./assets/images/bg3.jpg');
}
.bg4::after{
    background: url('./assets/images/bg4.jpg');
}
.bg5::after{
    background: url('./assets/images/bg5.jpg');
}
/* 富文本内容展示 的基本样式 */
.quill-editor-content p {
    font-size: $font-size-base;
    line-height: 1.7;
    margin-bottom: 8px;
    //text-indent: 2em;
    img{
        box-shadow:0 2px 15px 1px rgba(0,0,0,0.03);
        transition: all .36s;
        max-width: 100%;
        border-radius: $border-radius-base;

    }
    img:hover{
        cursor: zoom-in;
        box-shadow: 0 0 5px $primary-color;
        transform: scale(1.03);
        transition: all .36s;
    }
}
#live2d{
    position: fixed;
    right: 0;
    bottom: 0;
}
</style>
