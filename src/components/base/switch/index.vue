<template>
    <div class="switch-wrapper">
        <button class="switch-box" :style="checkedStyle" :class="{'switch-checked':checkedValue}">
            <div class="switch-dot" @click="toggleValue"></div>
        </button>
    </div>
</template>

<script>
/**
 * @summary props Params
 * @activeBg 选中时的背景颜色
 * @inactiveBg 未选中时的背景颜色
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-05-20 21:19:57 
 * Last modified  : 2019-05-20 23:19:08
 */
export default {
    name: "xzh-switch",
    props: {
        activeBg: {
            type: String,
            default: "#1890ff"
        },
        inactiveBg: {
            type: String,
            default: "rgba(0,0,0,0.25)"
        },
        value: {
            type: Boolean,
        }
    },
    data() {
        return {
            checkedValue: false,
        }
    },
    computed:{
        checkedStyle(){
            let { checkedValue, activeBg, inactiveBg} = this;
            return checkedValue ? { 'background-color': activeBg } :　{ 'background-color': inactiveBg };
        }
    },
    methods:{
        toggleValue(){
            this.checkedValue = !this.checkedValue;
        }
    },
    watch:{
        checkedValue(val){
            this.$emit('input',val);
        }
    }
};
</script>

<style lang='scss' scoped>
@import "../../../styles/animate.css";
.switch-wrapper {
    .switch-box {
        min-width: 44px;
        height: 22px;
        border: 1px solid transparent;
        border-radius: 100px;

        position: relative;
        outline: none;
        .switch-dot {
            position: absolute;
            top: 1px;
            left: 1px;
            width: 18px;
            height: 18px;
            background-color: #fff;
            border-radius: 18px;
            transition: left .36s;
            cursor: pointer;
        }
    }
    .switch-checked{
        .switch-dot {
            left: 22px;
            transition: left .36s;
        }
    }
}
</style>
