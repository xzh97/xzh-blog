<template>
    <div class="content-left">
        <div class="blog-info">
            <avatar></avatar>
            <div class="new-blog">
                <button @click='addNewBlog'>写笔记</button>
            </div>
        </div>
        <category :key='blogCategories.title' 
                  :title='blogCategories.title' 
                  :editable='blogCategories.editable' 
                  :categoryList='blogCategories.categoryList'
                  @on-save='addNewCategory'
                  @on-update='updateCategory'
                  @on-delete='deleteCategory'>
        </category>
    </div>
</template>

<script>
import Category from '@/components/business/category/index';
import Avatar from '@/components/base/avatar/index';

import {getCategories, createCategory, updateCategory, deleteCategory} from '@/api/blog';
import {sessionStorageMethods} from '@/share/storage';
import util from '@/share/utils';
/**
 * //todo 归档 暂时不做
 * {
        title:'归档',
        categoryList:[
            {
                value:'2017-08',
                name:'2017年8月',
                count:10,
            },
            {
                value:'2017-07',
                name:'2017年7月',
                count:10,
            },
            {
                value:'2017-06',
                name:'2017年6月',
                count:100,
            },
            {
                value:'2017-04',
                name:'2017年4月',
                count:1,
            },
        ]
    }
 */
export default {
    data(){
        return {
            blogCategories:{},
            isCategoryListChange:false,
        }
    },
    created(){
        this.getCategories();
    },
    methods:{   
        addNewBlog(){
            this.$router.push({name:'addNewBlog'})
        },
        getCategories(flag){
            //优先级 flag > sessionStorage > initData
            const getData = () => {
                getCategories().then(res => {
                    this.handleCategory(res.data);
                    sessionStorageMethods.setItem('blogCategories',JSON.stringify(res.data))
                }).catch(err => {
                    this.$message({type:'error',text:err.errMsg})
                })
            }
            if(flag){
                getData();
            }
            else{
                let blogCategories = JSON.parse(sessionStorageMethods.getItem('blogCategories'));
                if(blogCategories){ //取缓存
                    this.handleCategory(blogCategories);
                }
                else{
                    getData();
                }
            }
        },
        handleCategory(data){
            console.log('handleCategory',data);
            let item = {
                title:'博客分类',
                editable:true,
                categoryList:data,
            };
            this.blogCategories = item;
        },
        addNewCategory(data){
            createCategory(data).then(res => {
                this.$message({type:'success',text:res.errMsg});
                this.getCategories(true);
            }).catch(err => {
                this.$message({type:'error',text:err.errMsg});
            })
        },
        updateCategory(data){
            updateCategory(data).then(res => {
                this.$message({type:'success',text:res.errMsg});
                this.getCategories(true);
            }).catch(err => {
                this.$message({type:'error',text:err.errMsg});
            })
        },
        deleteCategory(categoryOID){
            deleteCategory(categoryOID).then(res => {
                this.$message({type:'success',text:res.errMsg});
                this.getCategories(true);
            }).catch(err => {
                this.$message({type:'error',text:err.errMsg});
            })
        }
    },
    components:{
        Category,
        Avatar,
    }
}
</script>

<style lang="scss" scoped>
.content-left{
    width: 30%;
    .blog-info, .blog-category{
        width: 100%;
        height: 240px;
        background: #ffffff;
    }
    .blog-category{
        margin-top: 20px;
    }
    .blog-info{
        .new-blog{
            width: 200px;
            margin: 30px auto 0;
            button{
                background: none;
                cursor: pointer;
            }
        }

    }
}
</style>

