import {getItem} from '@/utils/utils';
export default {
    isShowLoading(state){
        return state.isShowLoading;
    },
    isLogin(state){
        return state.isLogin;
    },
    getUserToken(state){
        return state.token || getItem('token');
    }
}