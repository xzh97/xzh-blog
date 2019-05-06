<template>
    <div class="select-box" @click='showList'>
        <div class="selected-list"></div>
        <ul class="select-list" v-if="isShowList">
            <li class="select-item" 
                :key='item.value' 
                v-for="item in list" 
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
 * @param mode 模式，单选或者多选  默认单选
 * @param list 传列表，
 *
 * Created at     : 2019-05-06 15:34:02 
 * Last modified  : 2019-05-06 19:14:44
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
            type:[Array,Number],
        },
    },
    data(){
        return {
            isShowList:false,
            selected:[] || defaultSelected.value,
            selectedList:[] || [defaultSelected],
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
        handleItemClick(item){
            let {mode} = this;
            if(mode === 'radio'){
                this.selected = [];
                this.selectedList = [];

                this.selected.push(item.value);
                this.selectedList.push(item);
                
                this.isShowList = false;
            }
            else{
                let index = this.selected.indexOf(item.value);
                if(index){
                    this.selected.splice(index,1);
                    this.selectedList.push(index,1);
                }
                else{
                    this.selected.push(item.value);
                    this.selectedList.push(item);
                }
            }
        }
    },
}
</script>

<style lang='scss' scoped>
.select-box{
    width: 200px;
    height: 32px;
    box-sizing: border-box;
    border: 1px solid #cccccc;
    border-radius: 4px;
    cursor: text;
    position: relative;
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
        }
        .selected{
            color:#409EFF;
        }
    }
}
.select-box:hover{
    border: 1px solid #409EFF;
}
</style>
