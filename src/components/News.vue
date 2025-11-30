<script setup>
import { ref, onMounted, computed } from 'vue'
import { db } from '../firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'

// 資料改為空陣列，等待從雲端抓取
const rawNewsList = ref([])
const loading = ref(true)

// 👇 核心邏輯：透過 computed 自動計算顯示的列表
const displayNewsList = computed(() => {
  // 1. 取得今天的日期 (格式: YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  return rawNewsList.value
    // A. 過濾：只保留 (沒有設下架日期) 或 (下架日期還沒到) 的資料
    .filter(item => {
      if (!item.endDate) return true; // 沒設期限 -> 永遠顯示
      return item.endDate >= today;   // 期限 >= 今天 -> 顯示
    })
    // B. 排序：置頂優先，其次看日期
    .sort((a, b) => {
      // 如果 a 置頂但 b 沒置頂 -> a 排前面 (-1)
      if (a.isTop && !b.isTop) return -1;
      // 如果 b 置頂但 a 沒置頂 -> b 排前面 (1)
      if (!a.isTop && b.isTop) return 1;
      // 如果置頂狀態一樣 -> 比較日期 (新的在前面)
      return b.date.localeCompare(a.date);
    });
});

const fetchNews = async () => {
  try {
    // 這裡我們只抓資料，邏輯交給前端 computed 處理 (避免 Firestore 複雜索引問題)
    const q = query(collection(db, 'news')); // 抓全部
    const querySnapshot = await getDocs(q);
    
    const tempNews = [];
    querySnapshot.forEach((doc) => {
      tempNews.push({ id: doc.id, ...doc.data() });
    });
    
    rawNewsList.value = tempNews;
  } catch (e) {
    console.error("讀取失敗:", e);
  } finally {
    loading.value = false;
  }
}

// 畫面載入時執行抓取
onMounted(() => {
  fetchNews()
})

// 1. 取得容器的 DOM 元素
const scrollContainer = ref(null)

// 2. 定義滾輪事件處理函式
const onWheel = (evt) => {
  // 確認容器存在
  if (!scrollContainer.value) return;

  // 如果這是一個垂直滾動 (deltaY 不為 0)
  if (evt.deltaY !== 0) {
    // 🛑 關鍵：阻止網頁原本的「上下捲動」行為
    evt.preventDefault();

    // ✅ 轉換：把「垂直滾動量」加到「水平捲軸位置」上
    // += 代表往右，-= 代表往左
    scrollContainer.value.scrollLeft += evt.deltaY;
  }
}
</script>

<template>
  <section id="news" class="container py-5">
    
    <div class="d-flex justify-content-between align-items-end mb-4 border-bottom border-warning pb-2">
      <h2 class="text-danger mb-0 fw-bold">
        <i class="fa-solid fa-bullhorn"></i> 最新公告
      </h2>    
    </div>

    <div 
      class="row flex-nowrap overflow-auto pb-4 scroll-container" 
      ref="scrollContainer"
      @wheel="onWheel"
    >
      
      <div v-if="loading" class="col-12 text-center py-5">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2 text-muted">公告載入中...</p>
      </div>

      <div v-else-if="displayNewsList.length === 0" class="col-12 text-center py-5">
        <p class="text-muted">目前沒有最新公告</p>
      </div>

      <div class="news-col mb-3 px-2" v-for="news in displayNewsList" :key="news.id">
        
        <div class="card news-card shadow-sm border-0 position-relative">
          
          <div v-if="news.isTop" class="position-absolute top-0 end-0 m-2" style="z-index: 10;">
            <span class="badge bg-warning text-dark shadow-sm">
              <i class="fa-solid fa-thumbtack"></i> 置頂
            </span>
          </div>

          <img v-if="news.image" :src="news.image" class="card-img-top" style="height: 150px; object-fit: cover;" alt="公告圖片">
          
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title text-danger fw-bold">
                <i :class="['fa-solid', news.icon]"></i> {{ news.title }}
              </h5>
              <p class="card-text mt-3 text-secondary">{{ news.content }}</p>
            </div>
            <p class="text-muted small mb-0 mt-3 border-top pt-2 d-flex justify-content-between">
              <span><i class="fa-regular fa-clock"></i> {{ news.date }}</span>
              </p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>

.section-title {
    color: #8B0000;
    border-bottom: 3px solid #DAA520;
    display: inline-block;
    padding-bottom: 10px;
    margin-bottom: 30px;
}

/* =========================================
   1. 高度調整
   ========================================= */
.news-card {
    /* 設定最小高度，讓電腦版看起來比較高、整齊 */
    min-height: 280px; 
    /* 如果覺得不夠高，可以把 280px 改成 350px */
}

/* =========================================
   2. 寬度控制 (手機 vs 電腦)
   ========================================= */
.news-col {
    flex: 0 0 auto; /* 禁止被壓縮 */
    
    /* [手機版] 預設寬度：85% 
       這樣可以完整看到一張，右邊露出一點點下一張，提示可以滑動 */
    width: 85%;
    max-width: 85%;
    
    /* 如果你希望手機版「一次看到兩張」，請把上面的 85% 改成 50% */
}

/* [電腦版] 當螢幕大於 768px 時 */
@media (min-width: 768px) {
    .news-col {
        /* 回復成一次看三張 (33.33%) */
        width: 33.3333%;
        max-width: 33.3333%;
    }
}

/* =========================================
   3. 捲軸美化
   ========================================= */
.scroll-container::-webkit-scrollbar {
    height: 8px;
}
.scroll-container::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}
.scroll-container::-webkit-scrollbar-thumb {
    background: #DAA520;
    border-radius: 4px;
}
.scroll-container::-webkit-scrollbar-thumb:hover {
    background: #8B0000;
}
</style>