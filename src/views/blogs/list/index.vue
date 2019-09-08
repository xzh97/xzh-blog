<template>
    <div class="blogs-wrapper">
        <logo></logo>
    </div>
</template>

<script>
import Pagination from '@/components/base/pagination/index';
import Logo from '@/components/business/header/index';

import {getBlogList} from "@/api/blog";

import util from '@/share/utils';
export default {
    name:'blog-list',
    data(){
        return {
            page:1,
            size:12,
        }
    },
    created(){
        this.getBlogList();
    },
    methods:{
        //event
        sortClickHandle(sortWay){
            this.sortBy = sortWay.value;
            this.getBlogList();
        },
        updateBlogEditBtn(item,controlFlag){
            item.isShowBlogEditBtn = controlFlag === 'show' ? true : false ;
        },
        addNewBlog(){
            this.$router.push({name:'addNewBlog'})
        },

        //service
        getBlogList(){
            let params = {
                page:this.page,
                size:this.size,
                sortBy:'default',
            }
            if(this.isSeeOriginalOnly){
                params.type = 1;
            }
            getBlogList(params).then(res => {
                console.log('getbloglist',res.data);
                let data = res.data;
                data.map(item => {
                    item.createTime = util.dateFormat(item.createTime,'yyyy-MM-dd hh:mm:ss');
                    item.isShowBlogEditBtn = false;
                });
                this.blogList = data;
                this.totalPage = res.totalPage;
            })
            
        },
        goToBlogDetail(item){
            this.$router.push({path:`/blog/detail/${item.blogOid}`})
        },
        editBlog(item){
            this.$router.push({path:`/blog/update/${item.blogOid}`})
        },
        deleteBlog(item){
            deleteBlog(item.blogOid).then(res => {
                console.log(res);
                this.$message({type:'success',text:res.errMsg})
                this.getBlogList();
            }).catch(err => {
                console.log(err);
                this.$message({type:'error',text:err.errMsg})
            })
        },

        //emit
        handlePageChange(page){
            this.page = page;
            this.getBlogList();
        }
    },
    components:{
        Pagination,
        Logo,
    },
}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin.scss';
    .blogs-wrapper{
        width: 100%;
        height: 100%;
        min-height: 1000px;
        background: url('../../../assets/images/bg1.jpg') repeat-y;
        background-size: 100%;

        display: flex;
        justify-content: center;

        color: #ffffff;
        .blogs-inner{
            width: 80%;
            .header{
                width: 100%;
                height: 80px;
                @include fbc;
                .header-title{
                    font-size: 24px;
                    line-height: 30px;
                    font-weight: 500;
                    color: #ffffff;
                }
            }
            .content{
                @include fb;
                width: 100%;
                color: #4d4d4d;
                padding-bottom: 40px;
                
                .content-right{
                    width: 70%;
                    background: #ffffff;
                    margin-left: 20px; 
                    .content-tips{
                        height: 48px;
                        line-height: 48px;
                        border-bottom: 1px solid #cccccc; 
                        padding: 0 16px;
                        @include fb;
                        .check-original-box {
                            font-size: 16px;
                            vertical-align: middle;
                            #check-original {
                                margin: 0;
                                margin-right: 8px;
                                margin-top: -4px;
                                width: 14px;
                                height: 14px;
                                cursor: pointer;
                                vertical-align: middle;
                            }
                        }
                        .sort-by{
                            dt,.sort-filter{
                                font-size: 16px;
                                padding: 0 16px;
                                float: left;
                                height: 48px;
                                
                            }
                            dt{
                                color: #999999;
                            }
                            .sort-filter{
                                cursor: pointer;
                            }
                            .sort-filter:hover,.sort-by-active{
                                color: #ca0c16;
                            }
                        }
                    }
                    .content-list{
                        .blog-item{
                            position: relative;
                            padding: 12px 24px;
                            border-bottom: 1px solid #cccccc;
                            .blog-title{
                                color: #4d4d4d;
                                word-break: break-all;
                                line-height: 24px;
                                margin-bottom: 6px;
                                .blog-type{
                                    display: inline-block;
                                    width: 24px;
                                    height: 24px;
                                    line-height: 24px;
                                    border-radius: 50%;
                                    box-sizing: border-box;
                                    font-weight: normal;
                                    margin-right: 8px;
                                    font-size: 12px;
                                    text-align: center;
                                }
                                .original{
                                    color:#ca0c16;
                                    border: 1px solid #f4ced0;
                                }
                                .reproduced{
                                    color: #86ca5e;
                                    border: 1px solid #e7f4df;
                                }
                            }
                            .blog-title:hover{
                                cursor: pointer;
                                color: #FF7F50;
                            }
                            .blog-desc{
                                color: #999;
                                font-size: 14px;
                                line-height: 22px;
                                white-space: normal;
                            }
                            .blog-desc:hover{
                                cursor: pointer;
                            }
                            .blog-item-footer{
                                @include fsc;
                                .blog-date,.blog-read-num,.blog-comment{
                                    font-size: 14px;
                                    line-height: 22px;
                                    color: #999;
                                    .num{
                                        font-size: 14px;
                                        color: #3399ea;
                                    }
                                }
                                .blog-date{
                                    color: #6b6b6b;

                                }
                                .point{
                                    width: 1px;
                                    height: 12px;
                                    background: #e0e0e0;
                                    margin: 6px 8px;
                                }
                            }
                        }
                        .blog-item:hover{
                            background: #fafafa;
                        }
                        .blog-edit-btn-group{
                            position: absolute;
                            right: 16px;
                            bottom: 12px;
                            z-index: 12;
                            .blog-edit-btn{
                                background: none;
                                cursor: pointer;
                                color: #7b705e;
                                border: 1px solid #7b705e;
                                margin-right: 10px;
                            }
                            .detele-btn{
                                color: #ca0c16;
                            }
                        } 
                    }
                }
            }
        }
    }
</style>
