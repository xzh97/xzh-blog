<template>
    <div class="blog-list-wrapper">
        <logo></logo>

        <h3 class="category-title">Category:&nbsp;&nbsp;{{category.name}}</h3>
        <div class="blog-list-inner clearfix">
            <div class="blog-list-item" v-for="blog in blogList" :key="blog.blogOid">
                <p class="blog-title oneline" @click="goBlogDetail(blog)">{{blog.title}}</p>
                <p class="blog-create-time">{{blog.createTime}}</p>
            </div>
        </div>
        <pagination
            align="right"
            :has-next-page="hasNextPage"
            :has-prev-page="hasPrevPage"
            @on-page-change="onChangePager"
        ></pagination>
    </div>
</template>

<script>
import Pagination from "@/components/base/pagination-v2/index";
import Logo from "@/components/business/logo/index";

import { getBlogList,getCategoryDetail } from "@/api/blog";

import util from "@/share/utils";
export default {
    name: "blog-list",
    data() {
        return {
            page: 1,
            size: 12,
            blogList: [],
            totalPage: 0,
            category:{},
            hasNextPage: false,
            hasPrevPage: false,
        };
    },
    created() {
        this.getCategoryDetail();
        this.getBlogList();
    },
    methods: {
        getCategoryDetail(){
            let {categoryOid} = this.$route.params
            getCategoryDetail(categoryOid).then(res => {
                console.log(res);
                this.category = res;
            }).catch(err => {
                console.log(err);
                //this.$message(err)
            })
        },
        getBlogList() {
            let params = {
                page: this.page,
                size: this.size,
                categoryOid: this.$route.params.categoryOid,
            };

            getBlogList(params).then(res => {
                console.log("getbloglist", res.data);
                let data = res.data;
                data.map(item => {
                    item.createTime = util.dateFormat(
                        item.createTime,
                        "yyyy-MM-dd"
                    );
                });
                this.blogList = data;
                this.hasNextPage = res.hasNextPage;
                this.hasPrevPage = res.hasPrevPage;
                this.totalPage = res.totalPage;
            });
        },
        onChangePager({type}) {
            console.log(type);
            let { page, totalPage } = this;
            if (type === "prev") {
                if (page <= 1) return;
                this.page--;
            } else {
                if (page >= totalPage) return;
                this.page++;
            }
            console.log(page);

            this.getBlogList();
        },

        goBlogDetail(blog) {
            this.$router.push({ path: `/blog/detail/${blog.blogOid}` });
        }
    },
    components: {
        Pagination,
        Logo
    }
};
</script>

<style lang='scss' scoped>
@import "../../../styles/mixin.scss";
.blog-list-wrapper {
    width: 100%;
    .category-title{
        width: 100%;
        font-size: 1.25em;
        color: $title-color;
        font-weight: 400;
        margin-top: 30px;
        margin-bottom: 20px;          
    }
    .category-title::before{
        content:'#';
        font-weight: 700;
        color: $link-color;
        margin-right: 8px;
    }
    .blog-list-inner {
        width: 100%;
        height: 100%;
        .blog-list-item{
            width: 30%;
            background: rgba(253, 246, 243, 0.6);
            height: 100px;
            border-radius: $border-radius-base;
            box-shadow: $box-shadow-base;
            padding: 14px;
            line-height: 20px;
            margin: 0 12.5px 20px;
            float: left;
            transform:scale(1);
            transition: all .3s;
            .blog-title{
                color:$title-color;
            }
            .blog-title:hover{
                color: $link-color;
                cursor: pointer;
            }
            .blog-create-time{
                margin-top: 8px;
                font-size: .75em;
                color:$text-color;
            }
        }
        .blog-list-item:hover{
            transform:scale(1.1);
            transition: all .3s;
        }
    }
}
</style>
