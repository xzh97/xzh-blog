import Message from './index.vue';
import {close} from '../pluginHelper';
let $vm;
const message = {
    install(Vue,options){
        const messagePlugin = Vue.extend(Message);
        if(!$vm){
            $vm = new messagePlugin({
                el:document.createElement('div')
            });
            document.body.appendChild($vm.$el);
        }
        $vm.isShow = false;

        Vue.prototype.$message = (options) => {
            let durations = 1500;
            if(!options){return}
            else if(typeof options === 'string'){ //成功
                $vm.text = options;
            }
            else {
                let { type,text,duration = 1500} = options;
                $vm.type = type;
                $vm.text = text;
                durations = duration;
            }
            $vm.isShow = true;
            close($vm,durations)
        }
    }
}
export default message;