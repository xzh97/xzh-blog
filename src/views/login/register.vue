<template>
    <div class="register-wrapper">
        <div class="register-inner">
            <div class="form-item-wrapper">
                <input placeholder="请输入手机号/邮箱" v-model='account' type="text" class="form-item">
            </div>
            <div class="form-item-wrapper">
                <input placeholder="请输入密码" v-model="password" type="password" class="form-item">
            </div>
            <div class="form-item-wrapper">
                <input placeholder="请再次输入密码" v-model="confirmPassword" type="password" class="form-item">
            </div>
        </div>
    </div>

</template>
<script>
export default {
    name: 'Register',
    data(){
        return {
            account: '',
            password: '',
            confirmPassword: '',
        }
    },
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