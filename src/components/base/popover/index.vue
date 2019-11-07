<template>
    <div>
        <span class="trigger" ref="trigger" @mouseover="onOpen" @mouseout="onClose">
                <slot></slot>
        </span>
        <transition name="fade">
            <div
                :class="['popover-wrapper',placementClass]"
                v-show="value"
                ref="popover"
                :style="popoverStyle"
            >
                <div class="popover-inner">
                    <div :class="['popover-arrow',arrowClass]"></div>
                    <div v-if="title" class="popover-title">{{ title }}</div>
                    <slot name="content">
                        <div class="popover-content" v-html="content"></div>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "popover",
    props: {
        placement: {
            type: String,
            default: "top"
        },
        title: {
            type: String,
            default: ""
        },
        content: {
            type: String,
            default: ""
        },
        gutter: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            value: false,
            position: {
                left: "",
                top: ""
            },
            popoverStyle: {},
            arrowStyle: {}
        };
    },
    computed: {
        placementClass() {
            let { placement } = this;
            return `popover-placement-${placement}`;
        },
        arrowClass() {
            let { placement } = this;
            return `popover-arrow-${placement}`;
        }
    },
    methods: {
        init() {
            this.$nextTick(() => {
                setTimeout( ()=> this.getComputedStyle(),0);
            });
        },
        getComputedStyle() {
            const trigger = this.$refs.trigger.children[0];
            const popover = this.$refs.popover;
            const scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;

            switch (this.placement) {
            case "top":
                this.position.left =
                    parseInt(trigger.offsetLeft +
                    trigger.offsetWidth / 2 -
                    popover.offsetWidth / 2 -
                    this.gutter);
                this.position.top =
                    scrollTop +
                    trigger.getBoundingClientRect().top -
                    popover.offsetHeight -
                    this.gutter;
                break;
            default:
                console.warn(
                    `${this.placement} is a Wrong placement, Please enter the correct placement`
                );
            }
            /*console.logo(trigger.offsetWidth / 2, popover.offsetWidth / 2);
            console.logo(
                "trigger",
                trigger.getBoundingClientRect().top,
                trigger.offsetTop,
                popover.offsetHeight
            );
            console.dir(trigger);
            console.logo("");

            console.logo("popover");
            console.dir(popover);
            console.logo("");

            console.logo(
                `position left : ${this.position.left}, position top : ${this.position.top}`
            );*/

            this.popoverStyle = {
                left: this.position.left + "px",
                top: this.position.top + "px"
            };
        },
        onOpen() {
            this.value = true;
        },
        onClose() {
            this.value = false;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.init(true);
            window.addEventListener("resize", this.init);
        });
    },
    watch:{
        value(val){
            if(val) this.init();
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.init);
    }
};
</script>

<style lang='scss' scoped>
.popover-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1030;

    border-radius: $border-radius-base;
    box-shadow: $box-shadow-base;
    background: #ffffff;
    .popover-inner {
        font-size: $font-size-base;
        color: $text-color;
        line-height: 20px;
        .popover-title {
            box-sizing: border-box;
            border-bottom: 1px solid $border-color-base;
            padding-bottom: 6px;
            vertical-align: middle;
        }
        .popover-content {
            padding: 10px 8px;
            font-size: 14px;
        }
        .popover-arrow {
            width: 0;
            height: 0;
            position: absolute;
            margin: auto;
        }
        .popover-arrow-top {
            border-top: 6px solid #ffffff;
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;

            left: 0;
            right: 0;
            bottom: -6px;
        }
        .popover-arrow-bottom {
            border-bottom: 6px solid #ffffff;
            border-right: 6px solid transparent;
            border-left: 6px solid transparent;

            left: 0;
            right: 0;
            top: -6px;
        }
        .popover-arrow-left {
            border-left: 6px solid #ffffff;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;

            bottom: 0;
            top: 0;
            right: -6px;
        }
        .popover-arrow-right {
            border-right: 6px solid #ffffff;
            border-top: 6px solid transparent;
            border-bottom: 6px solid transparent;

            bottom: 0;
            top: 0;
            left: -6px;
        }
    }
}
.trigger{
    display: inline-block;
}
</style>
