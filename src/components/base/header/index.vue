<template>
    <div class="header-wrapper" :class="{'header-fixed':scrollTop > 20}">
        <div class="header-left">
            <img class="logo" :src="logo" alt="">
        </div>
        <div class="header-right" :style="navWidth">
            <ul class="nav">
                <li class="nav-item" v-for="item in navList" :key="item.key" @click="goTo(item.path)">{{item.title}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import logoImg from '@/assets/images/logo.png'
export default {
    data() {
        return {
            logo:logoImg,
            scrollTop:0, //是否挂在首页
            navList:[
                {
                    title:'博客',
                    key:'blog',
                    path:'/home/blog',
                },
                {
                    title:'照片集',
                    key:'photos',
                    path:'/home/photos',
                },
                {
                    title:'吐槽说',
                    key:'tuCao',
                    path:'/home/tuCao',
                },
                {
                    title:'学习笔记',
                    key:'learn',
                    path:'/home/learn',
                },
            ]
        }
    },
    computed:{
        navWidth(){
            let { navList } = this;
            return { width:100 * navList.length + 'px'}
        }

    },
    mounted(){
        this.$nextTick( () => {
            window.onscroll = ()=> {
                let bodyScrollTop = 0, documentScrollTop = 0;
            　　if ( document.body ) {
            　　　　bodyScrollTop = document.body.scrollTop;
            　　}
            　　if( document.documentElement ){
            　　　　documentScrollTop = document.documentElement.scrollTop;
            　　}
            　　this.scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
            }    
        })
    },
    methods:{
        goTo(path){
            this.$router.push({path});
        }
    }
}
</script>

<style lang="scss" scoped>
.header-wrapper {
    width: 100%;
    height: 76px;
    padding: 8px 1vw;
    color:#ffffff;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    top: 0;
    left: 0;

    .header-left{
        width: 60px;
        height: 60px;
        .logo{
            width: 100%;
            height: 100%;
        }
    }
    .header-right{
        height: 60px;
        .nav{
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: space-around;
            .nav-item{
                width: 20%;
                height: 100%;
                line-height: 60px;
                text-align: center;

                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;

                cursor: pointer;
            }
            .nav-item:hover{
                color: #cccccc;
            }
        }
    }
}
.header-fixed{
    background: #292b2c !important;
    box-shadow: 0px 2px 2px rgba(255, 255, 255, 0.2);
}
</style>

