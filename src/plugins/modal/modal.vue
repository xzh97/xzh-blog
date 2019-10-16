<template>
    <transition name="fade">
        <div v-body v-if="value" class="modal-wrapper">
            <div v-if="showMask" class="modal-mask" @click="maskClose && close"></div>
            <div class="modal-content">
                <div class="modal-content-title">
                    <div>{{title}}</div>
                </div>
                <div class="modal-content-detail">
                    <slot></slot>
                </div>
                <div class="modal-content-footer" v-if="hasFooter">
                    <slot name="footer">
                        <button class="btn">{{ cancelText }}</button>
                        <button>{{ okText }}</button>
                    </slot>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
/**
 * @desc 写了一下发现好像没啥必要。 毕竟没有那么多地方用到这个
 * */
export default {
    name:'modal',
    data(){
        return {
            value: false, //控制开启关闭
            maskClose:true, //点击遮罩关闭
            showMask: true, //是否显示遮罩
            title: '标题', //标题
            hasFooter: true, //是否显示底部按钮
            okText: '确定', //确认按钮
            cancelText: '取消', //取消按钮
        }
    },
    methods:{
        close(){
            this.value = false;
        }
    }
}
</script>
<style scoped lang="scss">

</style>
