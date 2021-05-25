<template>
    <div class="login-page-wrapper">
        <!-- 掘金看到的登录modal的头部图片 觉得还蛮好看的 -->
        <div class="logo">
            <img class="normal" v-show="currentLogo === 'normal'" :src="imgs.normal" alt="">
            <img class="greeting" v-show="currentTab === 'login' && currentLogo === 'account'" :src="imgs.greeting" alt="">
            <img class="blindfold" v-show="currentTab === 'login' && currentLogo === 'password'" :src="imgs.blindfold" alt="">
        </div>
        <div class="tab-wrapper">
            <div class="tab-list">
                <div 
                    class="tab-item"
                    :key='tab.key'
                    v-for="tab in tabList"
                    :class="{'active': tab.key === currentTab}"
                    @click='onTabsChange(tab)'
                >
                {{tab.name}}
                </div>
            
            </div>
            <div class="tab-content">
                <component :is="currentComp" @on-focus='handleFocus'></component>
            </div>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script>
import AccountLogin from './login';
import Register from './register';


import {login, register} from '@/api/base.js';
import greetingImg from '@/assets/images/login/greeting.png';
import normalImg from '@/assets/images/login/normal.png';
import blindfoldImg from '@/assets/images/login/blindfold.png';
export default {
    name: 'login-page',
    data(){
        return {
            currentTab: 'login',
            tabList:[
                {
                    name: '登录',
                    key: 'login',
                },
                {
                    name: '注册',
                    key: 'register',
                },
            ],
            imgs:{
                greeting: greetingImg,
                normal: normalImg,
                blindfold: blindfoldImg
            },
            currentLogo: 'normal',
        }
    },
    computed: {
        currentComp(){
            if(this.currentTab === 'login'){
                return AccountLogin
            }
            else{
                return Register
            }
        },
        config(){
            return {
                color: '52, 73, 94',
                count: 66,
                opacity: 0.6,
                zIndex: -1
            }
        },
    },
    methods:{
        onTabsChange(tab){
            this.currentTab = tab.key;
            if(tab.key === 'register') this.handleFocus('normal');
        },
        register(){

        },
        handleFocus(type){
            // console.log(type);
            this.currentLogo = type;
        }
    },
    beforeDestroy () {
        this.cn.destroy()
    },
    components:{
        AccountLogin,
        Register,
    }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
.login-page-wrapper{
    height: 100%;
    .logo{
        img{
            position: absolute;
            top: 0;
            left: 50%;
            width: 100px;
            z-index: 1;
        }
        .normal{
            transform: translate(-50%, -83%);
        }
        .greeting{
            transform: translate(-50%, -75.8%);
        }
        .blindfold{
            transform: translate(-50%, -75%);
        }
    }
    .tab-wrapper{
        width: 550px;
        padding: 20px 16px;
        margin: 15vh auto;
        background-color: #ffffff;
        font-size: $font-size-base;
        border-radius: $border-radius-base;
        box-shadow: $box-shadow-base;
        .tab-list{
            @include fac;
            box-sizing: border-box;

        }
        .tab-item{
            line-height: 32px;
            text-align: center;
            cursor: pointer;
            color: $text-color;
            flex: 1;
        }
        .active{
            color: $primary-color;
            border-bottom: 1px solid $primary-color;
        }
    }
    .test-purgecss1{
        width: 200px;
        height: 200px;
    }
    .test-purgecss2{
        width: 200px;
        height: 200px;
    }
}


</style>