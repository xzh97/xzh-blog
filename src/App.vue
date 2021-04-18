
<template>
    <div id="app" :class="appClass">
        <router-view class="router-view" v-slot="{ Component }">
            <component :is="Component" />
        </router-view>
        <canvas id="live2d" width="280" height="250"></canvas>
        <loading v-model="isShowLoading"></loading>
    </div>
</template>

<script>
import FooterComp from "@/components/business/footer/index";
import loading from '@/components/base/loading/index';

import {onMounted, computed, ref, reactive} from 'vue'
import {useStore} from 'vuex';
export default {
    name: "app",
    components: {
        FooterComp,
        loading
    },
    setup(props) {
        const loadLive2d = () =>{
            loadlive2d("live2d", 'static/live2d/kesshouban/model.json');
        }
        const state = reactive({
            randomNumber: Math.floor(Math.random() * 5 + 1),

        })
        const store = useStore()
        const appClass = computed(() => {
            let {randomNumber, isLogin} = this;
            let result = {};
            result[`bg${randomNumber}`] = isLogin
            return result
        })

        const isLogin = computed(() => {
            return store.getters.isLogin
        })

        const isShowLoading = computed(() => {
            return store.getters.isShowLoading
        })

        onMounted(loadLive2d)
        return {
            ...state,
            appClass,
            isLogin,
            isShowLoading,
        }
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
