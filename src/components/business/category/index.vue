<template>
    <div class="category-wrapper">
        <h3 class="category-title"><span>{{ title }}</span><i class="iconfont icon-setting fr" v-if="editable" @click="handleSetting"></i></h3>
        <div class="category-content">
            <ul class="category-list">
                <li class="category-item oneline" v-if="mode === 'edit'">
                    <input class="new-category" type="text" v-model="categoryName">
                    <p>
                        <xzh-button type='primary' size='small' @click="onSave">保存</xzh-button>
                        <xzh-button size='small' @click="onCancel">取消</xzh-button>
                    </p>
                    
                </li>
                <li class="category-item oneline" :key="item.categoryOid" v-for="item in categoryList">
                    <div class="item-left">{{ item.name}}</div>
                    <div class="item-right" v-if="mode === 'read'">{{ item.count }}篇</div>
                    <div class="item-right" v-else>
                        <i class="iconfont icon-edit-square" @click.stop.self="onUpdate(item)"></i>
                        <i class="iconfont icon-close" @click.stop.self="onDelete(item)"></i>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import xzhButton from '@/components/base/button/index';
/**
 * @props params
 * @param title 分类标题
 * @param categoryList 分类列表
 * @param editable 是否可编辑
 */
export default {
    name: "category",
    props: {
        title: {
            type: String,
            default: ""
        },
        categoryList: {
            type: Array,
            default() {
                return [];
            }
        },
        editable: {
            type: Boolean,
            default: false,
        },
    },
    data(){
        return {
            mode:'read', //read 只读， edit 编辑
            categoryName:'',
            isUpdate:false, //控制是更新 还是新增
            updateCategory:{},
        }
    },
    methods:{
        handleSetting(){
            this.mode = this.mode === 'edit' ?　'read' : 'edit';
        },
        onCancel(){
            this.mode = 'read';
        },
        onSave(){
            let data = {
                name:this.categoryName,
            }
            if(this.isUpdate){
                data = Object.assign({},this.updateCategory,data);
                this.$emit('on-update',data);
            }   
            else{
                if(!data.name) {
                    this.$message({type:'warning',text:'请输入分类名称'});
                    return;
                }
                this.$emit('on-save',data);
            }
            
            this.mode = 'read';
            this.categoryName = '';
            this.isUpdate = false;
        },
        onUpdate(category){
            this.categoryName = category.name;
            this.isUpdate = true;
            this.updateCategory = category;
        },
        onDelete(category){
            this.$emit('on-delete',category.categoryOid);
        }
    },
    components:{
        xzhButton,
    }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/mixin.scss";
.category-wrapper {
    width: 100%;
    background: #ffffff;
    margin-top: 20px;
    color: #000000;
    box-shadow: 0 0 4px rgba(255,255,255,.2);
    .iconfont:hover{
        color: #c88326;
        cursor: pointer;
    }
    .category-title {
        padding: 0 16px;
        background: #dddddd;
        font-size: 16px;
        color: #3d3d3d;
        height: 38px;
        line-height: 38px;
        .iconfont {
            float: right;
        }
    }
    .category-content {
        padding: 16px;
    }
    .category-item {
        @include fbc;
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        .new-category{
            width: 60%;
            outline: none;
            border: 0;
            border-bottom: 1px inset #c88326;
            box-sizing: border-box;
            margin: 0;
            height: 100%;
            text-indent: 10px;
        }
        .item-left {
            color: #c88326;
            font-size: 16px;
        }
        .item-right {
            font-size: 12px;
            color: #cccccc;
        }
    }
    .category-item:hover {
        .item-left {
            color: #f03434;
        }
    }
}
</style>

