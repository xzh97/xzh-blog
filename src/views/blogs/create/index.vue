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
                @selected='handleselectedItems'
                :box-style="{width:'400px'}"
                >
                </xzh-select>
            </div>
            <div class="categories">
                <div class="categroies-label">文章类型：</div>
                <xzh-select
                :list='articleType'
                @selected='handleselectedItems'
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
            @click="createNewBlog"
            >发布博客</xzh-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import xzhSelect from '../../../components/base/select/index';
import xzhSwitch from '../../../components/base/switch/index';
import xzhButton from '../../../components/base/button/index';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { setTimeout } from 'timers';

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
                },
                {
                    value:2,
                    showValue:'react',
                },
                {
                    value:3,
                    showValue:'angular',
                },
            ],
            articleType: [ //文章类型
                {
                    value:1,
                    showValue:'原创',
                },
                {
                    value:2,
                    showValue:'转载',
                },
                {
                    value:3,
                    showValue:'翻译',
                },
            ],
            isPrivate: false, //私人文章
            submitLoading: false, //发布时 btn loading
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
        handleselectedItems(selectedList){
            //console.log(selectedList);
        },
        createNewBlog(){
            this.submitLoading = true;
            setTimeout(()=>{
                this.$message({ type:'success', text:'创建成功' });
                this.submitLoading = false;
                this.$router.push({name:'blogList'})
            },2000)
            console.log('111');
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
            padding-left: 16px;
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
