<template>
    <div class="login-wrapper">
        <div class="login-inner">
            <div class="form-item-wrapper">
                <input role="input" placeholder="请输入账号" v-model='account' type="text" class="form-item" @focus="handleFocus('account')">
            </div>
            <div class="form-item-wrapper">
                <input role="input" placeholder="请输入密码" v-model="password" type="password" class="form-item" @focus="handleFocus('password')">
            </div>
            <div class="form-item-wrapper">
                <x-button class="form-item" :type="'primary'" @click="login">登录</x-button>
            </div>
        </div>
        <div v-if="thirdList.length" class="third-entrance-wrapper">
            <div 
                class="third-entrance-item"
                v-for="item in thirdList"
                :key="item.key"
                @click="hanadleLoginThird(item)"
            >
                <icon class="third-entrance-icon" :type='item.type' :fill="item.fill"></icon>
            </div>
        </div>
    </div>

</template>
<script>
import Icon from '@/components/base/icon';
import xButton from '@/components/base/button';

import {getToken} from '@/api/base';
import {encode, decode} from '@/share/encrypt';
import {setItem} from '@/share/utils';
import {mapMutations} from 'vuex';

export default {
    name: 'AccountLogin',
    data(){
        return {
            account: '',
            password: '',
            thirdList:[
                {
                    type: 'wechat',
                    key: 'wechat',
                    fill: true,
                },
                {
                    type: 'QQ',
                    key: 'qq',
                    fill: false,
                },
                {
                    type: 'weibo',
                    key: 'weibo',
                    fill: false,
                },
            ],
        }
    },
    methods:{
        ...mapMutations([
            'setToken',
        ]),
        hanadleLoginThird(item){
            this.$message({
                type: 'failed',
                text: '第三方登录暂时不可用'
            });
            return;
            switch(item.key){
            case 'wechat':
                break;
            case 'qq':
                break;
            case 'weibo':
                break;
            default:
                console.warn('可恶啊，选择一个第三方登录啊')
                break;
            }
        },
        handleFocus(type){
            this.$emit('on-focus', type)
        },

        // 校验
        handleBeforeSubmit(){
            let {account, password} = this;
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


            return {
                errFlag,
                errMsg
            }
        },
        login(){
            let {errFlag, errMsg} = this.handleBeforeSubmit();
            if(errFlag){
                this.$message({
                    type: 'failed',
                    text: errMsg,
                })
                return;
            }
            let params = {
                account: this.account,
                password: encode(this.password),
                type: 1 // 加密类型
            }
            getToken(params).then(res => {
                console.log(res);
                setItem('token', res);
                this.setToken(res);
                this.$router.push({name: 'home'})
            })
        }
    },
    components:{
        Icon,
        xButton
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.form-item-wrapper{
    .form-item{
        width: 100%;
        height: 36px;
        line-height: 36px;
        border-radius: $border-radius-base;
        margin-top: 16px;
        border: 1px solid $border-color-base;
        color: $text-color;
        text-indent: 10px;
    }
    .form-item[role=button] {
        text-indent: 0;
        border: none;
        background-color: $primary-color;
        cursor: pointer;
    }
}
.third-entrance-wrapper{
    @include fac;
    margin-top: 20px;
    .third-entrance-item{
        .third-entrance-icon{
            font-size: 32px;
        }
        .third-entrance-icon:hover{
            cursor: pointer;
            color: $primary-color;
        }
    }
}
</style>