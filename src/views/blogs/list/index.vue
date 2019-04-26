<template>
    <div class="blogs-wrapper">
        <div class="blogs-inner">
            <header class="header">
                <div class="header-left">
                    <h4 class="header-title">xzh的学习笔记</h4>
                </div>
                <div class="header-right">
                    <button>管理笔记</button>
                </div>
            </header>
            <div class="content">
                <div class="content-left">
                    <div class="blog-info">
                        <avatar></avatar>
                    </div>
                    <category :title='blogCategorys.title' :categoryList='blogCategorys.categoryList'></category>
                </div>
                <div class="content-right"></div>
            </div>   
        </div>
    </div>
</template>

<script>
import Category from '../../../components/base/category/index';
import Avatar from '../../../components/base/avatar/index';
export default {
    name:'blog-list',
    data(){
        return {
            blogCategorys:{
                title:'博客分类',
                categoryList:[
                    {
                        value:1,
                        categoryName:'Vue学习笔记',
                        articlesCount:10,
                    },
                    {
                        value:2,
                        categoryName:'React学习笔记',
                        articlesCount:20,
                    },
                ]
            },
        }
    },
    components:{
        Category,
        Avatar
    }
}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin.scss';
    .blogs-wrapper{
        width: 100%;
        min-height: 1000px;
        background: url('../../../assets/images/bg3.jpg') no-repeat;

        display: flex;
        justify-content: center;

        color: #ffffff;
        .blogs-inner{
            width: 70%;
            .header{
                width: 100%;
                height: 80px;
                @include fbc;
                .header-title{
                    font-size: 24px;
                    line-height: 30px;
                    font-weight: 500;
                }
            }
            .content{
                width: 100%;
                @include fbc;
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
                }
            }
        }
    }
</style>
