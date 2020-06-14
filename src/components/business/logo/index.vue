<template>
    <div class="logo">
        <div class="logo-left">
            <Avatar
                :avatar-img="getUserInfo.avatar"
                :show-border-bottom="false"
                :size="'big'"
            >
            </Avatar>
        </div>
        <div class="logo-center">
            <h2 class="logo-text">{{getUserInfo.nickName}} </h2>
            <p class="description">{{getUserInfo.slogan}}</p>
        </div>
        <div class="logo-right">
            <div class="logo-right-top">
                <Icon :key="item.type" v-for="item in iconList" @click="baseClick(item)" :type="item.type" fill />
            </div>
            <div class="logo-right-bottom">
                <Button :type="'primary'">
                    编辑资料
                </Button>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '@/components/base/icon/index';
import Avatar from '@/components/base/avatar/index';
import Button from '@/components/base/button/index';
import {mapGetters} from 'vuex'
export default {
    name: 'logo',
    computed: {
        ...mapGetters([
            'getUserInfo'
        ])
    },
    data(){
        return {
            iconList: [
                {
                    type: 'github',
                    action: 'github',
                    link: 'https://github.com/xzh97'
                },
                {
                    type: 'wechat',
                    action: 'wechat',
                    link: 'https://github.com/xzh97'
                },
            ],
        }
    },
    methods:{
        baseClick(item){
            this.goToLink(item.link);
        },
        goToLink(link){
            window.open(link,'_blank');
        },
    },
    components:{
        Icon,
        Avatar,
        Button
    }
}
</script>

<style lang="scss" scoped>
@import '../../../styles/mixin.scss';
.logo{
    @include fac;
    padding: 20px;
    margin-top: 20px;
    .logo-left{
        margin-right: 20px;
    }
    .logo-center{
        flex: 1;
        .logo-text {

        }
        .description {
            margin: 0 0 15px;
        }
    }
    .logo-right{
        margin-right: 20px;
        .logo-right-top{
            margin: 16px 0;
            .iconfont{
                font-size: 20px;
                margin-right: 20px;

            }
        }
    }
}
    
</style>

