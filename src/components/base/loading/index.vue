<template>
    <div class="loading-wrapper">
        <Icon :type="'loading'"></Icon>
    </div>
</template>

<script>
import Icon from '@/components/base/icon/index';
export default {
    name:'loading',
    components:{
        Icon,
    }
}
</script>

<style lang='scss' scoped>
.loading-wrapper{
    width: 100%;
    height: 100%;
    background: #ffffff;
}
</style>
