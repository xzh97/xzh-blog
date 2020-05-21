<template>
    <div class="avatar-wrapper" :class="{'border-bottom': showBorderBottom}" :style="avatarStyle">
        <div class="avatar-inner" :class="activeClass">
            <img :src='avatarImg || avatar' alt='用户头像'>
        </div>
    </div>
</template>

<script>
/** 
 *
 * @summary 用户头像组件
 * @params size 用户头像框大小 默认32px
 * @params shape 用户头像框形状  默认 圆形
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-04-27 00:50:14 
 * Last modified  : 2019-04-27 01:22:48
 */
import defaultAvatar from '../../../assets/images/default_avatar.jpg';
export default {
    name: 'avatar',
    props:{
        size:{
            type: String,
            default: 'default'
        },
        shape:{
            type: String,
            default: 'circle'
        },
        avatarImg:{
            type: String,
        },
        showBorderBottom:{
            type: Boolean,
            default: true,
        },
        display: {
            type: String,
            default: 'inline-block',
        }
    },
    data(){
        return {
            avatar:defaultAvatar,
        }
    },
    computed:{
        activeClass(){
            let { size, shape, showBorderBottom} = this;
            return {
                'default-size':size === 'default',
                'small-size':size === 'small',
                'big-size':size === 'big',
                'square':shape !== 'circle',
            }
        },
        avatarStyle(){
            let { display } = this;
            return {
                display,
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '../../../styles/mixin.scss';
.avatar-wrapper{
    width: 100%;
    @include fsc;
    .avatar-inner{
        padding: 15px;
        box-sizing: content-box;
        img{
            display: block;
            border-radius: 50%;
            width: 100%;
            height: 100%;
        }
    }
    .avatar-name{
        color: #3d3d3d;
        font-size: .9em;
    }
    .default-size{
        width: 40px;
        height: 40px;
    }
    .small-size{
        width: 20px;
        height: 20px;
    }
    .big-size{
        width: 60px;
        height: 60px;
    }
    .square{
        border-radius: 0;
    } 
}
.border-bottom{
    border-bottom: 1px solid $border-color-base;
}
</style>

