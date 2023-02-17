import { createApp } from 'vue';
import UserLogin from './UserLogin/UserLogin.vue';
import router from './router';
import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';



axios.defaults.baseURL="http://127.0.0.1:8888";
// createApp(App).prototype.$http=axios;
// createApp(App).config.productionTip=false;
const app = createApp(UserLogin);
app.config.globalProperties.$http=axios;
app.config.productionTip=false;
app.use(ElementPlus);
app.use(router).mount('#app');
