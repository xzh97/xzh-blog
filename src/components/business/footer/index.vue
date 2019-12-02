<template>
    <div class="footer-wrapper">
        <p class="copy-right">沪ICP备xxxxxxxx-1 / 沪公网安备 xxxxxxxxxxxxxx号</p>
        <p
            class="copy-right"
            style="margin-top:20px;"
        >© 2019 - {{ new Date().getFullYear() }} 追梦的蚂蚁. </p>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../../../styles/mixin";
.footer-wrapper {
    width: 100%;
    padding: 20px;
    color: #bac1c8;
    text-align: center;
    border-top: 1px solid #bac1c8;
    margin-top: 30px;
    .copy-right {
        color: $text-color;
    }
}
</style>

