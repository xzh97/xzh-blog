<template>
    <div class="home-wrapper">
        <p>别问，问就是不知道要加些什么
            <!--<i class="iconfont icon-loading"></i>-->
            <i class="iconfont icon-Loading1"></i>
        </p>
    </div>
</template>

<script>
export default {
    name:'home',
}
</script>

<style lang="scss" scoped>
    .home-wrapper{
        width: 100%;
        height: 500px;
        color: #ffffff;
        p{
            padding-top: 100px;
            text-align: center;
            color: #ffffff;
        }
        .icon-Loading1:hover, .icon-loading:hover{
            display: inline-block;
            animation: rotate .8s infinite;
        }
    }
    .home-wrapper:after {
        background: url('../../assets/images/bg3.jpg') no-repeat;
    }
    @keyframes rotate {
        0% { }
        25% { transform: rotate(90deg)}
        50% { transform: rotate(180deg)}
        75% { transform: rotate(270deg)}
        100% { transform: rotate(360deg)}
    }
</style>

