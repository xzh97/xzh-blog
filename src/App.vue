<template>
    <div id="app">
      <header-comp></header-comp>
      <router-view></router-view>
      <footer-comp></footer-comp>
    </div>
</template>

<script>
import HeaderComp from "./components/base/header/index";
import FooterComp from './components/base/footer/index';
export default {
    name: "app",
    components: {
        HeaderComp,
        FooterComp,
    },
};
</script>

<style lang='scss' scoped>
#app {
    width: 100%;
  
}
</style>
