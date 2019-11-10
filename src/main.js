import Vue from 'vue'
import App from './App.vue'

import router from './routes/index';

//import './assets/iconfont/iconfont.css'; //暂时先用在线css
import './styles/animate.css';
import './styles/common.scss';

//太卡了  暂时先不要了
//import '@/styles/font-family.css';

import directives from './share/directive';
import message from './plugins/message/index';
import imgViewer from './plugins/image-viewer/index';

Vue.config.productionTip = false

Vue.use(message);
Vue.use(imgViewer);
directives(Vue);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
