<template>
    <div class="pagination-wrapper">
        <ul class="pagination">
            <li class="page" :class="{'disabled':!hasPrevPage}"  @click="setPageList('prev')"><<</li>
            <li class="page" :key="`page-${page}`" 
                v-for="page in pageList"
                :class="{'active':currentPage === page}"
                @click="handlePageChange(page)"
                >
                <p class="font-size-12">{{ page }}</p>
            </li>
            <li class="page" :class="{'disabled':!hasNextPage}" @click="setPageList('next')">>></li>
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
        pageSize:{ // 每页条数
            type: Number,
            default: 5,
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
            pageListMap:{}, //存放所有页码数组
            pageSelectedIndex:1, //map对应的key
        }
    },
    created(){
        this.initTotalPage();
    },
    methods:{
        initTotalPage(){
            let {totalPage, pageListMap, pageSize, pageSelectedIndex} = this;
            for(let i=1; i<=totalPage; i++){
                let key = `page${pageSelectedIndex}`;
                if(Object.keys(pageListMap).indexOf(key) > -1){
                    pageListMap[key].push(i);
                }
                else{
                    pageListMap[key] = [];
                    pageListMap[key].push(i);
                }
                if(pageListMap[key].length === pageSize) ++pageSelectedIndex;
            }
            this.setPageList();
        },
        setPageList(key){
            let { pageListMap, totalPage } = this;
            if(key === 'prev' && this.hasPrevPage){
                this.pageSelectedIndex --;
            }
            else if(key === 'next' && this.hasNextPage){
                this.pageSelectedIndex ++;
            }
            this.pageList = pageListMap[`page${this.pageSelectedIndex}`];
            this.hasPrevPage = this.pageSelectedIndex > 1 ? true : false;
            this.hasNextPage = this.pageList.indexOf(totalPage) > -1 ? false : true;
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
        background: #ffffff;
        color: #4f4f4f;
        height: 20px;
        @include fsc;
        .page{
            margin-left: 4px;
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
            &:hover{
                border-color: #d41919;
                color: #d41919;
                cursor: pointer;
            }
        }
        .page:first-child{
            margin-left:0; 
        }
        // .page:hover{
        //     border-color: #d41919;
        //     color: #d41919;
        //     cursor: pointer;
        // }
        .page.active{
            border-color: #d41919;
            color: #d41919;
        }
        .disabled{
            color: #eaeaea;
            border: 1px solid #eaeaea;
            &:hover{
                color: #eaeaea;
                border: 1px solid #eaeaea;
                cursor: default;
            }
        }
        .page-to{
            font-size: 12px;
            margin-left: 8px;
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
