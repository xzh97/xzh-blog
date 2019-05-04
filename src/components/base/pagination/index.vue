<template>
    <div class="pagination-wrapper">
        <ul class="pagination">
            <li class="page" v-if="totalPage > pageListLength" @click="setPageList(pageList[0] - pageListLength)"><<</li>
            <li class="page" :key="`page-${page}`" 
                v-for="page in pageList"
                :class="{'active':currentPage === page}"
                @click="handlePageChange(page)"
                >
                <p class="font-size-12">{{ page }}</p>
            </li>
            <li class="page" v-if="totalPage > pageListLength" @click="setPageList(pageList[pageList.length-1]+1)">>></li>
            <li class="page-to" v-if="isShowPageTo">
                跳至<input class="page-to-input" type="text" v-model="pageTo">页 
                <button class="page-to-btn" @click="goToPage">跳转</button>
            </li>
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
        pageListLength:{ // 显示多少页数
            type: Number,
            default: 6,
        },
        isShowPageTo:{ // 是否显示直接跳转页
            type: Boolean,
            default: true,
        }
    },
    data(){
        return {
            hasPrevPage:false,
            hasNextPage:false,
            pageTo:'',
            pageList:[],
            currentPage:1,
        }
    },
    created(){
        this.setPageList(1);
    },
    methods:{
        //pagination无效问题是为啥， 点击事件里不走for循环
        setPageList(key){
            let { totalPage, pageListLength} = this;
            let length = totalPage > pageListLength ? pageListLength : totalPage;
            this.pageList = [];
            for(let i= key; i <= length; i++){
                console.log(i);
                if(i <= totalPage) this.pageList.push(i);
            }
        },
        //event
        handlePageChange(page){
            console.log(page);
            this.currentPage = page;
            this.$emit('page-change',this.currentPage)
        },
        goToPage(){
            console.log('enter gotoPage method')
            let { pageTo,totalPage } = this,
                pages = Number(pageTo);
            if(pages > totalPage){
                let messageInfo = {
                    text:'没有该页码，请重新输入！',
                    type:'error'
                }
                return this.$message(messageInfo);
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
    display: flex;
    justify-content: center;
    .pagination{
        width: 400px;
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
