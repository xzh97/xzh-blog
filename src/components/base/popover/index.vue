<template>
    <div class="popover-wrapper">
        <div v-if="value" :class="['popover-inner',placementClass]" :style="activeStyle">
            <div class="arrow"></div>
            <div v-if="title" class="popover-title">{{ title }}</div>
            <slot>{{ content }}</slot>
        </div>
        <slot name="reference"></slot>  
    </div>
</template>

<script>
export default {
    name:'popover',
    props:{
        value:{
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
}
</script>

<style lang='scss' scoped>
.popover-wrapper{
    .popover-inner{
        font-size: $font-size-base;
        color:rgba(0, 0, 0, 0.65);
        position:absolute;
        top: 0;
        left: 0;
        z-index: 1030;
        margin: 0;
        padding: 10px;
        border-radius: $border-radius-base;
        background: #ffffff;
        box-shadow: $box-shadow-base;
    } 
}
</style>