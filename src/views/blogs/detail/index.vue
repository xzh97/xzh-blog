<template>
    <div class="blog-wrapper">
        <h2 class="blog-title">{{ blogData.title }}</h2>
        <!-- <ul class="blog-toolbar">
            <li class="toolbar-item"></li>
        </ul> -->
        <!-- <div class="blog-tag">
            <div class="tag-item"></div>
        </div> -->
        <div class="blog-content quill-editor-content" v-html="blogData.content">
        </div>
        <div class="comment-area" ref="commentArea">
            <h4 class="comment-title">发表评论</h4>
            <div class="comment-item">
                <input v-model="commentAuthor" type="text" class="item-input comment-author">
                <span class="item-title">名字(必填)</span>
            </div>
            <div class="comment-item">
                <input v-model="commentEmail" type="email" class="item-input comment-email">
                <span class="item-title">电子邮箱(不会被公开)(必填)</span>
            </div>
            <div class="comment-item">
                <textarea v-model="commentContent" :placeholder="commentPlaceholder" class="comment-content" rows="4"></textarea>
            </div>
            <div class="comment-item">
                <xzh-button type="primary" @click="addComment">发表评论</xzh-button>
            </div>
        </div>
        <div class="comments-list">
        </div>
    </div>
</template>

<script>
import xzhButton from '@/components/base/button/index';
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
            replyCommentOid:''
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
         * @param {Boolean} isChild 是否为回复子评论
         */
        replyComment(comment,isChild){
            this.isReply = true;
            this.$refs.commentArea.scrollIntoView();
            this.commentPlaceholder = `回复 @${comment.author}:`;
            this.replyCommentOid = comment.parentOid || comment.commentOid;

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
        }
    },
    components:{
        xzhButton,
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
        .quill-editor-content{
            letter-spacing: .6px;

            p{
                
            }
        }
    }
</style>
