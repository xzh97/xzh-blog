<template>
    <div class="login-wrapper">
        <div class="login-inner">
            <h3 class="login-title">xzh97's blog</h3>
            <div class="login-content">
                <div class="login-item">
                    <input class="login-input" type="text" placeholder="请输入手机号/邮箱" v-model="username">
                </div>
                <div class="login-item">
                    <input class="login-input" type="password" placeholder="请输入密码" v-model="password">
                </div>
                <div class="forget-password">
                    <span class="find-password">忘记密码？</span>
                </div>
            </div>
            <div class="login-footer">
                <button class="btn-primary" @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
import {getToken} from '@/api/login';
export default {
    name:'login',
    data(){
        return{
            username: '',
            password: '',
        }
    },
    methods:{
        login(){
            let { username, password } = this;
            let data = {
                username,
                password,
                encryptType: 1, // 加密方式
            }
            getToken(data).then(res => {
                if(res.access_token){
                    this.$message(res.errMsg);
                    this.$router.push({name: 'home'});
                }
            }).catch(err => {

            })
        }
    }
}
</script>

<style lang='scss' scoped>
    @import '../../styles/mixin';
    .login-wrapper{
        width: 100%;
        min-height: 600px;
        position: relative;

        .login-title{
            text-align: center;
        }
        .login-inner{
            width: 50%;
            height: auto;
            margin: 0 auto;
            box-shadow: $box-shadow-base;
            background: #ffffff;
            padding: 20px 10px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            .login-item{
                width: 100%;
                padding: 8px 5px;
                border: 1px solid $border-color-base;
                border-radius: $border-radius-base;
                margin-bottom: 10px;
                .login-input {
                    height: 24px;
                    line-height: 24px;
                }
            }
            .forget-password{
                font-size: 12px;
                padding: 8px 5px;
                .find-password{

                }
                .find-password:hover{
                    color: $link-color;
                    cursor: pointer;
                }
            }
            .login-footer{
                @include fac;
                .btn-primary {
                    width: 80px;
                }
                .btn-primary:hover{
                    opacity: .8;
                }
            }
        }
    }
</style>
