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
        </div>
    </div>
</template>

<script>
import Icon from '@/components/base/icon/index';
import Avatar from '@/components/base/avatar/index';
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
        .logo-text {
            font-weight: 600;
            position: relative;
            .icon-github-fill{
                font-size: .625em;
                cursor: pointer;
                display: inline-block;
                transition: all .6s;
            }
            .icon-github-fill:hover{
                transition: all .6s;
                color: #000;
            }
        }
        .description {
            margin: 0 0 15px;
        }
    }
    .logo-right{

    }
}
    
</style>

