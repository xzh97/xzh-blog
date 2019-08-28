<template>
    <button class="xzh-btn oneline"
    :class="[
        type ? 'btn-' + type : '',
        size ? 'btn-size-' + size : '',
        ghost ? 'btn-' + type + '-ghost' : '',
        {
            'btn-loading': loading,
            'btn-disabled': disabled,
            'btn-round': round,
            'btn-circle': circle,
        }
    ]"
    type='button'
    @click.native='handleClick'
    :disabled="disabled || loading "
    >
        <i v-if="loading" class="iconfont icon-loading loading"></i>
        <span><slot></slot></span>
    </button>
</template>

<script>
/**
 *  @summary props说明
 *  @param type 按钮类型
 *  @param size 按钮尺寸
 *  @param loading 是否显示loading
 *  @param disabled 是否禁用
 *  @param ghost 是否开启幽灵按钮
 *  @param round 是否开启圆角
 *  @param circle 是否开启圆形按钮
 */
export default {
    name: 'xzh-button',
    props:{
        type: {
            type: String,
            default: 'default',
        },
        size: {
            type: String,
            default: 'default',
        },
        loading: Boolean,
        disabled: Boolean,
        ghost: Boolean,
        round: Boolean,
        circle: Boolean
    },
    methods:{
        handleClick(ev){
            this.$emit('click',ev);
        }
    }
}
</script>

<style lang='scss' scoped>
$primary-color:#1890ff;
$default-color:rgba(0,0,0,0.65);
$warning-color:#e6a23c;
$danger-color:#f56c6c;
.xzh-btn{
    background: none;
    outline: none;
    border-radius: 4px;
    text-align: center;
    font-weight: 400;
    box-shadow: 0 2px 0 $box-shadow-base;
    box-sizing: border-box;
    margin-right: 10px;
    vertical-align: middle;
}
.xzh-btn:hover{
    cursor: pointer;
    transition: all .36s;
}
.btn-primary,.btn-primary-ghost{
    background: $primary-color;
    border: 1px solid $primary-color;
    color: #ffffff;
    span{
        color: #ffffff;
    }
}
.btn-default,.btn-default-ghost{
    background: #ffffff;
    border: 1px solid #d9d9d9;
    color: rgba(0,0,0,0.65);
    span{
        color: rgba(0,0,0,0.65);
    }
}
.btn-warning,.btn-warning-ghost{
    background: $warning-color;
    border: 1px solid $warning-color;
    color: #ffffff;
    span{
        color: #ffffff;
    }
}
.btn-danger,.btn-danger-ghost{
    background: $danger-color;
    border: 1px solid $danger-color;
    color: #ffffff;
    span{
        color: #ffffff;
    }
}
.btn-primary-ghost{
    color: $primary-color;
    span{
        color: $primary-color;
    }
}
.btn-warning-ghost{
    color: $warning-color;
    span{
        color: $warning-color;
    }
}
.btn-danger-ghost{
    color: $danger-color;
    span{
        color: $danger-color;
    }
}
.btn-primary-ghost,.btn-default-ghost,.btn-warning-ghost,.btn-danger-ghost{
    background-color: transparent;
}
.btn-default:hover{
    border-color: $primary-color;
    color: $primary-color;
    span{
        color: $primary-color;
    }
}
.btn-primary:hover,.btn-danger:hover,.btn-warning:hover{
    opacity: .8; 
}
.btn-size-default{
    padding: 0 16px;
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    span{
        font-size: 14px;
    }
}
.btn-size-large{
    padding: 0 20px;
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    span{
        font-size: 16px;
    }
}
.btn-size-small{
    padding: 0 12px;
    font-size: 12px;
    height: 28px;
    line-height: 28px;
    span{
        font-size: 12px;
    }
}
.btn-disabled{
    color: rgba(0,0,0,0.25);
    background-color: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    box-shadow: none;
    span{
        color: rgba(0,0,0,0.25);
    }
}
.btn-disabled:hover{
    cursor:not-allowed;
    opacity: 1;
}
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.btn-loading{
    opacity: .6;
    .loading{
        display: inline-block; //i的display默认为inline,旋转不起来
        color:#fff;
        margin-right: 6px;
        animation: spin 1s linear infinite;
    }
    
}
.btn-loading:hover{
    cursor:not-allowed;
    opacity: .6;
}
</style>
