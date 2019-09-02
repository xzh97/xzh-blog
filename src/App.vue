<template>
    <div id="app" >
        <!-- :class="'bg'+randomNumber" -->
        <!-- <header-comp></header-comp> -->
        <router-view></router-view>
        <footer-comp></footer-comp>
    </div>
</template>

<script>
import HeaderComp from "./components/business/header/index";
import FooterComp from "./components/business/footer/index";
export default {
    name: "app",
    computed: {
        randomNumber() {
            return Math.floor(Math.random() * 5 + 1)
        }
    },
    components: {
        HeaderComp,
        FooterComp
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
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.3;
}
.bg1{
    background: url('./assets/images/bg1.jpg');
}
.bg2{
    background: url('./assets/images/bg2.jpg');
}
.bg3{
    background: url('./assets/images/bg3.jpg');
}
.bg4{
    background: url('./assets/images/bg4.jpg');
}
.bg5{
    background: url('./assets/images/bg5.jpg'); 
}
/* 富文本内容展示 的基本样式 */
.quill-editor-content p {
    font-size: $font-size-base;
    line-height: 1.7;
    margin-bottom: 8px;
    text-indent: 2em;
}
</style>
