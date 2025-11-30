import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import HistoryView from './views/HistoryView.vue'
import GodsInfo from './views/GodsInfoView.vue'

// 設定路由表
const routes = [
  { path: '/', component: HomeView },          // 首頁
  { path: '/history', component: HistoryView }, // 沿革頁
  { path: '/gods-intro', component: GodsInfo }
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

export default router