<template>
    <div id="app">
      <header-comp></header-comp>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderComp from "./components/base/header/index";
export default {
    name: "app",
    components: {
        HeaderComp
    },
    methods:{
        onScrollHandle(){

        }
    }
};
</script>

<style lang='scss' scoped>
#app {
    width: 100vw;
  
}
</style>
