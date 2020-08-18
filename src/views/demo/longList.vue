<template>
  <div class="list-wrapper" @scroll="handleScroll">
      <ul class="list-container" ref="listRef" >
          <li :key='item.index' 
            v-for="(item,index) in showList" 
            v-if="index >= startIndex && index <= endIndex"
            class="list-item">
            {{item.label}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    name: 'virtualListDemo',
    data(){
        return {
            showList: [], // 显示的列表
            count : 0,
            startIndex: 0,
            endIndex: 100,
            currentScrollTop: 0,
        }
    },
    created(){
        this.getList(true);
    },
    methods: {
        getList(){
            setTimeout(() => {
                for(let i = 0; i < 50; i++){
                    this.count ++;
                    this.showList.push({
                        index: this.count,
                        label: `我是第${this.count}条数据`,
                    })
                    
                }
            },1000)
            
        },
        handleScroll(e){
            let {scrollTop, scrollHeight, clientHeight} = e.target;
            console.log(scrollTop, clientHeight, scrollHeight)
            if(scrollTop > this.currentScrollTop) {
                // 下滑滚动条
                if(scrollTop + clientHeight >= scrollHeight){
                    console.log('滑动到底部了');
                    this.getList();
                }
                else if(scrollTop >= clientHeight / 2){
                    this.startIndex += 50;
                    this.endIndex += 50;
                }
            }
            else {
                // 上滑滚动条
                console.log('scrolltop变化了',scrollTop);
                if(scrollTop < clientHeight / 2){ 
                    this.startIndex -= 50;
                    this.endIndex -= 50;
                }
            }
            
        },
    }
}
</script>

<style scoped lang='scss'>
    .list-wrapper{
        margin: 50px auto 0;
        width: 300px;
        height: 400px;
        box-shadow: $box-shadow-base;
        background: #eeeeee;
        overflow: hidden;
        overflow-y: auto;
        .list-item{
            height: 40px;
            line-height: 40px;
        }
    }
</style>