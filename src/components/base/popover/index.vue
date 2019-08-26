<template>
    <div>
        <span ref="trigger">
            <slot></slot>
        </span>
        <div :class="['popover-wrapper',placementClass]"
             v-show='value'
             ref="popover"
             :style="popoverStyle">
            <div class="popover-inner" >
                <!-- <div :class="['arrow',placementClass]"></div> -->
                <div v-if="title" class="popover-title">{{ title }}</div>
                <slot name="content">
                    <div class="popover-content" v-html="content"></div>
                </slot>
            </div>      
        </div>
        <slot name='element'></slot>
    </div>
</template>

<script>
    import {addEvent,removeEvent} from "@/share/utils";

    export default {
    name:'popover',
    props:{
        placement:{
            type:String,
            default:'top'
        },
        title:{
            type:String,
            default:''
        },
        content:{
            type:String,
            default:''
        },
        gutter:{
            type: Number,
            default:10
        },
    },
    data(){
        return {
            value:true,
            position:{
                left:'',
                top:'',
            },
            popoverStyle:{}
        }
    },
    computed:{
        placementClass(){
            let {placement} = this;
            return `popover-placement-${placement}`;
        },
    },
    methods:{
        init(flag){
            const trigger = this.$refs.trigger.children[0];
            const popover = this.$refs.popover;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

            switch (this.placement) {
                case 'top':
                    this.position.left = trigger.offsetLeft + trigger.offsetWidth/2  - popover.offsetWidth/2 - this.gutter;
                    this.position.top = scrollTop + trigger.getBoundingClientRect().top - popover.offsetHeight - this.gutter;
                    break;
                default:
                    console.warn(`${this.placement} is a Wrong placement, Please enter the correct placement`);
            }
            console.dir(popover);
            console.log('position',this.position);

            this.popoverStyle = {
                left: this.position.left + 'px',
                top: this.position.top + 'px',
            };
        },
        onOpen(){
            this.value = true;
        },
        onClose(){
            this.value = false;
        }
    },
   /* watch:{
        value(val){
            if(val){
                this.init(false);
            }
        }
    },*/
    created(){
    },
    mounted(){
        this.$nextTick(() => {
            this.init(true);
        })
    },
}
</script>

<style lang='scss' scoped>
.popover-wrapper{
    position:absolute;
    top: 0;
    left: 0;
    z-index: 1030;

    border-radius: $border-radius-base;
    box-shadow: $box-shadow-base;
    background: #ffffff;
    .popover-inner{
        font-size: $font-size-base;
        color:$text-color;
        line-height: 20px;

        .popover-title{
            box-sizing: border-box; 
            border-bottom: 1px solid $border-color-base;
            padding-bottom: 6px;
            vertical-align: middle;
        }
        .popover-content{
            padding: 10px 8px;
            font-size: 14px;
        }
    }   
}
</style>
