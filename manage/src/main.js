import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons';
import config from './config'
import request from './Utils/request'
import storage from './Utils/storage'
import api from './api'
import store from './store'
console.log("环境变量==>",import.meta.env);

const app = createApp(App);
console.log('mockAPI',config.mockApi);
// this.$request(
// {
// methods: 'get',
// url: config. mockApi +'/login'
// }
// ).then((res)=>{
//     console.log(res)
// })

// 注册全局图标
// for (let [key, component] of Object.entries(ElementPlusIconsVue)) {
//     app.component(key, component);
//   }
for(let iconName in  ElementPlusIconsVue){
    app.component(iconName, ElementPlusIconsVue[iconName])
}
//全局挂载变量
app.config.globalProperties.$request = request;
//全局挂载变量
app.config.globalProperties.$storage = storage;
app.config.globalProperties.$api = api;
app.use(router).use(store).use(ElementPlus,{size:'small'}).mount('#app');

