<template>
    <div class="new-blog-wrapper">
        <div class="blog-title">
            <input type="text" class="title" placeholder="输入文章标题" v-model="title" @input='handleTitle'>
            <div class="title-length">{{ titleLength }}/{{ maxTitleLength }}</div>
        </div>
        <div class="blog-content">
            <quill-editor ref="blogQuillEditor"
            v-model="content" 
            :options="editorOption"
            @change="onEditorChange($event)">
            </quill-editor>
        </div>
        <div class="blog-category">
            <div class="categories">
                <div class="categroies-label">个人分类：</div>
                <xzh-select
                :mode="'multiple'"
                :list='categroies'
                :selected='selectedBlogCategroy'
                @selected='handleselectedCategroy'
                :box-style="{width:'400px'}"
                >
                </xzh-select>
            </div>
            <div class="categories">
                <div class="categroies-label">文章类型：</div>
                <xzh-select
                :list='articleType'
                :show-clear='true'
                :selected='selectedBlogType'
                @selected='handleselectedType'
                :box-style="{width:'400px'}"
                >
                </xzh-select>
            </div>
            <div class="categories">
                <div class="categroies-label">私人文章：</div>
                <xzh-switch
                v-model="isPrivate"
                >
                </xzh-switch>
            </div>
        </div>
        <div class="blog-footer">
            <xzh-button
            :type="'primary'"
            :size="'default'"
            :loading='submitLoading'
            @click="submitBlog"
            >
            <span>{{mode === 'create' ? '发布文章' : '更新文章'}}</span>
            </xzh-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import xzhSelect from '@/components/base/select/index';
import xzhSwitch from '@/components/base/switch/index';
import xzhButton from '@/components/base/button/index';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import {createNewBlog, getBlogDetail, updateBlog} from '@/api/blog';
import util from '@/share/utils'

export default {
    name:'newBlog',
    data(){
        return{
            maxTitleLength:100, //blog 标题最多字符数
            title:'', //博客标题
            editorOption: {}, //富文本参数
            content:'', //富文本内容
            categroies:[ // 个人分类
                {
                    value:1,
                    showValue:'vue',
                    active: false,
                },
                {
                    value:2,
                    showValue:'react',
                    active: false,
                },
                {
                    value:3,
                    showValue:'angular',
                    active: false,
                },
            ],
            articleType: [ //文章类型
                {
                    value:1,
                    showValue:'原创',
                    active: false,
                },
                {
                    value:2,
                    showValue:'转载',
                    active: false,
                },
                {
                    value:3,
                    showValue:'翻译',
                    active: false,
                },
            ],
            isPrivate: false, //私人文章
            submitLoading: false, //发布时 btn loading
            blogCategroy:[], //博客所属分类
            blogType:{}, //博客所属类型
            selectedBlogType:[], //已选中的博客类型 updateMode用
            selectedBlogCategroy:[],//已选中的博客分类 updateMode用
            mode:'create',
            blogDetailData:{}
        }
    },
    computed:{
        titleLength(){
            let { title } = this;
            return title ? title.length : 0;
        },
        editor() {
            return this.$refs.blogQuillEditor.quill
        }
    },
    methods:{
        handleTitle(){
            let { title, maxTitleLength } = this;
            if(title.length > maxTitleLength){
                let messageInfo = {
                    type:'warning',
                    text:'文章标题最多100字',
                }
                this.$message(messageInfo);
                this.title = title.substring(0,100);
            }
        },
        onEditorChange({editor, text, html}){
            console.log('editor change!', editor, html, text)

        },
        handleselectedCategroy(selectedList){
            //console.log(selectedList);
            this.blogCategroy = selectedList
        },
        handleselectedType(selectedList){
            //console.log(selectedList);
            this.blogType = selectedList[0];
        },
        submitBlog(){
            this.submitLoading = true;
            let data = {
                title:this.title,
                content:this.content,
                type:this.blogType.value,
                categroy:this.blogCategroy,
                private:Number(this.isPrivate)
            };
            if(this.mode === 'create'){
                createNewBlog(data).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
            }
            else{
                data.blogOID = this.blogDetailData.blogOID;
                data.lastUpdatedTime = util.formatDate(new Date(),'yyyy-MM-dd hh:mm:ss');
                updateBlog(data).then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                });
            }
            
        },
        updateMode(){
            getBlogDetail(this.$route.params.blogOID).then(res => {
                console.log(res);
                this.blogDetailData = res;
                this.title = res.title;
                this.content = res.content;
                this.isPrivate = Boolean(res.private);
                this.selectedBlogType = this.articleType.filter(type => type.value == res.type);
                this.selectedBlogCategroy = this.categroies.filter(categroy => categroy.value == res.categroy)
            }).catch(err => {
                console.log(err);
            })
        }
    },
    created(){
        if(this.$route.params.blogOID){
            this.mode = 'update';
            this.updateMode()
        }
    },
    mounted(){
        this.editor.container.style.height = '700px';
    },
    components:{
        quillEditor,
        xzhSelect,
        xzhSwitch,
        xzhButton,
    }
}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin';
.new-blog-wrapper{
    width: 100%;
    height: 100%;
    background: #ffffff;
    padding: 24px;
    min-height: 1200px;
    .blog-title{
        height: 40px;
        line-height: 40px;
        background: #efefef;
        color: #4f4f4f;
        @include fac;
        .title{
            width: 90%;
            outline: none;
            border: none;
            background: none;
            font-size: 16px;
        }
    }
    .blog-content,.blog-category{
        margin-top: 24px;
    }

    .categories{
        @include fsc;
        height: 32px;
        margin-top: 10px;
        .categroies-label{
            margin-right: 6px;
        }
    }
    
}
</style>
