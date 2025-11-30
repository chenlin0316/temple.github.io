import { createRouter, createWebHashHistory } from 'vue-router'
import { auth } from './firebase'
//官網路由
import HomeView from './views/HomeView.vue'
import HistoryView from './views/HistoryView.vue'
import GodsInfo from './views/GodsInfoView.vue'
//後臺路由
import Login from './views/admin/Login.vue'; // 引入登入頁
import Dashboard from './views/admin/Dashboard.vue'; 
import NewsManager from './views/admin/NewsManager.vue'

// 設定路由表
const routes = [
  { path: '/', component: HomeView },          // 首頁
  { path: '/history', component: HistoryView }, // 沿革頁
  { path: '/gods-intro', component: GodsInfo },

  { path: '/admin', component: Login },
  { 
    path: '/admin/dashboard', 
    component: Dashboard,
    meta: { requiresAuth: true } // 👈 貼上標籤：這一頁需要權限！
  },
  { path: '/admin/newsmanger', component: NewsManager },
]

const router = createRouter({
  // ⚠️ 這裡一定要用 Hash 模式，GitHub Pages 才不會壞掉
  history: createWebHashHistory(),
  routes,
// 👇 關鍵修改：控制捲動行為
  scrollBehavior(to, from, savedPosition) {
    // 1. 如果目標網址有 #錨點 (例如 #news)
    if (to.hash) {
      return {
        el: to.hash,       // 捲動到該 ID 的元素
        behavior: 'smooth', // 平滑捲動
        top: 80            // 預留頂部空間 (避開導覽列)
      }
    }
    // 2. 如果是按上一頁/下一頁，回到原本位置
    if (savedPosition) {
      return savedPosition
    }
    // 3. 否則預設捲到最上面
    return { top: 0 }
  }
})

// 👇👇👇 重點：全域導航守衛 (Security Guard) 👇👇👇
router.beforeEach((to, from, next) => {
  // 1. 檢查目標頁面是否需要權限 (有沒有 meta.requiresAuth)
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
  // 2. 檢查目前使用者是否已登入
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    // ✋ 如果需要權限但沒登入 -> 踢回登入頁
    next('/admin');
  } else if (to.path === '/admin' && currentUser) {
    // 🤔 如果已經登入卻還想去登入頁 -> 直接送去 Dashboard
    next('/admin/dashboard');
  } else {
    // ✅ 通行
    next();
  }
});
export default router