import {createApp} from 'vue'
import App from './App.vue'

import router from './router/index';
import store from './vuex/index';

import './styles/animate.css';
import './styles/common.scss';
// import './share/prototype';

import directives from './share/directive';
// import message from './plugins/message/index';
// import imgViewer from './plugins/image-viewer/index';

const app = createApp(App);

// 全局插件
// app.use(message)
// .use(imgViewer)

app.use(router)
app.use(store)

// 插入全局指令
// directives(app)

app.mount('#app')
