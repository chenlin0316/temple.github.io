<script setup>
import { ref } from 'vue'

// 定義跑馬燈的資料
const slides = ref([
  {
    id: 1,
    // 記得改成你實際的圖片檔名 (放在 public/images/ 下)
    image: '/temple.github.io/images/TempleGate.jpg', 
    title: '廟方簡介',
    desc: '點擊觀看王聖壇起源與發展',
    // 這裡放你要連結的 YouTube 網址
    link: 'https://www.youtube.com/watch?v=MHwBATzFTWc' 
  },
  {
    id: 2,
    image: '/temple.github.io/images/Pilgrimage.jpg',
    title: '一日進香',
    desc: '保佑合境平安，風調雨順 (點擊看影片)',
    link: 'https://www.youtube.com/watch?v=3HRijkw1D4o'
  },
  {
    id: 3,
    image: '/temple.github.io/images/Giving.jpg',
    title: '中元普渡',
    desc: '十方佈施，廣植福田',
    link: 'https://www.youtube.com/watch?v=gkQUic0w8WY'
  }
])
</script>
<template>
  <div id="carouselSection" class="carousel slide" data-bs-ride="carousel">
    
    <div class="carousel-indicators">
      <button 
        v-for="(slide, index) in slides" 
        :key="'indicator-' + slide.id"
        type="button" 
        data-bs-target="#carouselSection" 
        :data-bs-slide-to="index" 
        :class="{ active: index === 0 }"
        aria-current="true">
      </button>
    </div>

    <div class="carousel-inner">
      <div 
        v-for="(slide, index) in slides" 
        :key="slide.id" 
        :class="['carousel-item', { active: index === 0 }]">
        
        <a :href="slide.link" target="_blank" title="點擊觀看影片">
          <img :src="slide.image" class="d-block w-100" :alt="slide.title">
        </a>
        
        <div class="carousel-caption d-none d-md-block">
          <div class="bg-dark bg-opacity-50 p-2 rounded">
            <h5>{{ slide.title }} <i class="fa-brands fa-youtube text-danger"></i></h5>
            <p class="mb-0">{{ slide.desc }}</p>
          </div>
        </div>

      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselSection" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselSection" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<style scoped>
/* 讓圖片高度固定，避免切換時網頁跳動 (可依需求調整 height) */
.carousel-item img {
  height: 500px; 
  object-fit: cover; /* 確保圖片填滿但不變形 */
  cursor: pointer;   /* 讓滑鼠移上去變成手指形狀，提示可以點擊 */
}

/* 手機版高度自動調整，避免太高 */
@media (max-width: 768px) {
  .carousel-item img {
    height: 300px;
  }
}
</style>