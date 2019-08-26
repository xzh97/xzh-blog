<template>
    <div class="demo-wrapper">
        <h3>这个页面就是专门用来做demo的</h3>
        <div class="demo-list">
            <div class="demo-item">
                <!-- <component :is="demo.component" :placement=>
                    <xzh-button slot="element" type='primary'>hover me</xzh-button>   
                </component>-->
                <popover placement="top" content="this is popover content" :visible="value">
                    <xzh-button
                        class="buttons"
                        type="primary"
                        @click="toggleValue"
                        @mouseover="console.log('lalala')"
                    >hover me</xzh-button>
                </popover>
            </div>
        </div>
    </div>
</template>

<script>
import popover from "@/components/base/popover/index";
import xzhButton from "@/components/base/button/index";
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
            value: false
        };
    },
    methods: {
        toggleValue() {
            this.value = !this.value;
        }
    },
    components: {
        popover,
        xzhButton
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
            height: 300px;
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
