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
            <div class="comment-area">
                <div class="comment-item">
                    <input v-model="commentAuthor" type="text" class="item-input comment-author">
                    <span class="item-title">名字(必填)</span>
                </div>
                <div class="comment-item">
                    <input v-model="commentEmail" type="email" class="item-input comment-email">
                    <span class="item-title">电子邮箱(不会被公开)(必填)</span>
                </div>
                <div class="comment-item">
                    <textarea v-model="commentContent" class="comment-content" rows="4"></textarea>
                </div>
                <div class="comment-item">
                    <a-button type="primary" @click="addComment">发表评论</a-button>
                </div>
            </div>
            <div class="comments-list">
                <a-comment v-for="comment in blogData.comments" :key="comment.commentOID">
                    <span slot="actions">回复</span>
                    <a slot="author">{{comment.author}}</a>
                    <span slot="datetime" style="padding: 0 0 0 8px;cursor: auto;">{{comment.createTime}}</span>
                    <a-avatar
                        slot="avatar"
                        :src="imgs.defaultAvatar"
                        :alt="comment.author"
                    />
                    <p slot="content">{{comment.content}}</p>
                    <a-comment v-for="childComment in comment.children" :key="childComment.commentOID">
                        <span slot="actions">回复</span>
                        <a slot="author">{{childComment.author}}</a>
                        <span slot="datetime" style="padding: 0 0 0 8px;cursor: auto;">{{childComment.createTime}}</span>
                        <a-avatar
                            slot="avatar"
                            :src="imgs.defaultAvatar"
                            :alt="childComment.author"
                        />
                        <p slot="content">{{childComment.content}}</p>
                    </a-comment>
                </a-comment>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '@/components/business/sidebar/index';
import defaultAvatar from '@/assets/images/default_avatar.jpg';

import util from '@/share/utils';
import {getBlogDetail, addNewComment} from '@/api/blog'
export default {
    name:'blog-detail',
    data(){
        return {
            blogData:{},
            imgs:{
                defaultAvatar,
            },
            commentContent:'',
            commentAuthor:'',
            commentEmail:'',
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
                this.blogData.comments.forEach(comment => {
                    comment.createTime = util.dateFormat(comment.createTime,'yyyy-MM-dd hh:mm:ss');
                    comment.children = comment.children || [];
                })
            }).catch(err => {
                console.log(err);
                this.$message({type:'error',text:err.errMsg})
            })
            
        },
        checkComment(){
            let {commentContent, commentAuthor, commentEmail} = this;
            let error = {
                errMsg:'',
                errFlag: false,
            };
            if(!commentAuthor){
                error.errFlag = true;
                error.errMsg = '名称未填写';
                return error;
            }

            if(!commentEmail){
                error.errFlag = true;
                error.errMsg = '电子邮箱未填写';
                return error;
            }
            else{
                let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if(!reg.test(commentEmail)){
                    error.errFlag = true;
                    error.errMsg = '请填写正确的电子邮箱';
                    return error;
                }
            }

            if(!commentContent){
                error.errFlag = true;
                error.errMsg = '内容未填写';
                return error;
            }
            return error;

        },
        addComment(isReply){
            let result = this.checkComment();
            if(result.errFlag){
                this.$message({type:error,text:result.errMsg});
                return;
            }
            let {commentContent, commentAuthor, commentEmail} = this;
            let postData = {
                content:commentContent,
                blogOID:this.$route.params.blogOID,
                author:commentAuthor,
                email:commentEmail
            };
            if(isReply){
                postData.parentOID = '';
            }
            addNewComment(postData).then(res => {
                console.log(res);
                this.$message({type:'success',text:res.errMsg})
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
@import '@/styles/mixin.scss';
    .blogs-wrapper{
        width: 100%;
        height: 100%;
        min-height: 1000px;
        background: url('../../../assets/images/bg3.jpg') repeat-y;
        background-size: 100%;

        display: flex;
        justify-content: center;

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
                padding-bottom: 20px;
                
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
            .comment-area{
                padding: 10px 20px;
                margin: 1px 0;
                background: #ffffff;
                .comment-item{
                    min-height: 32px;
                    margin-top: 19px;
                    .item-title{
                        font-size: 12px;
                        margin-left: 10px;
                    }
                    .item-input{
                        outline: none;
                        background: none;
                        border: 1px solid #d9d9d9;
                        vertical-align: middle;
                        height: 30px;
                        line-height: 30px;
                        font-size: 16px;
                        padding-left: 8px;
                    }
                    .comment-content{
                        width: 50%;
                        padding: 5px 10px;
                        vertical-align: middle;
                        line-height: 24px;
                        color:$text-color;
                        border-radius: 4px;
                        border: 1px solid #d9d9d9;
                        outline: none;
                        margin-bottom: 10px;
                    }
                }

            }
            .comments-list{
                background: #ffffff;
                padding: 0 20px;
            }
        }
    }
</style>
