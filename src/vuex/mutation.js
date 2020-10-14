export default {
    setIsShowLoading(state, flag){
        state.isShowLoading = flag;
    },
    setIsLogin(state, flag){
        state.isLogin = flag;
    },
    setToken(state, obj){
        state.token = obj;
    }
}