<template>
    <i v-on="$listeners" :class="'icon iconfont ' + iconClass"></i>
</template>

<script>
export default {
    name:'icon',
    props:{
        type: String,
        fill: {
            type: Boolean,
            default: false,
        },
    },
    computed:{
        iconClass(){
            const {type, fill} = this;
            return `icon-${type}${fill ? '-fill' : ''}`
        }
    },
    methods:{
        handleClick(){
            this.$emit('click');
        }
    }
}
</script>

<style>

</style>