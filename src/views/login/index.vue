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
import CanvasNest from 'canvas-nest.js'


import {login, register} from '@/api/login.js';
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
        createCanvasNest(){
            const el = document.querySelector('body');
            this.cn = new CanvasNest(el,this.config)
        },
        onTabsChange(tab){
            this.currentTab = tab.key;
            if(tab.key === 'register') this.handleFocus('normal');
        },
        handleOk(){
            if(this.currentTab === 'login'){
                login();
            }
            else{
                register();
            }
        },
        login(){
            let data = {
                account: this.account,
                password: this.password,
            }
            login(data).then(res => {
                if(res.data.status === 200){
                    this.$message('登录成功');
                    this.$router.push({name: 'home'});
                }
            }).catch(err => {
                err = {
                    headers:{

                    },
                    status: 400,
                    data: {
                        errCode: 'LOGIN_FAILED',
                        errMsg: '登录失败',
                    }
                }
                this.handleError(err);
            })
        },
        register(){

        },
        handleFocus(type){
            console.log(type);
            this.currentLogo = type;
        }
    },
    mounted(){
        this.createCanvasNest();
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
        }
        .tab-item{
            padding: 0px 10px 6px;
            line-height: 20px;
            height: 20px;
            text-align: center;
            cursor: pointer;
            color: $text-color;
        }
        .active{
            color: $primary-color;
        }
    }
    
}


</style>