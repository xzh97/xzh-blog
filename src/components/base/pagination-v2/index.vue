<template>
    <div class="pagination-wrapper" :class="alignClass">
        <div 
            slot='reference' 
            @mouseleave="handleMouseLeave('prev')" 
            @mouseenter="handleMouseEnter('prev',$event)" 
            @click="handleClick('prev')" class="prev">
            <icon :type='prevIcon'></icon>
        </div>
        <div 
            @mouseleave="handleMouseLeave('list')" 
            @mouseenter="handleMouseEnter('list')" 
            @click="handleClick('list')" 
            class="list">
            <icon :type='listIcon'></icon>
        </div>
        <div 
            slot='reference' 
            @mouseleave="handleMouseLeave('next')" 
            @mouseenter="handleMouseEnter('next')" 
            @click="handleClick('next')" 
            class="next">
            <icon :type='nextIcon'></icon>
        </div>
        <!-- 没有了 todo想写一个popover的轮子 看似简单 其实还是有非常多的问题存在的 -->
        <div v-if="showPopover" class="no-page-change" :style="activeStyle">
            <div class="arrow"></div>
            <span>没有了</span>    
        </div>
        
    </div>
</template>

<script>
//todo 把分页组件写完
import icon from "@/components/base/icon/index";
import popover from "@/components/base/popover/index";
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
    data(){
        return {
            popoverContent:'已经没有啦QAQ',
            showPopover:false,
            showList:false,
            activeStyle: {}
        }
    },
    computed:{
        alignClass(){
            let { align } = this;
            return align === 'left' ?　'align-left' :　align === 'right' ? 'align-right' : 'align-center'
        },
    },
    mounted(){
        let prevRect = document.querySelector('.prev').getBoundingClientRect();
        console.log(prevRect);
    },
    methods:{
        handleClick(type){
            this.$emit('on-page-change',{type});
        },
        handleMouseEnter(type,e){
            console.log(e);
            let arr = ['prev','next'];
            let {hasNextPage, hasPrevPage} = this;
            switch(type){
                case 'prev':
                    if(hasPrevPage) break;
                    else {
                        this.showPopover = true;
                        this.activeStyle = {
                            left: '1200px',
                            top: '545px',
                        }
                    }
                break;
                case 'next':
                    if(hasNextPage) break;
                    else {
                        this.showPopover = true;
                        this.activeStyle = {
                            left: '1290px',
                            top: '545px',
                        }
                    }
                break;
                case 'list':
                    this.showList = true;
                break;
            }
        },
        handleMouseLeave(type){
            switch(type){
                case 'prev':
                case 'next':
                    this.showPopover = false;
                break;
                case 'list':
                    this.showList = false;
                break;
            }
        }
    },
    components:{
        icon,
        popover
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
        .no-page-change{
            width: 60px;
            height: 20px;
            line-height: 20px;
            position: absolute;
            top: 0;
            left: 0;
            box-shadow: $box-shadow-base;
            border-radius: $border-radius-base;
            background: #ffffff;
            padding: 0;
            font-size: 15px;
            text-indent: 6px;
            .arrow{
                border-top:6px solid #ffffff;
                border-right:6px solid  rgba(0,0,0,0);
                border-left:6px solid  rgba(0,0,0,0);
                width: 0;
                height: 0;
                position: absolute;
                top: 20px;
                left: 10px;
                box-shadow: $box-shadow-base;
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