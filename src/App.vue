<template>
    <div id="app">
      <header-comp></header-comp>
      <content-comp></content-comp>
      <!-- <footer-comp></footer-comp> -->
    </div>
</template>

<script>
import HeaderComp from "./components/business/header/index";
import FooterComp from './components/business/footer/index';
import ContentComp from './components/business/content/index';
export default {
    name: "app",
    components: {
        HeaderComp,
        FooterComp,
        ContentComp
    },
};
</script>

<style lang='scss'>
@import './styles/common.scss';
#app {
    width: 100%;
}
</style>
