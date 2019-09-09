<template>
    <div class="home-wrapper">
        <logo></logo>    

        <div class="blog-list">
            <h4>记事</h4>
            <dl class="blog-item" v-for="blog in blogList" :key="blog.blogOid">
                <dt class="create-time">{{blog.createTime}}</dt>
                <dd class="title" @click="goDetail(blog.blogOid)">{{blog.title}}</dd>
                <dd class="blog-description">{{blog.description}}</dd>
            </dl>
            <pagination
                align="right"
                :has-next-page="hasNextPage"
                :has-prev-page="hasPrevPage"
                @on-page-change="onChangePager"
            ></pagination>
        </div>

        <dl class="category-list">
            <h4>(ฅ´ω`ฅ)</h4>
            <dt class="category">Category</dt>
            <dd
                class="category-item"
                v-for="(category,index) in categoryList"
                :key="category.categoryOid"
            >
                <span class="category-name" @click='goCategoryList(category)'>&{{category.name}}</span>
                <span v-if="index !== categoryList.length - 1" class="dot">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            </dd>
        </dl>
    </div>
</template>

<script>
import { getBlogList, getCategories } from "@/api/blog";
import utils from "@/share/utils";

import Pagination from "@/components/base/pagination-v2/index";
import Logo from '@/components/business/header/index';
export default {
    name: "home",
    data() {
        return {
            blogList: [],
            categoryList: [], //博客分类列表
            blogPage: 1,
            blogSize: 5,
            hasNextPage: false,
            hasPrevPage: false,
            totalPage: 0
        };
    },
    computed: {},
    methods: {
        getBlogList() {
            getBlogList({ page: this.blogPage, size: this.blogSize }).then(
                res => {
                    console.log(res);
                    res.data.forEach(item => {
                        item.createTime = utils.dateFormat(item.createTime);
                    });
                    this.blogList = res.data;
                    this.hasNextPage = res.hasNextPage;
                    this.hasPrevPage = res.hasPrevPage;
                    this.totalPage = res.totalPage;
                }
            );
        },
        onChangePager({type}) {
            console.log(type);
            let { blogPage, totalPage } = this;
            if (type === "prev") {
                console.log(blogPage);
                if (blogPage <= 1) return;
                this.blogPage--;
            } else {
                if (blogPage >= totalPage) return;
                this.blogPage++;
            }
            this.getBlogList();
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
    .blog-list {
        width: 100%;
        .blog-item {
            text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
            font-weight: 400;
            line-height: 1.7;
            margin-bottom: 30px;
            font-size: 18px;
            .create-time {
                float: left;
                clear: left;
                color: #34495e;
            }
            .title {
                cursor: pointer;
                color: $title-color;
            }
            .blog-description {
                font-size: 15px;
            }

            .blog-item:hover {
                color: #34495e;
            }
        }
    }
    .category-list {
        .category {
            display: inline-block;
            margin-right: 20px;
        }
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
            .dot {
                color: #34495e;
            }
        }
    }
}
</style>

