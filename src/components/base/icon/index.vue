<template>
    <i :class="'icon iconfont ' + iconClass"></i>
</template>

<script>
export default {
    name:'icon',
    props:{
        type: String,
    },
    computed:{
        iconClass(){
            return `icon-${this.type}`
        }
    }
}
</script>

<style>

</style>