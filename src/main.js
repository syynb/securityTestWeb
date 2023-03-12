import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import installElementPlus from './plugins/element'



axios.defaults.baseURL="http://127.0.0.1:8888";
// createApp(App).prototype.$http=axios;
// createApp(App).config.productionTip=false;
const app = createApp(App);
app.config.globalProperties.$http=axios;
app.config.productionTip=false;
app.use(ElementPlus);
app.use(router).mount('#app');
