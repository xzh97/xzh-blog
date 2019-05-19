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
                <xzh-select
                :list='categroies'
                @selected='handleselectedItems'
                >
                </xzh-select>
            </div>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import xzhSelect from '../../../components/base/select/index'
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

export default {
    name:'newBlog',
    data(){
        return{
            maxTitleLength:100,
            title:'',
            editorOption: {},
            content:'',
            categroies:[
                {
                    value:1,
                    showValue:'vuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevuevue',
                    active:false,
                },
                {
                    value:2,
                    showValue:'react',
                    active:false,
                },
                {
                    value:3,
                    showValue:'angular',
                    active:false,
                },
            ],
            isShowCategroies:false,
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
        updateIsShowCategories(flag){
            this.isShowCategroies = flag;
        },
        handleselectedItems(selectedList){
            //console.log(selectedList);
        }
    },
    mounted(){
        this.editor.container.style.height = '700px';
    },
    components:{
        quillEditor,
        xzhSelect
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
    .blog-category{
        margin-top: 24px;
    }
}
</style>
