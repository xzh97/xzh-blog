<template>
<!-- todo 鼠标放在遮罩上时  滚轮无效-->
  <div class="modal-wrapper" v-body v-if='currentValue'>
      <div class="modal-mask" v-if="mask" @click="handleCancel('mask',$event)"></div>
      <div class="modal-inner" :style='{width: realWidth}'>
            <div class="modal-close-icon" v-if="closable"><i class="iconfont icon-close" @click="handleCancel('icon')"></i></div>
            <div class="modal-title one-line">{{title}}</div>
            <div class="modal-body" :style='bodyStyle'>
                <slot></slot>
            </div>

            <div class="modal-footer" slot='footer'>
                <slot name='footer'>
                    <x-button :type='"default"' @click="handleCancel('button')">{{cancelText}}</x-button>
                    <x-button :type='"primary"' @click="handleOk">{{okText}}</x-button>
                </slot>
            </div>
      </div>
  </div>
</template>

<script>
import xButton from '@/components/base/button/index';
export default {
    name: 'modal',
    props:{
        value: Boolean,
        mask: {
            type: Boolean,
            default: true,
        },
        maskClose: {
            type: Boolean,
            default: true,
        },
        closable:{
            type: Boolean,
            default: true,
        },
        width: {
            type: [Number,String],
            default: 520,
        },
        title: {
            type: String,
            default: '',
        },
        cancelText: {
            type: String,
            default: '取消',
        },
        okText: {
            type: String,
            default: '确定',
        },
        bodyStyle: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            currentValue: false,
        }
    },
    computed:{
        realWidth(){
            let {width} = this;
            return typeof width === 'number' ? width + 'px' : width
        },
        realBodyStyle(){
            let {bodyStyle} = this;
            return Object.assign({},{maxHeight: '500px'}, bodyStyle)
        }
    },
    methods:{
        handleOk(){
            this.$emit('onOk');
        },
        handleCancel(type,ev){
            if(type === 'mask'){
                console.log(ev.target);
                if(!this.maskClose) return;
            }
            this.currentValue = false;
            this.$emit('onCancel');
        },
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
            this.currentValue !== val && (this.currentValue = val);
        },
        currentValue(val){
            this.switchScrollingEffect();
            this.$emit('input', val);
        }
    },
    components:{
        xButton,
    }
}
</script>

<style lang='scss' scoped>
.modal-wrapper{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
    
    .modal-mask{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        //width: calc(100% - 17px);
        height: 100%;
        background: rgba(0,0,0,.45);
        z-index: 999;
    }
    .modal-inner{
        position: relative;
        margin: 0 auto 24px;
        top: 100px;
        background: #fff;
        z-index: 1000;
        box-shadow: $box-shadow-base;
        border-radius: $border-radius-base;
        pointer-events: 'auto';

        .modal-close-icon{
            position: absolute;
            right: 16px;
            top: 16px;
            .icon-close{
                cursor: pointer;
                color: rgba(0,0,0,.45);
                display: inline-block;
                transition: color .5s;
            }
            .icon-close:hover{
                cursor: pointer;
                color: rgba(0,0,0,.85);
                display: inline-block;
                transition: color .5s;
            }
        }
        
        .modal-title{
            font-size: $font-size-base;
            line-height: 22px;
            border-bottom: 1px solid $border-color-base;
            padding: 16px 24px;
        }
        .modal-body{
            padding: 24px;
            font-size: 14px;
            line-height: 1.5715;
            max-height: calc(100% - 108px);
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        .modal-footer {
            border-top: 1px solid $border-color-base;
            text-align: right;
            padding: 10px 16px;
            .xzh-btn + .xzh-btn {
                margin-left: 8px;
            }
        }
    }
}
</style>