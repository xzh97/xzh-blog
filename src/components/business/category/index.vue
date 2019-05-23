<template>
    <div class="category-wrapper">
        <h3 class="category-title">{{ title }}</h3>
        <div class="category-content">
            <ul class="category-list">
                <li class="category-item oneline" :key="item.value" v-for="item in categoryList">
                    <div class="item-left">{{ item.categoryName}}</div>
                    <div class="item-right">{{ item.articlesCount }}篇</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "category",
    props: {
        title: {
            type: String,
            default: ""
        },
        categoryList: {
            type: Array,
            default() {
                return [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/mixin.scss";
.category-wrapper {
    width: 100%;
    background: #ffffff;
    margin-top: 20px;
    color: #000000;
    box-shadow: 0 0 4px rgba(255,255,255,.2);
    .category-title {
        padding: 0 16px;
        background: #dddddd;
        font-size: 16px;
        color: #3d3d3d;
        height: 38px;
        line-height: 38px;
    }
    .category-content {
        padding: 16px;
    }
    .category-item {
        @include fbc;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        .item-left {
            color: #c88326;
            font-size: 16px;
        }
        .item-right {
            font-size: 12px;
            color: #cccccc;
        }
    }
    .category-item:hover {
        .item-left {
            color: #f03434;
        }
    }
}
</style>

