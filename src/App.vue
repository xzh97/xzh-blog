<template>
    <!--:class="'bg'+randomNumber"-->
    <div id="app" :class="appClass">
        <router-view />
        <!-- <footer-comp /> -->
        <canvas id="live2d" width="280" height="250"></canvas>
        <loading v-model="isShowLoading"></loading>
    </div>
</template>

<script>
import FooterComp from "@/components/business/footer/index";
import loading from '@/components/base/loading/index';

import {mapGetters} from 'vuex';
export default {
    name: "app",
    computed: {
        ...mapGetters([
            'isShowLoading',
            'isLogin',
        ]),
        randomNumber() {
            return Math.floor(Math.random() * 5 + 1)
        },
        appClass(){
            let {randomNumber, isLogin} = this;
            let result = {};
            result[`bg${randomNumber}`] = isLogin
            return result
        }
    },
    mounted(){
        loadlive2d("live2d", 'static/live2d/kesshouban/model.json');
    },
    components: {
        FooterComp,
        loading
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
#live2d{
    position: fixed;
    right: 0;
    bottom: 0;
}
</style>
