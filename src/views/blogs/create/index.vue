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
                <div class="categories-label">个人分类：</div>
                <!-- <xzh-select
                :mode="'multiple'"
                :list='categories'
                :selected='selectedBlogCategroy'
                @selected='handleselectedCategroy'
                :box-style="{width:'400px'}"
                >
                </xzh-select> -->
                <a-select
                    :value="blogCategory"
                    style="width: 200px"
                    @change="handleselectedCategroy"
                >
                <a-select-option v-for="item in categories" :key="item.name" :value="item.categoryOID">
                    {{item.name}}
                </a-select-option>
                </a-select>
            </div>
            <div class="categories">
                <div class="categories-label">文章类型：</div>
                <!-- <xzh-select
                :list='articleType'
                :show-clear='true'
                :selected='selectedBlogType'
                @selected='handleselectedType'
                :box-style="{width:'400px'}"
                >
                </xzh-select> -->
                <a-select
                    :defaultValue="1"
                    :value='blogType'
                    style="width: 200px"
                    @change="handleselectedType"
                >
                <a-select-option v-for="item in articleType" :key="item.value" :value="item.value">
                    {{item.showValue}}
                </a-select-option>
                </a-select>
            </div>
            <div class="categories">
                <div class="categories-label">私人文章：</div>
                <!-- <xzh-switch
                v-model="isPrivate"
                >
                </xzh-switch> -->
                <a-switch v-model="isPrivate"></a-switch>
            </div>
        </div>
        <div class="blog-footer">
            <a-button
            :type="'primary'"
            :loading='submitLoading'
            @click="submitHandle"
            >
                {{mode === 'create' ? '发布文章' : '更新文章'}}
            </a-button>
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

import {createNewBlog, getBlogDetail, updateBlog, getCategories} from '@/api/blog';
import util from '@/share/utils'
//todo 把個人分類這裡弄完 今天不想弄了 07-01
export default {
    name:'newBlog',
    data(){
        return{
            maxTitleLength:100, //blog 标题最多字符数
            title:'', //博客标题
            editorOption: {}, //富文本参数
            content:'', //富文本内容
            categories:[ // 个人分类
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
            blogCategory:'', //博客所属分类
            blogType:1, //博客所属类型
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
        },
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
            //console.log('editor change!', editor, html, text)
        },
        handleselectedCategroy(selected){
            console.log(selected);
            this.blogCategory = selected
        },
        handleselectedType(selected){
            console.log(selected);
            this.blogType = selected;
        },
        checkSubmitData(data){
            let errFlag = false;
            let errMsg = '';
            if(!data.title){
                errFlag = true;
                errMsg = '请输入文章标题';
            }
            else if(!data.content){
                errFlag = true;
                errMsg = '请输入文章内容';
            }
            else if(!data.type){
                errFlag = true;
                errMsg = '请选择文章类型';
            }
            else if(!data.category){
                errFlag = true;
                errMsg = '请选择至少一个分类';
            }
            return {
                errFlag,
                errMsg
            }
        },
        submitHandle(){ 
            let data = {
                title:this.title,
                content:this.content,
                type:this.blogType,
                category:this.blogCategory,
                private:Number(this.isPrivate)
            };
            let checkResult = this.checkSubmitData(data);
            if(checkResult.errFlag){
                this.$message({type:'error',text:checkResult.errMsg})
                return;
            }
            else{
                this.submitLoading = true;
                if(this.mode === 'create'){
                    createNewBlog(data).then(res => {
                        console.log(res);
                        this.$message({type:'success',text:res.errMsg})
                        this.submitLoading = false;
                        this.$router.push({name:'blogList'});
                    }).catch(err => {
                        console.log(err);
                        this.$message({type:'error',text:err.errMsg})
                        this.submitLoading = false;
                    });
                }
                else{
                    data.blogOID = this.blogDetailData.blogOID;
                    data.lastUpdatedTime = util.dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
                    updateBlog(data).then(res => {
                        console.log(res);
                        this.$message({type:'success',text:res.errMsg})
                        this.submitLoading = false;
                        this.$router.push({name:'blogList'});
                    }).catch(err => {
                        console.log(err);
                        this.$message({type:'error',text:err.errMsg})
                        this.submitLoading = false;
                    });
                }
            } 
        },
        updateMode(){
            getBlogDetail(this.$route.params.blogOID).then(res => {
                console.log(res);
                this.blogDetailData = res;
                this.title = res.title;
                this.content = res.content;
                this.isPrivate = Boolean(res.private);
                this.blogType = res.type;
                this.blogCategory = res.category[0].categoryOID;
            }).catch(err => {
                console.log(err);
            })
        },
        getCategories(){
            getCategories().then(res => {
                this.categories = res.data;
            }).catch(err => {
                this.$message({type:'error',text:res.errMsg});
            })
        },
    },
    created(){
        this.getCategories();
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
        .categories-label{
            margin-right: 6px;
        }
    }
    .blog-footer{
        margin-top: 20px;
    }
    
}
</style>
