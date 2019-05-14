<template>
    <div class="plugins-wrapper">
        <section class="plugins-list-box">
            <div class="title-box" @click="toggleList">
                <h3 class="title">组件</h3>
                <i class="iconfont icon-up" :class="{'icon-up-active':!isShowComponents}"></i>
            </div>
            <transition name='fade'>
                <ul class="plugins-list" v-show="isShowComponents">
                    <li class="plugin-item" 
                        :class="{'plugin-item-active':item.isSelected}"
                        :key='item.name'
                        v-for="item in componentsList" 
                        @click="selectComponentHandle(item)">
                        <span>{{item.name}}</span>&nbsp;
                        <span class="chinese">{{item.chineseName}}</span>
                    </li>
                </ul>
            </transition>
        </section>
        <section class="plugin-show-box">

        </section>
    </div>
</template>

<script>
export default {
    name:'plugin-show',
    data(){
        return{
            componentsList:[
                {
                    name:'Message',
                    chineseName:'信息提示',
                    isSelected:false,
                },
                {
                    name:'Avatar',
                    chineseName:'头像',
                    isSelected:false,
                },
                {
                    name:'Button',
                    chineseName:'按钮',
                    isSelected:false,
                },
                {
                    name:'Modal',
                    chineseName:'对话框',
                    isSelected:false,
                },
                {
                    name:'Select',
                    chineseName:'选择',
                    isSelected:false,
                },
            ],
            isShowComponents: true,
        }
    },
    methods:{
        selectComponentHandle(component){
            let { componentsList } = this;
            componentsList.map(item => item.isSelected = item.name === component.name ? true : false)
        },
        toggleList(){
            this.isShowComponents = !this.isShowComponents;
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../styles/mixin';
.plugins-wrapper{
    width: 100%;
    height: 100%;
    @include fac;
    .plugins-list-box{
        width: 20%;
        box-sizing: border-box;
        margin: 20px 0;
        min-height: 500px;
        background: #ffffff;
        box-shadow: $box-shadow-base;
        .title-box{
            @include fac;
            margin: 4px 0;
            padding: 0 40px 0 16px;
            height: 40px;
            .icon-up{
                transform: rotateX(0);
                transition: .3s;
            }
            .icon-up-active{
                color: $link-color;
                transform: rotateX(180deg);
                transition: .3s;
            }
        }
        .title-box:hover{
            cursor: pointer;
            .title,.icon-up{
                color: $link-color;
            }
        }
        .plugin-item{
            height: 40px;
            line-height: 40px;
            padding-left: 80px;
            padding-right: 16px;
            .chinese{
                opacity: .67;
                font-size: 12px;
            }
        }
        .plugin-item:hover{
            span{
                color: $primary-color;
            }
            cursor: pointer;
        }
        .plugin-item-active{
            span{
                color: $primary-color;
            }
            background: #e6f7ff;
            box-sizing: border-box;
            border-right: 2px solid $primary-color;
        }
    }
    .plugin-show-box{
        width: 78%;
        min-height: 500px;
        background: #ccc;
    }
}
</style>
