import Vue from 'vue'
import App from './App.vue'

import router from './routes/index';

import './styles/common.scss';
import './assets/iconfont/iconfont.css';

import directives from './share/directive';
import message from './plugins/message/index';
Vue.config.productionTip = false

Vue.use(message);
directives(Vue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
