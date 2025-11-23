<script setup>
// 引入我們建立的所有元件
import Navbar from './components/Navbar.vue'
import Carousel from './components/Carousel.vue'
import News from './components/News.vue'
import Inquiry from './components/Inquiry.vue'
import Traffic from './components/Traffic.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  
  <main>
    <Carousel />
    <News />
    <Inquiry />
    <Traffic />
  </main>

  <Footer></Footer>
</template>

<style>
/* 全域樣式設定 */
:root {
    --temple-red: #8B0000;
    --temple-gold: #DAA520;
}
body {
    font-family: "Microsoft JhengHei", sans-serif;
    background-color: #fcfcfc;
    padding-top: 56px; /* 為了避開固定導覽列的遮擋 */
}
h2.section-title {
    color: var(--temple-red);
    border-bottom: 3px solid var(--temple-gold);
    display: inline-block;
    padding-bottom: 10px;
    margin-bottom: 30px;
}
</style>