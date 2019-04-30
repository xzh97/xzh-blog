// 插件关闭方法
export const close = ($vm,duration)=>{
    setTimeout(() => {
        $vm.isShow = false;
    },duration)
}
export default {
    close,
}