<template>
    <div class="logo">
        <h1 class="logo-text">Winter Sweet <Icon @click="goToGitHub" type="github" fill /></h1>
        <p class="description">何须仰望他人，自己亦是风景</p>
        <!--<div class="search-anything">
            <input class="search-area" type="text" placeholder="Search anything here~" />
        </div>-->
        <hr />
    </div>
</template>

<script>
import Icon from '@/components/base/icon/index';
export default {
    name: 'logo',
    methods:{
        goToGitHub(){
            window.open('https://github.com/xzh97','_blank')
        }
    },
    components:{
        Icon,
    }
}
</script>

<style lang="scss" scoped>
.logo{
    .logo-text {
        font-size: 30px;
        font-weight: 600;
        margin-top: 30px;
        position: relative;
        .icon-github-fill{
            cursor: pointer;
            display: inline-block;
            transform: scale(1);
            transition: all .6s;
        }
        .icon-github-fill:hover{
            transform: scale(1.2);
            transition: all .6s;
        }
    }
    .description {
        font-size: 18px;
        margin: 0 0 15px;
    }
    .search-anything {
        margin: 30px;
        .search-area {
            height: 35px;
            line-height: 1.5;
            color: $text-color;
            border-radius: $border-radius-base;
            border: 2px solid #dddddd;
            background: rgba(254, 252, 250, 0.6);
            //padding: 6px 10px;
            font-size: 14px;
        }
        .search-area:hover {
            border-color: #cccccc;
        }
        .search-area-active {
            border-color: #bbbbbb;
        }
    }
    h4 {
        font-weight: 600;
        font-size: 20px;
        line-height: 1.1;
        color: #34495e;
    }
}
    
</style>

