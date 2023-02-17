import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';


const app = createApp(App);
axios.defaults.baseURL="http://127.0.0.1:8888";
// app.prototype.$http=axios;
// app.config.productionTip=false;
// 定义一个名为 button-counter 的新全局组件
app.component('button-counter', {
    data() {
      return {
        count: 0
      }
    },
    template: `
      <button @click="count++">
        点了 {{ count }} 次！
      </button>`
  })

app.use(router).mount('#app');
