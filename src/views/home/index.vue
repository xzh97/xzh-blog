<template>
    <div class="home-wrapper">

        <div class="blog-list">
            <h4 class="list-tip">最近更新</h4>
            <dl class="blog-item" v-for="blog in blogList" :key="blog.blogOid">
                <dt class="create-time">{{blog.createTime}}</dt>
                <dd class="title" @click="goDetail(blog.blogOid)">{{blog.title}}</dd>
                <dd class="blog-description one-line">{{blog.description}}</dd>
            </dl>
        </div>

        <ul class="category-list">
            <h4 class="list-tip">Category</h4>
            <li
                    class="category-item"
                    v-for="(category,index) in categoryList"
                    :key="category.categoryOid"
            >
                <span class="category-name" @click='goCategoryList(category)'>{{category.name}}</span>
                <span v-if="index !== categoryList.length - 1" class="dot">·</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { getBlogList, getCategories } from "@/api/blog";
import dayJS from 'dayjs';
import {mapMutations} from 'vuex';

import Pagination from "@/components/base/pagination-v2/index";
export default {
    name: "home",
    data() {
        return {
            blogList: [],
            categoryList: [], //博客分类列表
        };
    },
    computed: {},
    methods: {
        ...mapMutations([
            'setIsShowLoading'
        ]),
        getBlogList() {
            getBlogList({ page: 1, size: 8 }).then(
                res => {
                    console.log(res);
                    res.data.data.forEach(item => {
                        item.createTime = dayJS(item.createTime).format('ddd,YY MMM Do');
                    });
                    this.blogList = res.data.data;
                }
            );
        },
        goDetail(blogOid){
            this.$router.push({
                path:`blog/detail/${blogOid}`
            })
        },
        goCategoryList(category){
            this.$router.push({
                path:`blog/list/${category.categoryOid}`
            })
        }
    },
    created() {
        this.getBlogList();
        getCategories().then(res => {
            this.categoryList = res.data;
        });
    },
    beforeRouteEnter (to, from, next) {
        next();
    },
    beforeRouteLeave (to, from, next) {
        // this.setIsShowLoading(true);
        next();
    },
    components: {
        Pagination,
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.home-wrapper {
    .list-tip{
        font-size: 1.5em;
    }
    .blog-list {
        width: 100%;
        .blog-item {
            text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
            font-weight: 400;
            line-height: 1.7;
            margin-bottom: 30px;
            .create-time {
                float: left;
                clear: left;
                color: $title-color;
                font-size: 1.25em;
            }
            .title {
                cursor: pointer;
                color: $title-color;
                transition: all 0.2s;
            }
            .title:hover {
                color: $link-color;
                transition: all 0.2s;
            }
        }
    }
    .category-list {
        .category-item {
            display: inline-block;
            height: 30px;
            line-height: 1.1;
            .category-name {
                color: $title-color;
                cursor: pointer;
                transition: all 0.2s;
            }
            .category-name:hover {
                color: $link-color;
                transition: all 0.2s;
            }
            .dot{
                display: inline-block;
                margin: 0 10px;
            }
        }
    }
}
</style>

