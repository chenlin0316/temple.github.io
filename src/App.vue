<script setup>
  import Navbar from './components/Navbar.vue'
  import Footer from './components/Footer.vue'
</script>

<template>
  <Navbar />
  <div style="margin-bottom: 15px;"></div>
  <router-view />

  <Footer></Footer>
</template>

<style>
/* 全域樣式設定 */
:root {
    --temple-red: #8B0000;
    --temple-gold: #DAA520;
}

html {
    /* 1. 預留頂部空間：數值要比導覽列高度大一點 (建議 70px 或 80px) */
    scroll-padding-top: 80px;
    
    /* 2. 平滑滾動：讓畫面是用「滑」的過去，而不是瞬間跳過去，質感會更好 */
    scroll-behavior: smooth;
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