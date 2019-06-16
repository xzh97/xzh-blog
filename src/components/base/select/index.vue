<template>
    <div class="select-wrapper" :style="boxStyle">
        <div class="select-box" @click.stop='showList'>
            <ul class="selected-list" v-if="mode !== 'radio'">
                <li class="selected-item" :key='item.value' v-for="item in selectedList"><span class="oneline selected-item-show">{{item.showValue}}</span><i class="iconfont icon-close" @click.stop.self="clearSelectedItem(item)"></i> </li>
            </ul>
            <p class="radio-selected" v-else>
                <span>{{selectedList[0] ? selectedList[0].showValue : ""}}</span>
                <i v-if="showClear && selectedList.length" class="iconfont icon-close clear" @click.stop='clearSelectedItem'></i> 
            </p>
        </div>
        <ul class="select-list" v-if="isShowList">
            <li class="select-item oneline" 
                :key='item.value' 
                v-for="item in dataList"
                @click.stop='handleItemClick(item)'
                :class="{'selected':item.active}">
                {{item.showValue}}
            </li>
        </ul>
    </div>
</template>

<script>
/**
 * 
 *
 * @summary 组件 props详细说明
 * @author xzh xzh19971005@163.com
 * 
 * @param mode 模式，单选或者多选  默认单选 multiple 多选， radio 单
 * @param list 传列表，
 *
 * Created at     : 2019-05-06 15:34:02 
 * Last modified  : 2019-06-15 13:30:03
 */
export default {
    name:'xzh-select',
    props:{
        mode:{
            type:String,
            default:'radio',
        },
        list:{
            type:Array,
            default(){
                return []
            },
        },
        selected:{
            type:Array,
            default(){
                return []
            }
        },
        boxStyle:{
            type:Object,
            default(){
                return {
                    width: '200px',
                }
            }
        },
        showClear:{
            type: Boolean,
            default: false,
        }
    },
    data(){
        return {
            isShowList:false,
            selectedList: [] ,
            dataList:[],
        }
    },
    methods:{
        showList(){
            this.isShowList = true;
        },
        //选择1项或多项
        handleItemClick(item){
            let {mode} = this;
            if(mode === 'radio'){
                this.dataList.map(data => {
                    data.active = item.value === data.value ? true : false;
                })
                
                this.selectedList = [];

                this.selectedList.push(item);
                
                this.isShowList = false;
            }
            else{
                //todo 调整多选时的情况
                let isSelected = false;
                this.dataList.map(data => {
                    data.active = item.value === data.value ? !data.active : data.active;
                })
                if(this.selectedList.length){
                    this.selectedList.map((data,index) => {
                        if(item.value === data.value){ //已选中 第二次选择视为取消选中
                            console.log('取消选中',index + 1);
                            this.selectedList = this.selectedList.splice(index + 1, 1);
                            isSelected = true;
                        }
                    })
                    if(isSelected) return;
                    this.selectedList.push(item);
                }
                else{
                    this.selectedList.push(item);
                }
            }
            this.$emit('selected',this.selectedList);
        },
        //清除已选中项
        clearSelectedItem(selectedItem){
            let { mode } = this;
            if(mode === 'multiple'){
                this.selectedList = this.selectedList.filter(item => item.value !== selectedItem.value);
                this.dataList.map(item => {if(item.value === selectedItem.value) item.active = false;})
            }
            else{
                this.selectedList = [];
            }  
        },
    },
    created(){
        console.log('created');
        let { dataList, list, selectedList } = this;

        list.forEach(item => {
            dataList.push({...item});
        })

        if(this.selected.length){
            this.handleItemClick(...this.selected)
        }
    },
    mounted(){
        //点击其他地方 关闭选择框
        let self = this;
        window.addEventListener('click',()=>{
            console.log('window.click');
            self.isShowList = false; 
        })
    },
    watch:{
        selected(newVal){
            this.handleItemClick(...newVal);
        }
    }
}
</script>

<style lang='scss' scoped>
@import '../../../styles/mixin'; 
.select-wrapper{
    width: 200px;
    position: relative;
    .select-box{
        width: 100%;
        height: 32px;
        box-sizing: border-box;
        border: 1px solid #cccccc;
        border-radius: 4px;
        cursor: text;
        .selected-list{
            box-sizing: border-box;
            height: 100%;
            padding: 6px;
            @include fsc;
            .selected-item{
                max-width: 80%;
                box-sizing: border-box;
                height: 100%;
                line-height: 18px;
                font-size: 12px;
                background-color: #fafafa;
                border: 1px solid #e8e8e8;
                border-radius: 2px;
                padding: 0 4px;
                margin-left: 5px;
                @include fsc;
                .selected-item-show{
                    display: inline-block;
                    width: 100%;
                }
            }
            .icon-close:hover{
                cursor: pointer;
                color: #000;
            }
        }
        .radio-selected{
            height: 100%;
            padding-left: 6px;
            line-height: 32px;
            color: rgba(0,0,0,.65);
            .clear{
                text-align: right;
                color:#cccccc;
                float: right;
                margin-right: 8px;
            }
            .clear:hover{
                color: #aaaaaa;
                cursor: pointer;
            }
        }
    }
    .select-list{
        width: 100%;
        padding: 8px 0;
        position: absolute;
        top: 36px;
        right: 0;
        left: 0;
        box-sizing: border-box;
        background: #ffffff;
        box-shadow:  0 0 5px rgba(127,127,127,.2);
        border-radius: 4px;
        z-index: 100;
        cursor: pointer;
        .select-item{
            height: 24px;
            line-height: 24px;
            color: rgba(0,0,0,.65);
            font-size: 14px;
            padding: 0 10px;
        }
        .select-item:hover{
            color:#409EFF;
            background: rgb(217, 236, 255);
        }
        .selected{
            color:#409EFF;
        }
    }
    .select-box:hover{
        border: 1px solid #409EFF;
    }
}

</style>
