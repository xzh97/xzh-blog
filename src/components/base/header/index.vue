<template>
    <div class="header-wrapper" :class="{'header-fixed':isFixed }">
        <div class="header-left">
            <img class="logo" :src="imgs.logo" alt="">
        </div>
        <div class="header-right">
            <ul class="nav">
                <li class="nav-item" v-for="item in navList" :key="item.key" @click="goTo(item.path)">{{item.title}}</li>
                <li class="nav-item user-info" :key="'user'">
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
                    path:'/plugins',
                },
                {
                    title:'照片集',
                    key:'photos',
                    path:'/photos',
                },
                {
                    title:'吐槽说',
                    key:'tuCao',
                    path:'/tucao',
                },
            ]
        }
    },
    mounted(){
        this.$nextTick( () => {
            window.onscroll = ()=> {
                let bodyScrollTop = 0, documentScrollTop = 0;
            　　if ( document.body ) {
            　　　　bodyScrollTop = document.body.scrollTop;
            　　}
            　　if( document.documentElement ){
            　　　　documentScrollTop = document.documentElement.scrollTop;
            　　}
            　　this.scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            }    
        })
    },
    computed:{
        isFixed(){
            let { scrollTop, $route } = this;
            return scrollTop > 20 || $route.name !== 'home';
        }
    },
    methods:{
        goTo(path){
            this.$router.push({path});
        }
    }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
    width: 100%;
    height: 76px;
    padding: 8px 1vw;
    color:#ffffff;

    display: flex;
    align-items: center;
    justify-content: space-between;

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

            display: flex;
            align-items: center;
            justify-content: space-around;
            .nav-item{
                padding: 0 20px;
                height: 100%;
                line-height: 60px;
                text-align: center;

                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;

                cursor: pointer;
            }
            .nav-item:hover{
                color: #cccccc;
            }
            .user-info{
                width:40px;
                display: flex;
                justify-content: space-around;
                align-items: center;
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

    background: #292b2c !important;
    box-shadow: 0px 2px 2px rgba(255, 255, 255, 0.2);
}
</style>

