<template>
    <div class="select-wrapper" :style="boxStyle">
        <div class="select-box" @click.stop='showList'>
            <ul class="selected-list" v-if="mode !== 'radio'">
                <li class="selected-item" :key='item.value' v-for="item in selectedList"><span class="oneline selected-item-show">{{item.showValue}}</span><i class="iconfont icon-close" @click.stop.self="clearSelectedItem(item)"></i> </li>
            </ul>
            <p class="radio-selected" v-else>{{selectedList[0] ? selectedList[0].showValue : ""}}</p>
        </div>
        <ul class="select-list" v-if="isShowList">
            <li class="select-item oneline" 
                :key='item.value' 
                v-for="item in dataList" 
                @mouseenter='handleItemMouseEnter(item)'
                @mouseleave='handleItemMouseLeave(item)'
                @click.stop='handleItemClick(item)'
                :class="{'select-item-active':item.active,'selected':selected.indexOf(item.value) > -1}">
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
 * Last modified  : 2019-05-19 11:16:19
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
        defaultSelected:{
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
        }
    },
    data(){
        return {
            isShowList:false,
            selected: [],
            selectedList: [] ,
            dataList:[],
        }
    },
    methods:{
        showList(){
            this.isShowList = true;
        },
        handleItemMouseEnter(item){
            item.active = true;
        },
        handleItemMouseLeave(item){
            item.active = false;
        },
        //选择1项或多项
        handleItemClick(item){
            let {mode} = this;
            item.active = false;
            if(mode === 'radio'){
                this.selected = [];
                this.selectedList = [];

                this.selected.push(item.value);
                this.selectedList.push(item);
                
                this.isShowList = false;
            }
            else{
                let index = this.selected.indexOf(item.value);
                if(index > -1){
                    this.selected.splice(index,1);
                    this.selectedList.splice(index,1);
                }
                else{
                    this.selected.push(item.value);
                    this.selectedList.push(item);
                }
            }
            this.$emit('selected',this.selectedList);
        },
        //清除已选中项
        clearSelectedItem(selectedItem){
            this.selected = this.selected.filter(value => value !== selectedItem.value);
            this.selectedList = this.selectedList.filter(item => item.value !== selectedItem.value);
        }
    },
    created(){
        let { dataList, list, selected, selectedList,defaultSelected } = this;
        if(defaultSelected.length){
            defaultSelected.forEach(element => {
                selected.push(element.value);
                selectedList.push(element);
            });
        }

        //给传进来的列表  统一加一个active属性
        list.forEach(item => {
            dataList.push({...item,active:false});
        })
        
    },
    mounted(){
        let self = this;
        window.addEventListener('click',()=>{
            self.isShowList = false; 
        })
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
        .select-item-active{
            background: rgb(217, 236, 255);
            color:#409EFF;
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
