<template>
    <div class="custom-header-wrapper">
        <div class="custom-header-inner">
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
        })

        return {
            ...state
        }
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
                color: #007fff;
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
            border-color: #007fff;
        }
        .write-btn{
            padding: 0 .9rem;
            color: #ffffff;
            background: #007fff;
            border: 1px solid #007fff;
            border-radius: $border-radius-base;
            height: 2.667rem;
        }
        .notification-icon{
            font-size: 2rem;
            color: #007fff
        }
    }
}
    
</style>

