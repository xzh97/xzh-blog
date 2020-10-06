<template>
<!-- todo 先看一下先把，看后面写个通用的form组件 -->
    <div class="form-item-wrapper">
        <div class="form-item">
            <slot></slot>
        </div>
    </div>

</template>
<script>
export default {
    name: 'FormItem',
    data(){
        return {
        }
    },
}
</script>
<style lang="scss" scoped>
.form-item-wrapper{
    .form-item {
        width: 100%;
        height: 32px;
        line-height: 32px;
        border-radius: $border-radius-base;
        margin-top: 10px;
        border: 1px solid $border-color-base;
        color:$text-color;
        text-indent: 10px;
    }
}
</style>