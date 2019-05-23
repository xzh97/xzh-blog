<template>
    <div class="footer-wrapper">
        <p class="copy-right">© 2017 Wired UI Kit. A FREE Bootstrap 4 UI Kit by Wired Dots Designed by @attacomsian / More </p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '../../../styles/mixin';
.footer-wrapper{
    width: 100%;
    height: 200px;
    background: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;
    .copy-right{
        color: $text-color;
    }
}
</style>

