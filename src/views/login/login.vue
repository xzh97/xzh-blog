<template>
    <div class="login-wrapper">
        <div class="login-inner">
            <div class="form-item-wrapper">
                <input role="input" placeholder="请输入手机号/邮箱" v-model='account' type="text" class="form-item" @focus="handleFocus('account')">
            </div>
            <div class="form-item-wrapper">
                <input role="input" placeholder="请输入密码" v-model="password" type="password" class="form-item" @focus="handleFocus('password')">
            </div>
            <div class="form-item-wrapper">
                <x-button class="form-item" :type="'primary'">登录</x-button>
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
        hanadleLoginThird(item){
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