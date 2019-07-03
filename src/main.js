import Vue from 'vue'
import App from './App.vue'

import router from './routes/index';

//import './assets/iconfont/iconfont.css'; //暂时先用在线css
import './styles/animate.css';
import './styles/common.scss'
import {Button, Select, Switch} from 'ant-design-vue';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Switch.name, Switch);
import directives from './share/directive';
import message from './plugins/message/index';

Vue.config.productionTip = false

Vue.use(message);
directives(Vue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
