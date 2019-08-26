<template>
    <div id="app">
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
    opacity: 0.1;
    background-image: url("assets/images/bg3.jpg");
}
/* 富文本内容展示 的基本样式 */
.quill-editor-content p {
    font-size: $font-size-base;
    line-height: 1.7;
    margin-bottom: 8px;
}
</style>
