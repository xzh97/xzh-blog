<template>
    <div class="footer-wrapper">
        <hr>
        <p class="copy-right">豫ICP备15033156号-1 / 豫公网安备 41081102000052号</p>
        <p class="copy-right" style="margin-top:20px;">© 2014 - 2019 追梦的蚂蚁. Using Typecho & Moricolor. / Sitemap</p>
        
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../../styles/mixin';
.footer-wrapper{
    hr {
        height: 1px;
        margin-top: 0;
    }
    width: 100%;
    padding: 20px;
    font-size: 15px;
    color: #bac1c8;
    text-align: center;
    .copy-right{
        color: $text-color;
    }
}
</style>

