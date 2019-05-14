<template>
    <div class="select-wrapper">
        <div class="select-box" @click='showList'>
            <ul class="selected-list" v-if="mode !== 'radio'">
                <li class="selected-item" :key='item.value' v-for="item in selectedList">{{item.showValue}}</li>
            </ul>
            <p class="radio-selected" :key='item.value' v-for="item in selectedList" v-else>{{item.showValue}}</p>
        </div>
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
            default:'multiple',
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
                width: 40px;
                height: 100%;
                line-height: 18px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                font-size: 12px;
                background: #ccc;
                margin-left: 10px;
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
    .select-box:hover{
        border: 1px solid #409EFF;
    }
}

</style>
