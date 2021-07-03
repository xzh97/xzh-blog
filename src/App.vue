
<template>
    <div id="view-container">
        <custom-header></custom-header>
        <div class="view-wrapper">
            <router-view class="router-view" v-slot="{ Component }">
                <component :is="Component">
                    
                </component>
            </router-view>
        </div>
        <canvas id="live2d" width="280" height="250"></canvas>
    </div>
</template>

<script>
import customHeader from '@/components/business/custom-header';
import FooterComp from "@/components/business/footer/index";

import {onMounted, computed, ref, reactive} from 'vue'
import {useStore} from 'vuex';
export default {
    name: "app",
    components: {
        FooterComp,
        customHeader
    },
    setup(props) {
        const store = useStore()
        const loadLive2d = () =>{
            loadlive2d("live2d", 'static/live2d/kesshouban/model.json');
        }

        const isLogin = computed(() => {
            return store.getters.isLogin
        })

        // onMounted(loadLive2d)
        return {
            isLogin,
        }
    }
};
</script>

<style lang='scss'>
@import "styles/media.scss";
#app {
    overflow-x: inherit;
    .view-wrapper{
        width: 100%;
        position: relative;
        margin: 0 auto;
        max-width: 960px;
    }
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
#live2d{
    position: fixed;
    right: 0;
    bottom: 0;
}

</style>
