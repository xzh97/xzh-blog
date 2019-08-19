<template>
    <div class="home-wrapper">
        <div class="logo">
            <h1 class="logo-text">将你我连同人间浸没</h1>
            <p class="description">何须仰望他人，自己亦是风景</p>
            <div class="search-anything">
                <input class="search-area" type="text" placeholder="Search anything here~">
            </div>
            <hr>
        </div>
        
        <ul class="blog-list">
            <h4>记事</h4>
            <li class="blog-item" v-for='blog in blogList' :key='blog.blogOid'>
                <div class="blog-item-left create-time">{{blog.createTime}}</div>
                <div class="blog-item-right">
                    <p class="title">{{blog.title}}</p>
                    <p class="blog-description">{{blog.description}}</p>
                </div>
            </li>
        </ul>

        <ul class="category-list">
            <h4>(ฅ´ω`ฅ)</h4>
            <li class="category-item" v-for="(category,index) in categoryList" :key='category.categoryOid'>
                <span class="category-name">ฅ{{category.name}}ฅ</span>
                <span v-if="index !== categoryList.length - 1"  class="dot">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
            </li>
        </ul>
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
        width: 60%;
        margin: 0 auto;
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
                padding: 6px 10px;
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
                @include fbc;
                align-items: baseline;
                text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.1);
                font-weight: 400;
                line-height: 1.7;
                margin-bottom: 30px;
                .blog-item-left {
                    width: 14%; 
                    text-align: right;
                }
                .create-time{
                    color:#34495e;
                }
                .blog-item-right {
                    width: 84%; 
                    text-align: left;
                    cursor: pointer;
                    .title{
                        color: $title-color;
                        font-size: 20px;
                    }
                }
                .blog-item-right:hover {
                    color: #34495e;
                }
            }
        }
        .category-list {
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
    .home-wrapper::after {
        content:'';
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        opacity: .1;
        background-image: url('../../assets/images/bg3.jpg');
    }
    
</style>

