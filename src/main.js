import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'

import routes from './routes/index';
import store from './vuex/index';

// import './assets/iconfont/iconfont.css';
import './styles/animate.css';
import './styles/common.scss';
import './share/prototype';

//太卡了  暂时先不要了
//import '@/styles/font-family.css';

import directives from './share/directive';
import message from './plugins/message/index';
import imgViewer from './plugins/image-viewer/index';
import prototype from './share/prototype';

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(message);
Vue.use(imgViewer);


const router = new VueRouter({routes})
directives(Vue);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
