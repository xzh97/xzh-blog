<template>
    <div class="blogs-wrapper">
        <div class="blogs-inner">
            <header class="header">
                <div class="header-left">
                    <h4 class="header-title">xzh的学习笔记</h4>
                </div>
                <!-- <div class="header-right">
                    <a-button>管理笔记</a-button>
                </div> -->
            </header>
            <div class="content">
                <sidebar></sidebar>
                <div class="content-right">
                    <div class="content-tips">
                        <div class="blog-item" >
                            <h4 class="blog-title">
                                <span class="blog-type original"  v-if="blogData.type == '1'">原</span>
                                <span class="blog-type reproduced" v-else>转</span>
                                {{ blogData.title }}
                            </h4>
                            <div class="blog-item-footer clearfix">
                                <p class="blog-date">{{ blogData.lastUpdatedTime }}</p>
                                <p class="blog-read-num">阅读数 <span class="num">{{ blogData.readNumber }}</span></p>
                                <p class="blog-comment">评论 <span class="num">{{ blogData.commentCount }}</span></p>
                                <p class="float-right"><a-button size='small' class="blog-edit-btn" @click="editBlog">编辑</a-button></p>
                            </div>                    
                        </div>
                    </div>
                    <div class="blog-content quill-editor-content" v-html="blogData.content">
                    </div>
                </div>
            </div>
            <div class="comments">
                <a-comment>
                    <span slot="actions">回复</span>
                    <a slot="author">漩涡🌀</a>
                    <span slot="datetime" style="padding: 0 0 0 8px;cursor: auto;">1分钟前</span>
                    <a-avatar
                        slot="avatar"
                        :src="imgs.defaultAvatar"
                        alt="漩涡🌀"
                    />
                    <p slot="content">送我最美那朵水花，可以吗？</p>
                </a-comment>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/business/sidebar/index';
import defaultAvatar from '@/assets/images/default_avatar.jpg';

import util from '@/share/utils';
import {getBlogDetail} from '@/api/blog'
export default {
    name:'blog-detail',
    data(){
        return {
            blogData:{},
            imgs:{
                defaultAvatar,
            }
        }
    },
    created(){
        this.getBlogData();
    },
    methods:{
        editBlog(){
            let {blogOID} = this.$route.params;
            this.$router.push({path:`/blog/update/${blogOID}`})
        },
        //service
        getBlogData(){
            let {blogOID} = this.$route.params;
            getBlogDetail(blogOID).then(res => {
                res.lastUpdatedTime = util.dateFormat(res.lastUpdatedTime,'yyyy-MM-dd hh:mm:ss');
                this.blogData = res;
            }).catch(err => {
                console.log(err);
                this.$message({type:'error',text:err.errMsg})
            })
            
        }
    },
    components:{
        Sidebar,
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
                    color:#ffffff;
                }
            }
            .content{
                @include fb;
                width: 100%;
                color: #4d4d4d;
                padding-bottom: 40px;
                
                .content-right{
                    width: 70%;
                    background: #ffffff;
                    margin-left: 20px; 
                    .content-tips{
                        padding: 0 16px;
                        @include fb;
                        .blog-item{
                            width: 100%;
                            position: relative;
                            padding: 12px 0;
                            border-bottom: 1px solid #cccccc; 
                            .blog-title{
                                color: #4d4d4d;
                                font-size: 24px;
                                font-weight: 600;
                                word-break: break-all;
                                line-height: 30px;
                                margin-bottom: 6px;
                                .blog-type{
                                    display: inline-block;
                                    width: 30px;
                                    height: 30px;
                                    line-height: 30px;
                                    border-radius: 50%;
                                    box-sizing: border-box;
                                    font-weight: normal;
                                    margin-right: 8px;
                                    font-size: 16px;
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
                            .blog-item-footer{
                                @include fsc;
                                margin-top: 16px;
                                position:relative;
                                .blog-date,.blog-read-num,.blog-comment{
                                    font-size: 16px;
                                    line-height: 22px;
                                    color: #999;
                                    margin-right: 10px;
                                    .num{
                                        font-size: 16px;
                                        color: #3399ea;
                                    }
                                }
                                .blog-date{
                                    color: #6b6b6b;
                                }
                                .blog-edit-btn{
                                    position: absolute;
                                    right: 10px;
                                    top: 50%;
                                    transform: translate(0,-50%);
                                }
                            }
                        }
                    }
                    .blog-content{
                        padding: 20px 16px;
                        background: #ffffff;
                        font-size: 16px;
                    }
                    .blog-content >>> p{
                        font-size: 16px;
                        line-height: 20px;
                    }
                }
            }
            .comments{
                background: #ffffff;
                padding: 0 20px;
            }
        }
    }
</style>
