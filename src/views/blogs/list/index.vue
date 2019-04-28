<template>
    <div class="blogs-wrapper">
        <div class="blogs-inner">
            <header class="header">
                <div class="header-left">
                    <h4 class="header-title">xzh的学习笔记</h4>
                </div>
                <div class="header-right">
                    <button>管理笔记</button>
                </div>
            </header>
            <div class="content">
                <div class="content-left">
                    <div class="blog-info">
                        <avatar></avatar>
                    </div>
                    <category v-for="item in blogCategorys" :key='item.title' :title='item.title' :categoryList='item.categoryList'></category>
                </div>
                <div class="content-right">
                    <div class="content-tips">
                        <form class="original-only">
                            <label class="check-original-box" for="check-original"><input v-model="isSeeOriginalOnly" type="checkbox" name="blogTypeCheck" id="check-original">只看原创</label>
                        </form>
                        <dl class="sort-by clearfix">
                            <dt>排序方式:</dt>
                            <dd class="sort-filter" v-for="item in sortByList" :key="item.title" 
                                :class="{'sort-by-active':item.value === sortBy}"
                                @click="sortClickHandle(item)">
                                {{ item.title }}
                            </dd>
                        </dl>
                    </div>
                    <ul class="content-list">
                        <li class="blog-item" :key="item.id" v-for="item in blogList">
                            <h4 class="blog-title">
                                <span class="blog-type" :class="{'original':item.blogType === 'original',}">原</span>如何编写一个ajax？
                            </h4>
                            <p class="blog-desc">{{ item.description }}</p>
                            <p class="blog-item-footer">
                                <span class="blog-update-time">{{ item.lastUpdatedTime }}</span>
                                <span class="blog-visitor">{{ item.visitor }}</span>
                                <span class="blog-comment">{{ item.commentCount }}</span>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
import Category from '../../../components/base/category/index';
import Avatar from '../../../components/base/avatar/index';
export default {
    name:'blog-list',
    data(){
        return {
            blogCategorys:[
                {
                    title:'博客分类',
                    categoryList:[
                        {
                            value:1,
                            categoryName:'Vue学习笔记',
                            articlesCount:10,
                        },
                        {
                            value:2,
                            categoryName:'React学习笔记',
                            articlesCount:20,
                        },
                    ]
                },
                {
                    title:'归档',
                    categoryList:[
                        {
                            value:'2017-08',
                            categoryName:'2017年8月',
                            articlesCount:10,
                        },
                        {
                            value:'2017-07',
                            categoryName:'2017年7月',
                            articlesCount:10,
                        },
                        {
                            value:'2017-06',
                            categoryName:'2017年6月',
                            articlesCount:100,
                        },
                        {
                            value:'2017-04',
                            categoryName:'2017年4月',
                            articlesCount:1,
                        },
                    ]
                }
            ],
            isSeeOriginalOnly:false,
            sortBy:'default',
            sortByList:[
                {
                    title:'默认',
                    value:'default',
                },
                {
                    title:'按更新时间',
                    value:'updateTime',
                },
                {
                    title:'按访问量',
                    value:'visits',
                },
            ],
            blogList:[
                {
                    id:100001,
                    title:'如何编写一个ajax？',
                    blogType:'original',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502275412000,
                    visitor: 262,
                    commentCount:0,
                    comments:[],
                }, 
            ],
        }
    },
    methods:{
        sortClickHandle(sortWay){
            this.sortBy = sortWay.value;
        }
    },
    components:{
        Category,
        Avatar
    }
}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin.scss';
    .blogs-wrapper{
        width: 100%;
        min-height: 1000px;
        background: url('../../../assets/images/bg3.jpg') no-repeat;

        display: flex;
        justify-content: center;

        color: #ffffff;
        .blogs-inner{
            width: 70%;
            .header{
                width: 100%;
                height: 80px;
                @include fbc;
                .header-title{
                    font-size: 24px;
                    line-height: 30px;
                    font-weight: 500;
                }
            }
            .content{
                width: 100%;
                @include fb;
                color: #4d4d4d;
                .content-left{
                    width: 30%;
                    .blog-info, .blog-category{
                        width: 100%;
                        height: 240px;
                        background: #ffffff;
                    }
                    .blog-category{
                        margin-top: 20px;
                    }
                }
                .content-right{
                    width: 70%;
                    background: #ffffff;
                    margin-left: 20px; 
                    .content-tips{
                        height: 48px;
                        line-height: 48px;
                        border-bottom: 1px solid #cccccc; 
                        padding: 0 16px;
                        @include fb;
                        .check-original-box {
                            #check-original {
                                margin-right: 8px;
                                width: 14px;
                                height: 14px;
                                cursor: pointer;
                            }
                            font-size: 16px;
                            vertical-align: middle;
                        }
                        .sort-by{
                            dt,.sort-filter{
                                font-size: 16px;
                                padding: 0 16px;
                                float: left;
                                height: 48px;
                                
                            }
                            dt{
                                color: #999999;
                            }
                            .sort-filter{
                                cursor: pointer;
                            }
                            .sort-filter:hover,.sort-by-active{
                                color: #ca0c16;
                            }
                        }
                    }
                    .content-list{
                        .blog-item{
                            padding: 12px 24px;
                            .blog-title{
                                color: #4d4d4d;
                                word-break: break-all;
                                margin-bottom: 6px;
                                .blog-type{
                                    display: inline-block;
                                    width: 24px;
                                    height: 24px;
                                    line-height: 24px;
                                    border-radius: 50%;
                                    box-sizing: border-box;
                                    font-weight: normal;
                                    margin-right: 8px;
                                    font-size: 12px;
                                    text-align: center;
                                }
                                .original{
                                    color:#ca0c16;
                                    border: 1px solid #f4ced0;
                                }
                                .reproduced{
                                    color: #86ca5e;
                                    border: 1px solid #e7f4df;
                                }
                            }
                            .blog-desc{
                                color: #999;
                                font-size: 14px;
                                line-height: 22px;
                                white-space: normal;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
