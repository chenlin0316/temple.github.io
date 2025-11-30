import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

// 引入 Bootstrap 的 CSS 和 JS
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
app.use(router) // 👈 告訴 Vue 使用路由
app.mount('#app')
