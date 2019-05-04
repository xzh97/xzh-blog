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
                        <li class="blog-item" :key="item.id" v-for="item in blogList"
                            @mouseleave="updateBlogEditBtn(item,'hide')"
                            @mouseenter="updateBlogEditBtn(item,'show')">
                            <h4 class="blog-title">
                                <span class="blog-type original"  v-if="item.blogType === 'original'">原</span>
                                <span class="blog-type reproduced" v-else>转</span>
                                {{ item.title }}
                            </h4>
                            <p class="blog-desc">{{ item.description }}</p>
                            <div class="blog-item-footer">
                                <p class="blog-date">{{ item.lastUpdatedTimeFormat }}</p>
                                <p class="point"></p>
                                <p class="blog-read-num">阅读数 <span class="num">{{ item.visitor }}</span></p>
                                <p class="point"></p>
                                <p class="blog-comment">评论 <span class="num">{{ item.commentCount }}</span></p>
                            </div>
                            <div class="blog-edit-btn-group" v-if="item.isShowBlogEditBtn">
                                <button class="blog-edit-btn">编辑</button>
                                <button class="blog-edit-btn">置顶</button>
                                <button class="blog-edit-btn detele-btn">删除</button>
                            </div>                        
                        </li>
                    </ul>
                    <pagination :total-page='10' :isShowPageTo='false'>
                    </pagination>
                </div>
            </div>   
        </div>
    </div>
</template>

<script>
import Category from '../../../components/base/category/index';
import Avatar from '../../../components/base/avatar/index';
import Pagination from '../../../components/base/pagination/index';
import Message from '../../../plugins/message/index.vue';

import util from '../../../share/utils';
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
            blogList:[],
        }
    },
    created(){
        this.getBlogList();
        //this.$message({type:'success',text:'打开成功',duration: 3000});
        this.$message('打开成功');
    },
    methods:{
        //event
        sortClickHandle(sortWay){
            this.sortBy = sortWay.value;
        },
        updateBlogEditBtn(item,controlFlag){
            item.isShowBlogEditBtn = controlFlag === 'show' ? true : false ;
        },

        //service
        getBlogList(){
            let data = [
                {
                    id:100001,
                    title:'如何编写一个ajax？(1)',
                    blogType:'original',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502275412000,
                    visitor: 262,
                    commentCount:0,
                    comments:[],
                }, 
                {
                    id:100002,
                    title:'如何编写一个ajax？(2)',
                    blogType:'reproduced',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502475412000,
                    visitor: 22,
                    commentCount:0,
                    comments:[],
                },
                {
                    id:100003,
                    title:'如何编写一个ajax？(1)',
                    blogType:'original',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502275412000,
                    visitor: 262,
                    commentCount:0,
                    comments:[],
                }, 
                {
                    id:100004,
                    title:'如何编写一个ajax？(2)',
                    blogType:'reproduced',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502475412000,
                    visitor: 22,
                    commentCount:0,
                    comments:[],
                },
                {
                    id:100005,
                    title:'如何编写一个ajax？(1)',
                    blogType:'original',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502275412000,
                    visitor: 262,
                    commentCount:0,
                    comments:[],
                }, 
                {
                    id:100006,
                    title:'如何编写一个ajax？(2)',
                    blogType:'reproduced',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502475412000,
                    visitor: 22,
                    commentCount:0,
                    comments:[],
                },
            ];
            data.map(item => {
                item.lastUpdatedTimeFormat = util.formatDate(item.lastUpdatedTime,'yyyy-MM-dd hh:mm:ss');
                item.isShowBlogEditBtn = false;
            });
            this.blogList = data;
        }
    },
    components:{
        Category,
        Avatar,
        Pagination,
        Message
    }
}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin.scss';
    .blogs-wrapper{
        width: 100%;
        height: 100%;
        min-height: 1000px;
        background: url('../../../assets/images/bg3.jpg') repeat-y;
        background-size: 100%;

        display: flex;
        justify-content: center;

        color: #ffffff;
        .blogs-inner{
            width: 80%;
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
                @include fb;
                width: 100%;
                color: #4d4d4d;
                padding-bottom: 40px;
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
                            font-size: 16px;
                            vertical-align: middle;
                            #check-original {
                                margin: 0;
                                margin-right: 8px;
                                margin-top: -4px;
                                width: 14px;
                                height: 14px;
                                cursor: pointer;
                                vertical-align: middle;
                            }
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
                            position: relative;
                            padding: 12px 24px;
                            border-bottom: 1px solid #cccccc;
                            .blog-title{
                                color: #4d4d4d;
                                word-break: break-all;
                                line-height: 24px;
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
                            .blog-title:hover{
                                cursor: pointer;
                                color: #FF7F50;
                            }
                            .blog-desc{
                                color: #999;
                                font-size: 14px;
                                line-height: 22px;
                                white-space: normal;
                            }
                            .blog-desc:hover{
                                cursor: pointer;
                            }
                            .blog-item-footer{
                                @include fsc;
                                .blog-date,.blog-read-num,.blog-comment{
                                    font-size: 14px;
                                    line-height: 22px;
                                    color: #999;
                                    .num{
                                        font-size: 14px;
                                        color: #3399ea;
                                    }
                                }
                                .blog-date{
                                    color: #6b6b6b;

                                }
                                .point{
                                    width: 1px;
                                    height: 12px;
                                    background: #e0e0e0;
                                    margin: 6px 8px;
                                }
                            }
                        }
                        .blog-item:hover{
                            background: #fafafa;
                        }
                        .blog-edit-btn-group{
                            position: absolute;
                            right: 16px;
                            bottom: 12px;
                            z-index: 12;
                            .blog-edit-btn{
                                background: none;
                                cursor: pointer;
                                color: #7b705e;
                                border: 1px solid #7b705e;
                                margin-right: 10px;
                            }
                            .detele-btn{
                                color: #ca0c16;
                            }
                        } 
                    }
                }
            }
        }
    }
</style>
