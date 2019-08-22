<template>
    <div>
        <div v-body :class="['popover-wrapper',placementClass]" v-if="value" :style="activeStyle">
            <div class="popover-inner" >
                <div class="arrow"></div>
                <div v-if="title" class="popover-title">{{ title }}</div>
                <slot>
                    <div class="popover-content">{{ content }}</div>
                </slot>
            </div>      
        </div>
        <slot name='element'></slot>
    </div>
</template>

<script>
import {getTriggerDom} from './index.js';
export default {
    name:'popover',
    props:{
        visible:{
            type:Boolean
        }, 
        placement:{
            type:String,
            default:'top-left'
        },
        title:{
            type:String,
            default:''
        },
        content:{
            type:String,
            default:''
        },
    },
    data(){
        return {
            value:false,
        }
    },
    computed:{
        placementClass(){
            let {placement} = this;
            return `popover-placement-${placement}`;
        },
        activeStyle(){
            return {
                left:'',
                top:'',
            }
        }
    },
    created(){
        this.value = this.visible
    },
    mounted(){
        this.$nextTick(() => {
            getTriggerDom(this)
        })
    },
    watch:{
        visible(val){
            console.log(val);
            this.value = val;
            this.$emit('visibleChange',this.value)
        }
    }
}
</script>

<style lang='scss' scoped>
.popover-wrapper{
    font-size: $font-size-base;
    color:$text-color;
    position:absolute;
    top: 0;
    left: 0;
    z-index: 1030;
    margin: 0;
    padding: 0;
    border-radius: $border-radius-base;
    background: #ffffff;
    box-shadow: $box-shadow-base;
    .popover-inner{
        font-size: 16px;
        line-height: 20px;
        color: $title-color;

        .popover-title{
            box-sizing: border-box; 
            border-bottom: 1px solid $border-color-base;
            padding-bottom: 6px;
            vertical-align: middle;
        }
        .popover-content{
            padding: 10px 8px;
            font-size: 14px;
        }
    }   
}
</style>