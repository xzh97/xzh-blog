<template>
    <div class="comment-wrapper">
        <div class="comment-inner">
            <div class="comment-avatar">
               <avatar :show-border-bottom="false"></avatar>
            </div>
            <div class="comemnt-content">
                <p>
                    <span class="comment-author">{{commentData.author}}</span>&nbsp;&nbsp;
                    <span v-if="commentData.replyCommentAuthor" class="reply-comment-author">{{'回复: @'+ commentData.replyCommentAuthor}}</span>&nbsp;&nbsp;
                    <span class="comment-datetime">{{commentData.createTime}}</span>
                </p>
                <p class="comment-content-detail">{{commentData.content}}</p>
                <div class="comment-actions">
                    <slot name='action'>
                        <span :key="action.key" v-for="action in actions" class="action-item" @click='handleAction(action)'>{{action.title}}</span>
                    </slot>
                </div>
                <div class="child-comment">
                    <slot name='children'></slot>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
/**
 * @desc slot 作用
 * avatar 头像
 * author 评论者
 * content 评论内容
 * action 动作 默认只有回复
 * date 评论时间
 */
import avatar from '@/components/base/avatar/index';
export default {
    name:'comment',
    props:{
        commentData:{
            type:Object,
            default(){
                return {}
            }
        },
    },
    data(){
        return {
            actions:[
                {
                    title:'回复',
                    key:'reply',
                }
            ]
        }
    },
    methods:{
        handleAction(action){
            this.$emit('action-click',action.key,this.commentData);
        }
    },
    components:{
        avatar,
    }
}
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';
.comment-wrapper{
    margin-top: 20px;
    padding: 10px;
    border-bottom: 1px dashed $border-color-base;
    .comment-inner{
        width: 100%;
        @include fb;
        .comemnt-content{
            flex: 1 0;
            .comment-author, .comment-datetime{
                color: #aaa;
            }
            .comment-author, .comment-datetime, .comment-content-detail, .reply-comment-author{
                line-height: 1.5;
            }
            .comment-author,.reply-comment-author{
                background: #dddddd;
                padding: 1px 3px;
                font-size: 14px;
                font-weight: 700;
                border-radius: $border-radius-base;
                display: inline-block;
                color: #aaa;
            }
            .reply-comment-author{
                font-weight: normal;
            }
            .comment-content-detail{
                word-wrap: break-word;
                word-break: break-all;
                color: #000;
            }
            .comment-actions{
                .action-item{
                    cursor: pointer;
                    display: inline-block;
                    margin-left: 6px;
                }
                .action-item:nth-of-type(1){
                    margin-left: 0;
                }
                .action-item:hover{
                    color: $primary-color;
                    transition: all .36s;
                }
            }
        }
        .child-comment{
            /* margin-left: 10px; */
            .comment-wrapper{
                border-bottom: none;
                border-top: 1px dashed $border-color-base;
            }

        }
    }
    
}
</style>
