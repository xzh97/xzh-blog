<template>
    <div class="blog-wrapper">
        <h2 class="blog-title" id="blog-title">{{ blogData.title }}</h2>
        <!-- <ul class="blog-toolbar">
            <li class="toolbar-item"></li>
        </ul> -->
        <!-- <div class="blog-tag">
            <div class="tag-item"></div>
        </div> -->
        <div class="blog-updated" v-if="!!blogData.updateDiffDays">此文章于{{blogData.updateDiffDays}}天前进行了修改，内容发生变动</div>
        <div class="blog-content quill-editor-content ql-snow">
            <div class="ql-editor" v-html="blogData.content" @click="handleImgClick"></div>
        </div>
        <div class="blog-signature">
            <p>本文由 Winter Sweet 创作，采用  <a class="link" target="_blank" href="https://creativecommons.org/licenses/by/4.0/">知识共享署名 4.0国际许可协议</a> 进行许可。</p>
            <p>可自由转载、引用，但需署名作者且注明文章出处。</p>
        </div>
        <div class="comment-area" ref="commentArea">
            <h4 class="comment-title">说点什么? <span v-if="isReply" class="cancel-reply" @click="cancelReply">取消回复</span></h4>
            <div class="comment-item">
                <input v-model="commentAuthor" placeholder="昵称(必填)" type="text" class="item-input comment-author">
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

        <comment id="blog-comments" :key='comment.commentOid' v-for="comment in blogData.comments" :comment-data="comment" @action-click='handleCommentActionClick'>
            <template v-if="comment.children.length" slot="children">
                <comment :key='childComment.commentOid' v-for="childComment in comment.children" :comment-data="childComment" @action-click='handleCommentActionClick'></comment>
            </template>
        </comment>

        <div class="blog-directory" :style="directoryStyle">
            <div class="blog-directory-item" v-for="item in directory" :key="item.id">
                <a :href="'#'+item.id" @click="handleDirectoryClick($event,item)">
                    <span :class="[item.tag + '-title']" >{{ item.hash }}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import xzhButton from '@/components/base/button/index';
import comment from '@/components/base/comment/index';
import defaultAvatar from '@/assets/images/default_avatar.jpg';
import 'quill/dist/quill.snow.css';

import util from '@/share/utils';
import moment from 'moment';
import {imgMixin} from '@/share/mixin';
import {getBlogDetail, addNewComment} from '@/api/blog';
import {mapMutations} from 'vuex'

export default {
    name:'blog-detail',
    mixins:[imgMixin],
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
            replyCommentAuthor:'',
            directory:[
                {
                    hash:'标题',
                    tag:'blog-title',
                    id:'blog-title'
                },
            ], //文章目录
            directoryStyle:{},
        }
    },
    created(){
        this.getBlogData();
    },
    mounted(){
        this.updateDirectoryStyle();
        window.addEventListener('resize',this.updateDirectoryStyle)
    },
    methods:{
        ...mapMutations([
            'setIsShowLoading',
        ]),
        getBlogData(){
            let {blogOid} = this.$route.params;
            getBlogDetail(blogOid).then(res => {
                res.updateDiffDays = moment().diff(moment(res.lastUpdatedTime),'days');
                this.directory = [
                    {
                        hash:'标题',
                        tag:'blog-title',
                        id:'blog-title'
                    },
                ];
                this.blogData = res;
                this.blogData.comments.length && this.blogData.comments.forEach(comment => {
                    comment.createTime = moment(comment.createTime).fromNow();
                    comment.children.length && comment.children.map(item => item.createTime = moment(item.createTime).fromNow());
                });
                this.getBlogDirectory();
            }).catch(err => {
                console.log(err);
                this.$message({type:'error',text:err.errMsg})
            }).finally(res => {
                this.setIsShowLoading(false);
            })

        },
        getBlogDirectory(){
            let { content } = this.blogData;
            let reg = /<(h\d).*?>.*?<\/h\d>/g;
            let count = 0;
            content = content.replace(reg, (match, tag) => {
                count ++;
                const hash = match.replace(/<.*?>/g, '');
                const anchorId = `anchor-${count}`;
                this.directory.push({ hash, tag, id: anchorId });
                return `<${tag} id="${anchorId}">${hash}</${tag}>`;
            });
            this.blogData.comments.length && this.directory.push({
                hash:'评论',
                tag:'blog-comments',
                id:'blog-comments'
            });
            this.blogData.content = content;
        },
        handleDirectoryClick(ev,item){
            console.log(ev);
            console.log(item);
            ev.preventDefault();
            document.querySelector(`#${item.id}`).scrollIntoView({
                behavior: "smooth",
            });
        },
        checkComment(){
            let {commentContent, commentAuthor, commentEmail} = this;
            let error = {
                errMsg:'',
                errFlag: false,
            };
            if(!commentAuthor){
                error.errFlag = true;
                error.errMsg = '昵称未填写';
                return error;
            }

            if(!commentEmail){
                error.errFlag = true;
                error.errMsg = '电子邮箱未填写';
                return error;
            }
            else{
                /*let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;*/
                //eslint上 \-会报错 先看下这样改有没有问题
                let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
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
                email:commentEmail,
            };

            postData.parentOid = isReply ? this.replyCommentOid : null;
            postData.replyCommentAuthor = isReply ? this.replyCommentAuthor : null;
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
        },
        /**
         * @param {Object} comment 回复的评论信息
         */
        replyComment(comment){
            this.isReply = true;
            this.commentPlaceholder = `回复 @${comment.author}:`;
            this.replyCommentOid = comment.parentOid || comment.commentOid;
            this.replyCommentAuthor = comment.author;
            this.$refs.commentArea.scrollIntoView();
        },
        cancelReply(){
            this.isReply = false;
            this.commentPlaceholder = '留下你的评论吧';
            this.replyCommentAuthor = '';
            this.replyCommentOid = '';
        },
        updateDirectoryStyle(){
            let clientWidth = document.querySelector('body').clientWidth;

            if(clientWidth > 1210){
                this.directoryStyle = {
                    width: 200 + 'px',
                    right: (clientWidth - 750)/2 - 240 + 'px',
                }
            }
            else{
                this.directoryStyle = {
                    display:'none'
                }
            }
        }
    },
    beforeDestroy(){
        this.directory = [];
        window.removeEventListener('resize',this.updateDirectoryStyle)
    },
    beforeRouteResolve (to, from, next) {
        this.setIsShowLoading(false);
        next();
    },
    beforeRouteLeave (to, from, next) {
        this.setIsShowLoading(true);
        next();
    },
    components:{
        xzhButton,
        comment
    }
}
</script>

<style lang='scss'>
@import '@/styles/mixin.scss';
    .blog-wrapper{
        width: 100%;
        position: relative;
        h1,h2,h3,h4,h5,h6{
            color: $text-color;
        }
        .blog-title{
            font-size: 2em;
            color: $title-color;
        }
        .blog-updated{
            background-color: rgba(252, 228, 236, 0.6313725490196078);
            color: rgba(255, 82, 82, 0.8);
            font-size: .8em;
            margin: 20px 0 0;
            padding: 10px 6px;
            border-radius: $border-radius-base;
            box-shadow: $box-shadow-base;
        }
        /* 富文本内容样式 */
        .quill-editor-content{
            .ql-editor h1, .ql-editor h2, .ql-editor h3{
                margin-top: 30px;
                margin-bottom: 15px;
            }
            h1{
                font-size: 2em;
            }
            h2{
                font-size: 1.5em;
            }
            h3{
                font-size: 1.25em;
            }
            li{
                margin-bottom: 15px;
            }
            .ql-editor pre.ql-syntax{
                background-color: #f9f9f9 !important;
                color:$text-color !important;
            }
            .ql-editor code{
                color: $link-color;
                background-color: rgba(252, 228, 236, 0.6313725490196078);
            }
            .ql-editor p {
                line-height: 1.6;
                margin-bottom: 15px;
                color: $text-color;
                img{
                    box-shadow:0 2px 15px 1px rgba(0,0,0,0.03);
                    transition: all .36s;
                    max-width: 100%;
                    border-radius: $border-radius-base;

                }
                img:hover{
                    cursor: zoom-in;
                    box-shadow: 0 0 5px $primary-color;
                    transform: scale(1.03);
                    transition: all .36s;
                }
            }
            .ql-editor a{
                color: $link-color;
            }
        }
        .blog-signature{
            box-shadow: $box-shadow-base;
            background: rgba(237, 238, 238, 0.7);
            font-size: .9em;
            margin: 0 0 10px;
            padding: 20px;
            p:nth-of-type(2){
                margin-top: 10px;
            }
            .link{
                color: $link-color;
                text-decoration:none;
            }
            .link:hover{
                text-decoration: underline
            }
        }
        .comment-area{
            margin-top: 30px;
            .cancel-reply{
                text-decoration: underline;
                display: inline-block;
                margin-left: 10px;
            }
            .cancel-reply:hover{
                color: $link-color;
                cursor: pointer;
            }
            .comment-item{
                //height: 36px;
                margin-top: 10px;

                .item-input{
                    width: 100%;
                    padding:10px 6px;
                    background: none;
                    border-radius: $border-radius-base;
                    border: 1px solid $border-color-base;
                    font-size: .9em;
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
        .blog-directory{
            position: fixed;
            //right: 300px;
            top: 100px;
            border-left: 1px solid #cccccc;
            padding: 10px;
            display: inline-block;
            .blog-directory-item{
                line-height: 1.2;
                .h1-title,.blog-title-title,.blog-comments-title{
                    font-size: .9em;
                }
                .blog-title-title::before,
                .blog-comments-title::before,
                .h1-title::before{
                    content:'#';
                    color: $link-color;
                    margin-right: 4px;
                }

                .h2-title{
                    font-size: .8em;
                    text-indent: .6em;
                }
                .h2-title::before{
                    content: "";
                    margin-right: 4px;
                }
                .blog-title-title{
                    margin-bottom: 2px;
                }
                .blog-comments-title{
                    margin-top: 2px;
                }
                span{
                    display: inline-block;
                }
                a{
                    text-decoration: none;
                    cursor: pointer;
                }
            }
            .blog-directory-item:hover {
                span{
                    background-color: rgba(252, 228, 236, 0.6313725490196078);
                }
            }
        }
    }
</style>
