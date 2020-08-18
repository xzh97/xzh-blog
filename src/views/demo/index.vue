<template>
    <div class="demo-wrapper">
        <h3>这个页面就是专门用来做demo的</h3>
        <div class="demo-list">
            <div class="demo-item">
                <!-- <component :is="demo.component" :placement=>
                    <xzh-button slot="element" type='primary'>hover me</xzh-button>   
                </component>-->
                <x-button
                    class="buttons"
                    type="primary"
                    @click="toggleValue"
                >
                    modal button
                </x-button>
                <x-button
                    class="buttons"
                    type="primary"
                    @click="showLoading"
                    :style='{marginLeft: "8px"}'
                >
                    loading button
                </x-button>

                <modal v-model="visible" :title='"modal标题"'>
                    <div>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                        <p>My favorite singer is SoftLipa</p>
                        <p>My favorite song is the 史诗</p>
                    </div>
                    <div slot='footer'>
                        <x-button :type='"primary"'>footer slot button</x-button>
                    </div>
                </modal>
    
                <loading v-model="loading">

                </loading>
                <!-- <popover placement="top" content="this is popover content" :visible="value">
                    <xzh-button
                        class="buttons"
                        type="primary"
                        @click="toggleValue"
                        @mouseover="console.log('lalala')"
                    >hover me</xzh-button>
                </popover> -->
            </div>
        </div>
    </div>
</template>

<script>
import popover from "@/components/base/popover/index";
import xButton from "@/components/base/button/index";
import modal from "@/components/base/modal/index";
import loading from '@/components/base/loading/index';
export default {
    name: "demo",
    data() {
        return {
            demoList: [
                {
                    component: "popover",
                    props: {
                        placement: "top-left",
                        title: "title",
                        content: "this is popover content",
                        value: true
                    }
                }
            ],
            value: false,
            visible: false,
            loading: false,
        };
    },
    methods: {
        toggleValue() {
            console.log('click');
            this.visible = true;
        },
        showLoading() {
            console.log('click');
            this.loading = true;
            // setTimeout(() => {
            //     this.loading = false;
            // },2000)
        },
        
        mouseoverButton(){
            console.log('mouseOverButton');
        }
    },
    components: {
        popover,
        xButton,
        modal,
        loading
    }
};
</script>

<style lang='scss' scoped>
.demo-wrapper {
    width: 100%;
    height: 100%;
    h3 {
        margin: 30px 0;
    }
    .demo-list {
        width: 100%;
        height: 100%;
        .demo-item {
            height: 1800px;
            border-radius: $border-radius-base;
            border: 1px solid #cccccc;
            box-shadow: $box-shadow-base;
            background: #ffffff;
        }
    }
    .buttons {
        margin: 0 auto;
    }
}
</style>
