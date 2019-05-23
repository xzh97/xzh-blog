<template>
    <div class="content-left">
        <div class="blog-info">
            <avatar></avatar>
            <div class="new-blog">
                <button @click='addNewBlog'>写笔记</button>
            </div>
        </div>
        <category v-for="item in blogCategorys" :key='item.title' :title='item.title' :categoryList='item.categoryList'></category>
    </div>
</template>

<script>
import Category from '@/components/business/category/index';
import Avatar from '@/components/base/avatar/index';
export default {
    data(){
        return {
            blogCategorys:[
                {
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
                {
                    title:'归档',
                    categoryList:[
                        {
                            value:'2017-08',
                            categoryName:'2017年8月',
                            articlesCount:10,
                        },
                        {
                            value:'2017-07',
                            categoryName:'2017年7月',
                            articlesCount:10,
                        },
                        {
                            value:'2017-06',
                            categoryName:'2017年6月',
                            articlesCount:100,
                        },
                        {
                            value:'2017-04',
                            categoryName:'2017年4月',
                            articlesCount:1,
                        },
                    ]
                }
            ],
        }
    },
    methods:{   
        addNewBlog(){
            this.$router.push({name:'addNewBlog'})
        },
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

