<template>
    <div class="message-wrapper" v-if="isShow">
        <span class="message-text"><i class="iconfont" :class="activeClass"></i>{{ text }}</span>
    </div>
</template>

<script>
export default {
    name:'message',
    data(){
        return {
            isShow:true,
            type: 'success',
            text: '操作成功',
        }
    },
    computed:{
        activeClass(){
            let {type} = this;
            return {
                'icon-check-circle-fill':type === 'success',
                'icon-warning-circle-fill': type === 'warning',
                'icon-close-circle-fill': type === 'error',
            }
        }
    }
}
</script>

<style lang='scss' scoped>
    .message-wrapper{
        max-width: 200px;
        min-height: 20px;
        line-height: 20px;
        padding: 10px 20px;
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translate(-50%);
        z-index: 100;
        background: #fff;
        border-radius: 4px;
        box-shadow:  0 0 6px rgba(127,127,127,.2);
        .message-text{
            font-size: 16px;
            color: #666;
            .iconfont{
                margin-right: 4px;
            }
        }
    }
</style>
