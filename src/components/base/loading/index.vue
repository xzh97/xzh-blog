<template>
    <div class="loading-wrapper" v-body v-if="currentValue">
        <div class="mask"></div>
        <div class="loading-inner">
            <div class="dot blue"></div>
            <div class="dot green"></div>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'loading',
    props:{
        value: Boolean,
    },
    data(){
        return {
            currentValue: false,
        }
    },
    methods:{
        switchScrollingEffect(){
            let body = document.querySelector('body');
            if(this.currentValue){
                body.style = `position: relative; width: calc(100% - 17px); overflow: hidden;`
            }
            else{
                body.style = 'position: relative;';
            }
        },
    },
    watch:{
        value(val){
            val !== this.currentValue && (this.currentValue = val)
        },
        currentValue(val){
            this.switchScrollingEffect();
            this.$emit('input',val);
        }
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';
.loading-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    outline: 0;
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        background: rgba(255,255,255,.45);
        z-index: 999;
    }
    .loading-inner{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        // width: 100px;
        // height: 40px;
        .dot{
            display: inline-block;
            margin: 2px 6px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            vertical-align: middle;
            position: relative;
        }
        .blue{
            background-color: #00f;
            animation: blue-xAnimate 2s cubic-bezier(0.36,0,0.64,1) -2s infinite, blue-yAnimate 2s cubic-bezier(0.36,0,0.64,1) 0s infinite;
        }
        .green{
            background-color: #0f0;
            animation: green-xAnimate 2s cubic-bezier(0.36,0,0.64,1) -2s infinite, green-yAnimate 2s cubic-bezier(0.36,0,0.64,1) 0s infinite;
        }
    }
}
@keyframes blue-xAnimate {
    0% {
        left: 0;
    }
    13% {
        left: 14px;
    }
    25% {
        left: 28px;
    }
    38% {
        left: 42px;
    }
    50% {
        left: 56px;
    }
    63%{
        left: 42px;
    }
    75% {
        left: 28px;
    }
    88%{
        left: 14px
    }
    100% {
        left: 0;
    }
}

@keyframes blue-yAnimate {
    0% {
        top: 0;
    }
    13% {
        top: -14px;
    }
    25% {
        top: 0;
    }
    38% {
        top: 14px;
    }
    50% {
        top: 0;
    }
    63%{
        top: -14px;
    }
    75% {
        top: 0;
    }
    88%{
        top: 14px;
    }
    100% {
        top: 0;
    }
}

@keyframes green-xAnimate {
    0% {
        left: 0;
    }
    13% {
        left: -14px;
    }
    25% {
        left: -28px;
    }
    38% {
        left: -14px;
    }
    50% {
        left: 0;
    }
    63%{
        left: 14px
    }
    75% {
        left: 28px;
    }
    88%{
        left: 14px
    }
    100% {
        left: 0;
    }
}

@keyframes green-yAnimate {
    0% {
        top: 0;
    }
    13% {
        top: 14px;
    }
    25% {
        top: 0;
    }
    38% {
        top: -14px;
    }
    50% {
        top: 0;
    }
    63%{
        top: 14px
    }
    75% {
        top: 0;
    }
    88%{
        top: -14px
    }
    100% {
        top: 0;
    }
}

</style>
