import Vue from 'vue'
import App from './App.vue'

import router from './routes/index';

//import './assets/iconfont/iconfont.css'; //暂时先用在线css
import './styles/animate.css';
import './styles/common.scss';
import {Button, Select, Switch, Modal, Upload, Icon, Radio, Comment, Avatar, Row, Col,} from 'ant-design-vue';
const RadioGroup = Radio.Group;
const Option = Select.Option;

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Option.name, Option);
Vue.component(Switch.name, Switch);
Vue.component(Modal.name, Modal);
Vue.component(Upload.name, Upload);
Vue.component(Icon.name, Icon);
Vue.component(Comment.name, Comment);
Vue.component(Avatar.name, Avatar);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);

import directives from './share/directive';
import message from './plugins/message/index';

Vue.config.productionTip = false

Vue.use(message);
directives(Vue);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
