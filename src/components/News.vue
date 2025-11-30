<script setup>
import { ref } from 'vue'


// 定義公告資料 (以後如果要串接後端 API，就是替換這裡的資料)
const newsList = ref([
  { 
    id: 1, 
    title: '春節點燈開始受理', 
    date: '2025/01/10', 
    content: '即日起開始受理太歲燈、光明燈、財利燈登記，請信眾提早報名。',
    icon: 'fa-bell' 
  },
  { 
    id: 2, 
    title: '媽祖聖誕祝壽大典', 
    date: '2025/04/20', 
    content: '農曆三月二十三日將舉辦祝壽三獻禮，歡迎十方善信蒞臨參拜。',
    icon: 'fa-calendar-days' 
  },
  { 
    id: 3, 
    title: '中元普渡', 
    date: '2025/9/01', 
    content: '下個月將舉行十方佈施大會，歡迎信眾報名。',
    icon: 'fa-bowl-food' 
  },
  { 
    id: 4, 
    title: '祈福平安宴席', 
    date: '2025/12/01', 
    content: '下個月將進行祈福平安宴席，歡迎信眾報名呷平安，擲筊求平安米。',
    icon: 'fa-bowl-food' 
  },
  { 
    id: 5, 
    title: '志工招募', 
    date: '2025/12/15', 
    content: '誠徵假日導覽志工，歡迎熱心民眾報名參加。',
    icon: 'fa-users' 
  }
])

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
    <div class="text-center">
      <h2 class="section-title">最新訊息公告</h2>
      <p class="text-muted small">
        <i class="fa-solid fa-hand-pointer"></i> 左右滑動查看更多
      </p>
    </div>

    <div class="row flex-nowrap overflow-auto pb-4 scroll-container" ref="scrollContainer"
      @wheel="onWheel">      
      
      <div class="news-col mb-3 px-2" v-for="news in newsList" :key="news.id">
        
        <div class="card news-card shadow-sm border-0">
          <div class="card-body d-flex flex-column justify-content-between">
            <div>
              <h5 class="card-title text-danger fw-bold">
                <i :class="['fa-solid', news.icon]"></i> {{ news.title }}
              </h5>
              <p class="card-text mt-3">{{ news.content }}</p>
            </div>
            <p class="text-muted small mb-0 mt-3 border-top pt-2">
              <i class="fa-regular fa-clock"></i> {{ news.date }}
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