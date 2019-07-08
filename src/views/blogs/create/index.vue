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
                <a-select
                    v-model="blogCategory"
                    style="width: 200px"
                    @change="handleCategoryChange"
                >
                    <a-select-option v-for="item in categories" :key="item.categoryOID" :value="item.categoryOID">
                        {{item.name}}
                    </a-select-option>
                </a-select>
            </div>

            <!-- <div class="categories">
                <div class="categories-label">文章类型：</div>
                <a-select
                    defaultValue='1'
                    v-model='blogType'
                    style="width: 200px"
                    @change="handleTypeChange2"
                >
                    <a-select-option v-for="item in articleType" :key="item.key" :value="item.value">
                        {{item.label}}
                    </a-select-option>
                </a-select>
            </div> -->

            <div class="categories">
                <div class="categories-label">文章类型：</div>
                <a-radio-group :options="articleType" @change="handleTypeChange" :defaultValue="1" />
            </div>

            <div class="categories">
                <div class="categories-label">私人文章：</div>
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
        <a-modal v-model="isShowImageModal" :title="'选择图片'" :onOk="handleOk" :onCancel='handleCancel'>
            <template slot="footer">
                <a-button key="back" @click="handleCancel">取消</a-button>
                <a-button key="submit" type="primary" :loading="uploadImageLoading" @click="handleOk">
                确认
                </a-button>
            </template>
            <div class="clearfix">
                <a-upload
                    action="http://localhost:3000/api/upload"
                    listType="picture-card"
                    :fileList="fileList"
                    multiple
                    @preview="handlePreview"
                    @change="handleChange"
                    accept='image/*'
                    >
                    <div v-if="fileList.length < 3">
                        <a-icon type="plus" />
                        <div class="ant-upload-text">Upload</div>
                    </div>
                </a-upload>
                <a-modal :visible="previewVisible" :footer="null" @cancel="handlePreviewCancel">
                    <img alt="example" style="width: 100%" :src="previewImage" />
                </a-modal>
            </div>
        </a-modal>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
// import xzhSelect from '@/components/base/select/index';
// import xzhSwitch from '@/components/base/switch/index';
// import xzhButton from '@/components/base/button/index';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

import {createNewBlog, getBlogDetail, updateBlog, getCategories} from '@/api/blog';
import util from '@/share/utils';
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    
    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction
    
    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],
    
    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
]
export default {
    name:'newBlog',
    data(){
        return{
            maxTitleLength:100, //blog 标题最多字符数
            title:'', //博客标题
            editorOption: {//富文本参数
                modules: {
                    toolbar: {
                        container:toolbarOptions,
                        handlers:{
                            'image':value => this.openImageModal(value)
                        }
                    }
                },
            }, 
            content:'', //富文本内容
            // 个人分类
            categories:[ ],
            //文章类型
            articleType: [ 
                {
                    value:1,
                    key:'original',
                    label:'原创',
                },
                {
                    value:2,
                    key:'reproduce',
                    label:'转载',
                },
                {
                    value:3,
                    key:'translate',
                    label:'翻译',
                },
            ],
            isPrivate: false, //私人文章
            submitLoading: false, //发布时 btn loading
            blogCategory:'', //博客所属分类
            blogType:1, //博客所属类型
            mode:'create',
            blogDetailData:{},
            isShowImageModal:false, //控制选择图片的地方
            uploadImageLoading:false,

            previewVisible: false,
            previewImage: '',
            fileList: [],
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
        handleCategoryChange(selected){
            console.log(selected);
            this.blogCategory = selected
        },
        handleTypeChange(e){
            console.log(e);
            this.blogType = e.target.value;
        },
        handleTypeChange2(type){
            console.log(type)
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
                errMsg = '请选择个人分类';
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
                this.$message({type:'error',text:err.errMsg});
            })
        },

        openImageModal(value){
            this.isShowImageModal = value;
        },
        handleOk(){
            this.isShowImageModal = false;
            this.uploadImageLoading = true;
            this.fileList.forEach(file => {
                console.log(file);
                this.content += `<p><img src='http://localhost:3000${file.response.fileUrl}' alt=''/></p>`;
            })
            setTimeout(() => {
                this.uploadImageLoading = false;
            }, 1000);
        },
        handleCancel(){
            this.isShowImageModal = false;
        },

        handlePreviewCancel () {
            this.previewVisible = false
        },
        handlePreview (file) {
            this.previewImage = file.url || file.thumbUrl
            this.previewVisible = true
        },
        handleChange (file) {
            console.log(file);
            this.fileList = file.fileList
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
        // xzhSelect,
        // xzhSwitch,
        // xzhButton,
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
