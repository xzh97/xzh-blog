<template>
    <div class="home-wrapper">
        <div class="logo">
            <h1 class="logo-text">Winter Sweet</h1>
            <p class="description">何须仰望他人，自己亦是风景</p>
            <div class="search-anything">
                <input class="search-area" type="text" placeholder="Search anything here~">
            </div>
            <hr>
        </div>
        
        <div class="blog-list">
            <h4>记事</h4>
            <dl class="blog-item" v-for='blog in blogList' :key='blog.blogOid'>
                <dt class="create-time">{{blog.createTime}}</dt>
                <dd class="title">{{blog.title}}</dd>
                <dd class="blog-description">{{blog.description}}</dd>
            </dl>
            <pagination align='right' :has-next-page="hasNextPage" :has-prev-page="hasPrevPage"></pagination>
        </div>

        <dl class="category-list">
            <h4>(ฅ´ω`ฅ)</h4>
            <dt class="category">Category</dt>
            <dd class="category-item" v-for="(category,index) in categoryList" :key='category.categoryOid'>
                <span class="category-name">&{{category.name}}</span>
                <span v-if="index !== categoryList.length - 1"  class="dot">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            </dd>
        </dl>
    </div>
</template>

<script>
import { getBlogList, getCategories } from '@/api/blog';
import utils from '@/share/utils';

import Pagination from '@/components/base/pagination-v2/index';
export default {
    name:'home',
    data(){
        return {
            blogList:[], 
            categoryList:[], //博客分类列表
            blogPage:1,
            blogSize:10,
            hasNextPage:false,
            hasPrevPage:false,
        }
    },
    computed:{
    },
    methods:{
        
    },
    created(){
        getBlogList({page:this.blogPage, size: this.blogSize}).then(res => {
            console.log(res);
            res.data.forEach(item => {
                item.createTime = utils.dateFormat(item.createTime)
            });
            this.blogList = res.data;
            this.hasNextPage = res.hasNextPage;
            this.hasPrevPage = res.hasPrevPage;
        })
        getCategories().then(res => {
            this.categoryList = res;
        })
    },
    components:{
        Pagination,
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
    .home-wrapper {
        .logo-text {
            font-size: 30px;
            font-weight: 600;
            margin-top: 30px;
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
                border-color:#cccccc; 
            }
            .search-area-active {
                border-color: #bbbbbb;
            }
        }
        h4{
            font-weight: 600;
            font-size: 20px;
            line-height: 1.1;
            color: #34495e;
        }
        .blog-list {
            width: 100%;
            .blog-item {
                text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
                font-weight: 400;
                line-height: 1.7;
                margin-bottom: 30px;
                font-size: 18px;
                .create-time{
                    float: left;
                    clear: left;
                    color:#34495e;
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
            .category{
                display: inline-block;
                margin-right: 20px;
            }
            .category-item {
                display: inline-block;
                height: 30px;
                line-height: 1.1;
                .category-name {
                    color:$title-color;
                    cursor: pointer;
                    font-size: 16px;
                    transition: all .2s;
                }
                .category-name:hover {
                    color: #34495e;
                    transition: all .2s;
                }
                .dot {
                    color: #34495e;
                }
            }
        }
    }
    
    
</style>

