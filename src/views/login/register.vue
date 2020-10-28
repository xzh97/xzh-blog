<template>
    <div class="register-wrapper">
        <div class="register-inner">
            <div class="form-item-wrapper">
                <input placeholder="请输入账号" v-model='account' type="text" class="form-item">
            </div>
            <div class="form-item-wrapper">
                <input placeholder="请输入密码" v-model="password" type="password" class="form-item">
            </div>
            <div class="form-item-wrapper">
                <input placeholder="请再次输入密码" v-model="confirmPassword" type="password" class="form-item">
            </div>
            <div class="form-item-wrapper">
                <x-button class="form-item" :type="'primary'" @click="register">注册</x-button>
            </div>
        </div>
    </div>

</template>
<script>
import xButton from '@/components/base/button';

import {register} from '@/api/base';
import {encode, decode} from '@/share/encrypt';
export default {
    name: 'Register',
    data(){
        return {
            account: '',
            password: '',
            confirmPassword: '',
        }
    },
    methods:{
        // 校验
        handleBeforeSubmit(){
            let {account, password, confirmPassword} = this;
            let errFlag = false, errMsg = '';
            let reg = /^[0-9A-Za-z]{0,20}$/;
            let regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
            if(!account){
                errFlag = true;
                errMsg = '请输入账号';
            }
            else if(!reg.test(account)){
                errFlag = true;
                errMsg = '账号只能输入大写字母/小写字母/数字，且最多为20位'
            }
            else if(!password){
                errFlag = true;
                errMsg = '请输入密码';
            }
            else if(!regPwd.test(password)){
                errFlag = true;
                errMsg = '密码必须含有大写字母/小写字母/数字中的两种，且长度必须在6~16之间';
            }
            else if(!confirmPassword){
                errFlag = true;
                errMsg = '请再次输入密码';
            }
            else if(confirmPassword !== password){
                errFlag = true;
                errMsg = '两次密码输入不一致';
            }


            return {
                errFlag,
                errMsg
            }
        },
        register(){
            let {account, password , confirmPassword} = this;
            let {errFlag, errMsg} = this.handleBeforeSubmit();
            if(errFlag){
                this.$message({
                    type: 'failed',
                    text: errMsg,
                })
                return;
            }
            let params = {
                account,
                password: encode(password),
                type: 1 // 加密类型
            }
            register(params).then(res => {
                console.log(res);
            })
        },

    },
    components:{
        xButton,
    }
}
</script>
<style lang="scss" scoped>
.form-item-wrapper{
    .form-item {
        width: 100%;
        height: 36px;
        line-height: 36px;
        border-radius: $border-radius-base;
        margin-top: 16px;
        border: 1px solid $border-color-base;
        color:$text-color;
        text-indent: 10px;
    }
}
</style>