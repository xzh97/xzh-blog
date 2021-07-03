<template>
    <div class="custom-header-wrapper">
        <div class="custom-header-inner">
            <div class="custom-header-content">
                <div class="logo-wrapper">
                    <img :src="imgs.logoImg" alt="">
                </div>
                <nav class="main-nav-wrapper">
                    <ul class="nav-list">
                        <li :class="['nav-item', {'active': navId === item.id}]" 
                            :key="item.id"
                            v-for="item in navList">
                            {{item.name}}
                        </li>
                    </ul>
                </nav>
                <div class="nav-right">
                    <div class="nav-right-item search-wrapper">
                        <input
                            type="search" 
                            name="indexSearch" 
                            id="search-input" 
                            placeholder="请输入搜索内容"
                            v-model="keywords">
                    </div>
                    <div class="nav-right-item btn-wrapper">
                        <button class="write-btn">写文章</button>
                    </div>
                    <div class="nav-right-item notification-wrapper">
                        <Icon class="notification-icon" type="bell" fill></Icon>
                    </div>
                    <div class="nav-right-item avatar-wrapper">
                        <avatar
                            :avatar-img="avatarImg"
                            :size="'large'"
                        >

                        </avatar>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="view-nav-wrapper">
            <ul class="nav-list">
                <li 
                    :class="['nav-item', {'active': nav.id === activeNav}]"
                    v-for="nav in viewNavList"
                    :key="nav.id"
                    @click="handleClick(nav.id)"
                >
                    {{nav.text}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {reactive} from 'vue'
import logoImg from '@/assets/images/logo.svg'

import Icon from '@/components/base/icon'
import Avatar from "@/components/base/avatar"

export default {
    name: 'customHeader',
    components:{
        Icon,
        Avatar
    },
    setup(){
        const state = reactive({
            imgs:{
                logoImg
            },
            navList:[
                {
                    name: '首页',
                    id: 'index',
                    path: '/index',
                    active: true,
                },
                {
                    name: '沸点',
                    id: 'pins',
                    path: '/pins',
                    active: false,
                },
                {
                    name: '小册',
                    id: 'books',
                    path: '/books',
                    active: false,
                },
                {
                    name: '活动',
                    id: 'events',
                    path: '/events/all',
                    active: false,
                },
            ],
            navId: 'index',
            keywords: "",
            avatarImg: '',
            activeNav: 'recommend',
            viewNavList: [
                {
                    id: 'recommend',
                    text: '推荐',
                },
                {
                    id: 'frontend',
                    text: '前端',
                },
                {
                    id: 'backend',
                    text: '后端',
                },
                {
                    id: 'android',
                    text: 'Android',
                },
                {
                    id: 'ios',
                    text: 'IOS',
                },
                {
                    id: 'ai',
                    text: '推荐',
                },
                {
                    id: 'freebie',
                    text: '开发工具',
                },
                {
                    id: 'career',
                    text: '代码人生',
                },
                {
                    id: 'article',
                    text: '阅读',
                },
            ]
        })

        return {
            ...state
        }
    },
    methods:{
        handleClick(id){
            this.activeNav = id;
            this.$router.push({
                path: `/index/${id}`
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.custom-header-wrapper{
    background: #ffffff;
    border-bottom: 1px solid #f1f1f1;
    width: 100%;
}
.custom-header-inner{
    width: 100%;
    border-bottom: 1px solid #f1f1f1;
}
.custom-header-content{
    @include fbc();
    max-width: 960px;
    margin: 0 auto;
    .logo-wrapper{
        margin-right: 2rem;
    }
    .main-nav-wrapper{
        @include fac();
        height: 100%;
        .nav-list{
            @include fac();
            height: 5rem;
            .nav-item{
                padding: 0 1.5rem;
                cursor: pointer;
                font-size: 1.33rem;
                color: #71777c;
            }
            .nav-item.active,.nav-item:hover{
                color: $primary-color;
            }
        }   
    }
    .nav-right{
        @include fac();
        .nav-right-item{
            padding: 0 1.2rem;
        }
        .search-wrapper{
            border: 1px solid hsla(0,0%,59.2%,.2);
            background-color: rgba(227,231,236,.2);
            padding: .5rem 1.2rem;
            font-size: 1.33rem;
            border-radius: $border-radius-base;
            #search-input{
                color: #71777c;
                background: transparent;
            }
        }
        .search-wrapper.active{
            border-color: $primary-color;
        }
        .write-btn{
            padding: 0 .9rem;
            color: #ffffff;
            background: $primary-color;
            border: 1px solid $primary-color;
            border-radius: $border-radius-base;
            height: 2.667rem;
        }
        .notification-icon{
            font-size: 2rem;
            color: $primary-color
        }
    }
}
.view-nav-wrapper{
    font-size: 1.16rem;
    .nav-list{
        max-width: 960px;
        margin: 0 auto;
        @include fsc;
        .nav-item{
            padding: 1rem;
            color: #71777c;
            cursor: pointer;
        }
        .nav-item.active,.nav-item:hover{
            color: $primary-color;
        }
    }
}
    
</style>

