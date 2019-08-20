<template>
    <div class="pagination-wrapper" :class="alignClass">
        <div @click="handleClick('prev')" class="prev"><icon :type='prevIcon'></icon></div>
        <div @click="handleClick('list')" class="list"><icon :type='listIcon'></icon></div>
        <div @click="handleClick('next')" class="next"><icon :type='nextIcon'></icon></div>
    </div>
</template>

<script>
//todo 把分页组件写完
import icon from "@/components/base/icon/index";
export default {
    name:'pagination-v2',
    props:{
        prevIcon:{
            type: String,
            default: 'left'
        },
        nextIcon:{
            type: String,
            default: 'right'
        },
        listIcon:{
            type: String,
            default: 'menu'
        },
        align:{
            type: String,
            default: 'center'
        },
        hasNextPage:{
            type: Boolean,
            default: false,
        },
        hasPrevPage:{
            type: Boolean,
            default: false,
        },
    },
    computed:{
        alignClass(){
            let { align } = this;
            return align === 'left' ?　'align-left' :　align === 'right' ? 'align-right' : 'align-center'
        }
    },
    methods:{
        handleClick(type){
            this.$emit('on-page-change',{type});
        }
    },
    components:{
        icon,
    }
}
</script>

<style lang='scss' scoped>
    @import "@/styles/mixin.scss";
    .pagination-wrapper{
        width: 120px;
        background: #34495e;
        border-radius: $border-radius-base;
        @include fac;
        .prev,.list,.next {
            width: 40px;
            height: 32px;
            line-height: 2;
            background: rgba(0, 0, 0, 0);
            text-align: center;
            
            cursor: pointer;
            .icon{
                color: #ffffff;
                font-size: 16px;
                font-weight: 700;
            }
        }
        .prev{
            border-top-left-radius: $border-radius-base;
            border-bottom-left-radius: $border-radius-base;
        }
        .next{
            border-top-right-radius: $border-radius-base;
            border-bottom-right-radius: $border-radius-base;
        }
        .list{
            border-left: 2px solid #2c3e50;
            border-right: 2px solid #2c3e50;
        }
        .prev:hover,.list:hover,.next:hover{
            background: #3a5168;
            transition: all .2s;
            .icon {
                color: #13b6e7;
                transition: all .2s;
            }
        }
    }
    .align-center{
        margin: 0 auto;
    }
    .align-left{
        margin: 0;
        margin-right: auto;
    }
    .align-right{
        margin: 0;
        margin-left: auto;
    }
</style>