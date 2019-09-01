<template>
    <div class="blog-wrapper">
        <h2 class="blog-title">{{ blogData.title }}</h2>
        <!-- <ul class="blog-toolbar">
            <li class="toolbar-item"></li>
        </ul> -->
        <!-- <div class="blog-tag">
            <div class="tag-item"></div>
        </div> -->
        <div class="blog-content quill-editor-content" v-html="blogData.content"></div>
        <div class="blog-signature">
            <p>本文由 Winter Sweet 创作，采用  <a class="link" target="_blank" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0</a>  国际许可协议进行许可。</p>   
            <p>可自由转载、引用，但需署名作者且注明文章出处。</p>
        </div>
        <div class="comment-area" ref="commentArea">
            <h4 class="comment-title">说点什么?</h4>
            <div class="comment-item">
                <input v-model="commentAuthor" placeholder="昵称(required)" type="text" class="item-input comment-author">
                <!-- <span class="item-title">名字(必填)</span> -->
            </div>
            <div class="comment-item">
                <input v-model="commentEmail" placeholder="电子邮箱(必填 不公开)" type="email" class="item-input comment-email">
                <!-- <span class="item-title">电子邮箱(不会被公开)(必填)</span> -->
            </div>
            <div class="comment-item">
                <textarea v-model="commentContent" :placeholder="commentPlaceholder" class="item-input comment-content" rows="4"></textarea>
            </div>
            <div class="comment-item">
                <button class="comment-btn" @click="addComment">发表评论</button>
            </div>
        </div>
    
        <comment :key='comment.commentOid' v-for="comment in blogData.comments" :comment-data="comment" @action-click='handleCommentActionClick'>
            <template v-if="comment.children.length" slot="children">
                <comment :key='childComment.commentOid' v-for="childComment in comment.children" :comment-data="childComment" @action-click='handleCommentActionClick'></comment>
            </template>
        </comment>
    </div>
</template>

<script>
import xzhButton from '@/components/base/button/index';
import comment from '@/components/base/comment/index';
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
            isReply:false, //是否是回复
            commentPlaceholder:'留下你的评论吧',
            replyCommentOid:'',
        }
    },
    created(){
        this.getBlogData();
    },
    methods:{
        editBlog(){
            let {blogOid} = this.$route.params;
            this.$router.push({path:`/blog/update/${blogOid}`})
        },
        //service
        getBlogData(){
            let {blogOid} = this.$route.params;
            getBlogDetail(blogOid).then(res => {
                res.lastUpdatedTime = util.dateFormat(res.lastUpdatedTime,'yyyy-MM-dd hh:mm:ss');
                this.blogData = res;
                this.blogData.comments.forEach(comment => {
                    comment.createTime = util.dateFormat(comment.createTime,'yyyy-MM-dd hh:mm:ss');
                    comment.children.length && comment.children.map(item => item.createTime = util.dateFormat(item.createTime,'yyyy-MM-dd hh:mm:ss'));
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
        /**
         * @param {Object} comment 回复的评论信息
         */
        replyComment(comment){
            this.isReply = true;
            this.commentPlaceholder = `回复 @${comment.author}:`;
            this.replyCommentOid = comment.parentOid || comment.commentOid;
            this.$refs.commentArea.scrollIntoView();
        },
        addComment(){
            let result = this.checkComment();
            if(result.errFlag){
                this.$message({type:'error',text:result.errMsg});
                return;
            }
            let {commentContent, commentAuthor, commentEmail, isReply} = this;
            let postData = {
                content:commentContent,
                blogOid:this.$route.params.blogOid,
                author:commentAuthor,
                email:commentEmail
            };
            postData.parentOid = this.replyCommentOid;
            addNewComment(postData).then(res => {
                console.log(res);
                this.$message({type:'success',text:res.errMsg});
                this.getBlogData();

                //评论信息
                this.commentContent = '';
                this.commentAuthor = '';
                this.commentEmail='';

                //回复信息
                this.isReply = false;
                this.replyCommentOid = '';
            }).catch(err => {
                console.log(err);
                this.$message({type:'error',text:err.errMsg})
            })
        },
        handleCommentActionClick(key,comment){
            switch(key){
                case 'reply':
                    this.replyComment(comment);
                    break;
                default:
                    console.warn(`The key : ${key}`)
            }
        }
    },
    components:{
        xzhButton,
        comment
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';
    .blog-wrapper{
        width: 100%;
        h1,h2,h3,h4,h5,h6{
            color: $text-color;
        }
        .blog-title{
            font-size: 35px;
        }
        .blog-signature{
            box-shadow: $box-shadow-base;
            background: rgba(237, 238, 238, 0.7);
            font-size: 14px;
            margin: 0 0 10px;
            padding: 20px;
            p:nth-of-type(2){
                margin-top: 10px;
            }
            .link{
                color: $title-color;
                text-decoration:none;
            }
            .link:hover{
                text-decoration: underline
            }
        }
        .comment-area{
            margin-top: 30px;
            .comment-item{
                //height: 36px;
                margin-top: 10px;

                .item-input{
                    width: 100%;
                    padding:10px 6px;
                    background: none;
                    border-radius: $border-radius-base;
                    border: 1px solid $border-color-base;
                    font-size: 14px;
                    text-indent: 1em;
                    box-sizing: border-box;
                    outline: none;
                }
                .item-input::-webkit-input-placeholder{
                    color: #bbbbbb;
                }
                .item-input:hover{
                    border: 1px solid #888888;
                }
                .comment-btn{
                    width: 160px;
                    //padding: 10px 6px;
                    padding: 10px 15px;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 1.4;

                    color: #fff;
                    background-color: #34495e;
                    border-radius: $border-radius-base;
                    border: 1px solid #34495e;
                    outline: none;

                    cursor: pointer;
                }
                .comment-btn:hover{
                    opacity: .8; 
                    transition: all .36s;
                }
            }
            
            
        }
        .comments-list{
            
        }
    }
</style>
