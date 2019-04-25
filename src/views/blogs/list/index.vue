<template>
    <div class="blogs-wrapper">
        <div class="blogs-inner">
            <header class="header">
                <div class="header-left">
                    <h4 class="header-title">xzh的学习笔记</h4>
                </div>
                <div class="header-right">
                    <button>管理笔记</button>
                </div>
            </header>
            <div class="user-blogs-info"></div>
            <div class="blogs"></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin.scss';
    .blogs-wrapper{
        width: 100%;
        min-height: 1000px;
        background: url('../../../assets/images/bg3.jpg') no-repeat;

        display: flex;
        justify-content: center;

        color: #ffffff;
        .blogs-inner{
            width: 80%;
            .header{
                width: 100%;
                height: 80px;
                @include fbc;
                .header-title{
                    font-size: 24px;
                    line-height: 30px;
                    font-weight: 500;
                }
            }
        }
    }
</style>
