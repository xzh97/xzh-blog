<template>
    <div id="app">
        <!-- <header-comp></header-comp> -->
        <router-view></router-view>
        <!-- <footer-comp></footer-comp> -->
    </div>
</template>

<script>
import HeaderComp from "./components/business/header/index";
import FooterComp from './components/business/footer/index';
export default {
    name: "app",
    components: {
        HeaderComp,
        FooterComp,
    },
};
</script>

<style lang='css'>
#app {
    width: 100%;
}
/* 富文本内容展示 的基本样式 */
.quill-editor-content p{
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 8px;
}
</style>
