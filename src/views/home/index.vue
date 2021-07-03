<template>
    <div class="blog-wrapper">
        <div class="blog-tab">
            <div 
                v-for="tab in tabs" 
                :key="tab.id"
                :class="['tab-item', {'active': activeTab === tab.id}]"
                @click="handleTabClick(tab.id)"
                class="">
            {{tab.name}}    
            </div>
        </div>
        <div class="blog-list-wrapper">
            <list :data-source="blogList">
                <li v-for="item in blogList"
                    :key="item.blogOid"
                >
                    

                </li>
            </list>
        </div>
    </div>
</template>

<script>
import { getBlogList, getCategories } from "@/api/blog";
import dayJS from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayJS.extend(relativeTime);
import Pagination from "@/components/base/pagination-v2";
import List from '@/components/base/list'
import {reactive, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router'
export default {
    name: "home",
    components: {
        Pagination,
        List
    },
    setup(){
        const route = useRoute();
        const router = useRouter();
        const state = reactive({
            blogList: [],
            activeTab: 'index',
            tabs: [
                {
                    id: 'index',
                    name: '热门'
                },
                {
                    id: 'newest',
                    name: '最新'
                },
                {
                    id: 'threeDaysHottest',
                    name: '热榜'
                }
            ]
        })
        const getBlogListData = () => {
            getBlogList({ page: 1, size: 8 }).then(
                res => {
                    console.log(res);
                    res.data.forEach(item => {
                        item.createTimeFromNow = dayJS(item.createTime).fromNow();

                        item.createTime = dayJS(item.createTime).format('ddd,YY MMM Do');
                    });
                    state.blogList = res.data.data;
                }
            );
        }
        onMounted(getBlogListData);

        const goDetail = blogOid => {
            router.push({
                path:`blog/detail/${blogOid}`
            })
        }

        const handleTabClick = id => {
            state.activeTab = id;
        }

        return {
            ...state,
            goDetail,
            getBlogList,
            handleTabClick,
        }
    },

    beforeRouteEnter (to, from, next) {
        next();
    },
    beforeRouteLeave (to, from, next) {
        // this.setIsShowLoading(true);
        next();
    },
    
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.blog-wrapper{
    max-width: 700px;
    background: #fff;
    margin-top: 1.3rem;
    .blog-tab{
        @include fsc();
        border: 1px solid #eeeeee;
        .tab-item{
            font-size: 1rem;
            padding: 1.3rem 1rem;
        }
        .tab-item.active{
            color: $primary-color;
        }
        .tab-item:hover{
            color: $primary-color;
            cursor: pointer;
        }
    }
}
</style>

