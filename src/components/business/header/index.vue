<template>
    <div class="header-wrapper">
        <div class="header-left" @click='goIndex'>
            <img class="logo" :src="imgs.logo" alt="">
        </div>
        <div class="header-right">
            <ul class="nav">
                <li class="nav-item one-line" v-for="item in navList" :key="item.key" @click="goTo(item.path)">{{item.title}}</li>
                <li class="nav-item one-line user-info" :key="'user'">
                    <div class="user-avatar">
                        <img :src="imgs.defaultAvatar" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import logo from '@/assets/images/logo.png'
import defaultAvatar from '@/assets/images/default_avatar.jpg'
export default {
    data() {
        return {
            imgs:{
                logo,
                defaultAvatar,
            },
            scrollTop:0, //是否挂在首页
            navList:[
                {
                    title:'学习笔记',
                    key:'blog',
                    path:'/blog/list',
                },
                {
                    title:'插件展示库',
                    key:'plugins',
                    path:'/plugins/index',
                },
                // {
                //     title:'照片集',
                //     key:'photos',
                //     path:'/photos',
                // },
                // {
                //     title:'吐槽说',
                //     key:'tuCao',
                //     path:'/tucao',
                // },
            ]
        }
    },
    methods:{
        goTo(path){
            this.$router.push({path});
        },
        goIndex(){
            this.$router.push({name:'home'});
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../../styles/mixin";
.header-wrapper {
    width: 100%;
    height: 76px;
    padding: 8px 1vw;
    color:$text-color;

   @include fbc;

    background: #ffffff;
    box-shadow: $box-shadow-base;

    .header-left{
        width: 60px;
        height: 60px;
        .logo{
            width: 100%;
            height: 100%;
        }
    }
    .header-right{
        margin-right: 20px;
        height: 60px;
        .nav{
            height: 100%;

            @include fac;
            .nav-item{
                padding: 0 20px;
                height: 100%;
                line-height: 60px;
                text-align: center;

                cursor: pointer;
            }
            .nav-item:hover{
                color: $link-color;
            }
            .user-info{
                width:40px;
                @include fac;
                .user-avatar{
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    box-sizing: content-box;
                    img{
                        width: 32px;
                        height: 32px;
                        border-radius: 50%;
                        display: block;
                    }
                }
                .user-avatar:hover{
                    border: 2px solid #f01414;
                }
            }
        }
    }
}
.header-fixed{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
}
</style>

