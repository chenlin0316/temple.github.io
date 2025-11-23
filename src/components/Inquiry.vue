<template>
  <section id="inquiry" class="py-5 text-center" style="background-color: #FFF8E1;">
    <div class="container">
      <h2 class="section-title">線上問事申請</h2>
      <p class="lead mb-4">若您有生活上的困惑或需要祈求指點，歡迎填寫下方表單預約。</p>
      
      <a href="https://forms.google.com/" target="_blank" class="btn btn-danger btn-lg px-5 py-3 rounded-pill shadow">
        <i class="fa-solid fa-pen-to-square"></i> 點擊填寫預約表單
      </a>
      <p class="mt-3 text-muted small">（點擊後將開啟 Google 表單）</p>
    </div>
  </section>
</template>

<style scoped>
/* 元件內的 h2 樣式因為有 scoped 屬性，可能吃不到全域設定 */
/* 這裡重新定義一次，確保樣式正確 */
.section-title {
    color: #8B0000;
    border-bottom: 3px solid #DAA520;
    display: inline-block;
    padding-bottom: 10px;
    margin-bottom: 30px;
}
</style>