<template>
    <div class="pagination-wrapper">
        <ul class="pagination">
            <li class="placeholder"></li>
            <li class="page prev" v-if="hasPrevPage" @click="handlePageChange('prev')">上一页</li>
            <li class="page" :key="`page-${page}`" 
                v-for="page in pageList"
                :class="{'active':currentPage === page}"
                @click="handlePageChange(page)"
                >
                <p class="font-size-12">{{ page }}</p>
            </li>
            <li class="page next" v-if="hasNextPage" @click="handlePageChange('next')">下一页</li>
            <li class="page-to" v-if="isShowPageTo">
                跳至<input class="page-to-input" type="text" v-model="pageTo">页 
                <button class="page-to-btn" @click="goToPage">跳转</button>
            </li>
            <li class="placeholder"></li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'pagination',
    props:{
        totalPage:{
            type: Number,
            default: 1,
        },
    },
    data(){
        return {
            hasPrevPage:false,
            hasNextPage:false,
            isShowPageTo:false,
            pageTo:'',
            pageList:[],
            currentPage:1,
        }
    },
    created(){
        this.initData();
    },
    methods:{
        initData(){
            let { totalPage} = this;

            if(totalPage > 5){
                this.pageList.push(1,2,3,4,5);
                this.isShowPageTo = true;
            }
            else{
                for(let i=1; i< totalPage; i++){
                    this.pageList.push(i);
                }
            }
        },
        //event
        handlePageChange(page){
            console.log(page);
            if(typeof page === 'string'){
                if(page === 'prev'){
                    this.currentPage -- ;
                }
                else{
                    this.currentPage ++ ;
                }
            }
            else{
                this.currentPage = page;
            }
            this.$emit('page-change',this.currentPage)
        },
        goToPage(){
            let { pageTo,totalPage } = this,
                pages = Number(pageTo);
            if(pages > totalPage){
                return '请重新输入页码'
            }
            else{
                this.currentPage = pages;
                this.$emit('page-change',this.currentPage)
            }
        }
    },
    watch:{
        currentPage(val){
            if(val === 1){
                this.hasPrevPage = false;
            }
            else if(val === this.totalPage){
                this.hasNextPage = false;
            }
            else{
                return;
            }
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin';
.pagination-wrapper{
    padding: 16px;
    .pagination{
        background: #ffffff;
        color: #4f4f4f;
        height: 20px;
        @include fac;
        .page{
            padding: 0 10px;
            font-size: 12px;
            box-sizing: border-box;
            border: 1px solid #cccccc;
            height: 100%;
            line-height: 20px;
            border-radius: 4px;
            .font-size-12{
                font-size: 12px;
            }
        }
        .page:hover{
            border-color: #d41919;
            color: #d41919;
            cursor: pointer;
        }
        .page.active{
            border-color: #d41919;
            color: #d41919;
        }
        .placeholder{
            width: 160px;
            height: 100%;
        }
        .page-to{
            font-size: 12px;
            .page-to-input{
                width: 30px;
                height: 100%;
                outline: none;
                border: 1px solid #cccccc;
                border-radius: 4px;
                text-indent: 4px;
                margin: 0 5px;
            }
            .page-to-btn{
                background: none;
                border: 1px solid #cccccc;
                border-radius: 4px;
                outline: none;
                cursor: pointer;
                margin: 0 5px;
            }
            .page-to-btn:hover{
                border-color: #d41919;
                color: #d41919;
            }
        }
    }
}
</style>
