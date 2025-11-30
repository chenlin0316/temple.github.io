<script setup>
import { ref } from 'vue'


// 接收外部傳入的設定
const props = defineProps({
  // layout: 決定是 'grid' (網格/預設) 還是 'scroll' (橫向滑動)
  layout: {
    type: String,
    default: 'grid'
  }
})

// 神明資料 (方便你以後新增)
const gods = ref([
  {
    id: 1,
    name: '主祀 - 西秦王爺',
    desc: '。',
    image: '/temple.github.io/images/God_XiChing_Ori.jpg' 
  },
  {
    id: 2,
    name: '天上聖母 (媽祖)',
    desc: '。',
    image: '/temple.github.io/images/God_Mazu.jpg'
  },
  {
    id: 3,
    name: '濟公活佛',
    desc: '。',
    image: '/temple.github.io/images/God_JiGong.jpg'
  },
  {
    id: 4,
    name: '玄天上帝',
    desc: '。',
    image: '/temple.github.io/images/God_Xuantian.jpg'
  },
  {
    id: 5,
    name: '福德正神',
    desc: '。',
    image: '/temple.github.io/images/God_Fude.jpg'
  },
])

// 記錄目前哪一張卡片被翻轉了 (存神明的 ID)
const activeCardId = ref(null)

// 處理互動邏輯
const handleInteraction = (id, type) => {
  // 偵測是否為觸控裝置 (手機/平板)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    // [手機版邏輯] 點擊觸發：如果是同一張就翻回來(null)，不同張就翻過去
    if (type === 'click') {
      activeCardId.value = activeCardId.value === id ? null : id;
    }
  } else {
    // [電腦版邏輯] 滑鼠 hover 觸發
    if (type === 'enter') activeCardId.value = id;
    if (type === 'leave') activeCardId.value = null;
  }
}

// 1. 取得容器的 DOM 元素
const scrollContainer = ref(null)

// 2. 定義滾輪事件處理函式
const onWheel = (evt) => {
  //處於滾輪模式時才啟動
  if (props.layout !== 'scroll') return;
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
  <section class="gods-section">
    <h2 class="section-title text-center mb-4">奉祀神明介紹</h2>
    
    
    <div :class="[
      'row', 
      layout === 'scroll' ? 'flex-nowrap overflow-auto pb-4 scroll-container' : ''
    ]" ref="scrollContainer"
      @wheel="onWheel">
      
      <div 
        v-for="god in gods" 
        :key="god.id"
        :class="[
          'mb-4 px-2',
          // 根據模式決定寬度
          layout === 'scroll' ? 'scroll-item' : 'col-12 col-md-6 col-lg-3'
        ]"
      >
        
        <div class="flip-card"
             @click="handleInteraction(god.id, 'click')"
             @mouseenter="handleInteraction(god.id, 'enter')"
             @mouseleave="handleInteraction(god.id, 'leave')">
             
          <div class="flip-card-inner" :class="{ 'is-flipped': activeCardId === god.id }">
            
            <div class="flip-card-front">
              <img :src="god.image" :alt="god.name" class="front-img">
              <div class="front-caption">
                <h4 class="fw-bold mb-0">{{ god.name }}</h4>
              </div>
            </div>

            <div class="flip-card-back" :style="{ backgroundImage: `url(${god.image})` }">
              <div class="back-overlay"></div>
              <div class="back-content">
                <h5 class="text-warning fw-bold mb-3">{{ god.name }}</h5>
                <p class="card-text">{{ god.desc }}</p>
              </div>
            </div>

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
}

/* =========================================
   滑動模式專用樣式 (Layout = Scroll)
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

/* 滑動模式下的卡片寬度 */
.scroll-item {
    flex: 0 0 auto;
    /* 手機版：85% (左右留空間，解決擁擠感，且暗示可滑動) */
    width: 85%; 
    max-width: 85%;
    margin: 5px;
}
@media (min-width: 768px) {
    .scroll-item {
        /* 電腦版滑動模式：一次看 3 張 */
        width: 33.3333%;
        max-width: 33.3333%;
    }
}

/* =========================================
   翻轉卡片核心 CSS
   ========================================= */
.flip-card {
  background-color: transparent;
  height: 600px; /* 卡片高度 */
  perspective: 1000px;
  cursor: pointer;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1); /* 優化動畫曲線 */
  transform-style: preserve-3d;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15); /* 加強陰影 */
}

/* ⚠️ 關鍵修改：用 class 控制翻轉，而不是 :hover */
.flip-card-inner.is-flipped {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
  overflow: hidden;
}

/* 正面 */
.flip-card-front {
  background-color: #fff;
}
.front-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.front-caption {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    color: #DAA520;
    text-shadow: 1px 1px 2px black;
}
.tap-hint {
    position: absolute;
    top: 15px;
    right: 15px;
    color: rgba(255,255,255,0.8);
    background: rgba(0,0,0,0.3);
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
}

/* 背面 */
.flip-card-back {
  transform: rotateY(180deg);
  background-size: cover;
  background-position: center;
}
.back-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 1;
}
.back-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
}
.back-content p {
    line-height: 1.8;
    text-align: justify;
    color: #eee;
}
</style>