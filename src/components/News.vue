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
    title: '祈福平安宴席', 
    date: '2025/12/01', 
    content: '下個月將進行祈福平安宴席，歡迎信眾報名呷平安，擲筊求平安米。',
    icon: 'fa-bowl-food' 
  }
])
</script>

<template>
  <section id="news" class="container py-5">
    <div class="text-center">
      <h2 class="section-title">最新訊息公告</h2>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="news in newsList" :key="news.id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title text-danger">
              <i :class="['fa-solid', news.icon]"></i> {{ news.title }}
            </h5>
            <p class="card-text">{{ news.content }}</p>
            <p class="text-muted small">{{ news.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
/* 元件內的 h2 樣式因為有 scoped 屬性，可能吃不到全域設定 */
/* 這裡重新定義一次，確保樣式正確 */
.section-news {
    padding-bottom: 15px;
    margin-bottom: 30px;
}
</style>