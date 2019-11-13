<template>
    <div class="home-wrapper">
        <logo></logo>    

            <div class="blog-list">
                <h4 class="list-tip">最近更新</h4>
                <dl class="blog-item" v-for="blog in blogList" :key="blog.blogOid">
                    <dt class="create-time">{{blog.createTime}}</dt>
                    <dd class="title" @click="goDetail(blog.blogOid)">{{blog.title}}</dd>
                    <dd class="blog-description">{{blog.description}}</dd>
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
import moment from 'moment';

import Pagination from "@/components/base/pagination-v2/index";
import Logo from '@/components/business/logo/index';
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
        getBlogList() {
            getBlogList({ page: 1, size: 8 }).then(
                res => {
                    console.log(res);
                    res.data.forEach(item => {
                        item.createTime = moment(item.createTime).format('ddd,YY MMM Do');
                    });
                    this.blogList = res.data;
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
            this.categoryList = res;
        });
    },
    components: {
        Pagination,
        Logo,
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.home-wrapper {
    .list-tip{
        font-size: 24px;
    }
    .blog-list {
        width: 100%;
        .blog-item {
            text-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
            font-weight: 400;
            line-height: 1.7;
            margin-bottom: 30px;
            font-size: 18px;
            .create-time {
                float: left;
                clear: left;
                color: #34495e;
                font-size: 20px;
            }
            .title {
                cursor: pointer;
                color: $title-color;
            }
            .title:hover {
                color: #34495e;
                transition: all 0.2s;
            }
            .blog-description {
                font-size: 15px;
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
                font-size: 16px;
                transition: all 0.2s;
            }
            .category-name:hover {
                color: #34495e;
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

