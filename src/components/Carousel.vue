<template>
  <div id="carouselSection" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselSection" data-bs-slide-to="0" class="active"></button>
      <button type="button" data-bs-target="#carouselSection" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#carouselSection" data-bs-slide-to="2"></button>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://placehold.co/1200x500/8B0000/FFF?text=活動花絮+1" class="d-block w-100" alt="活動一">
        <div class="carousel-caption d-none d-md-block">
          <h5>年度祈福大法會</h5>
          <p>信眾踴躍參與，共沐神恩。</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://placehold.co/1200x500/DAA520/FFF?text=繞境活動+2" class="d-block w-100" alt="活動二">
        <div class="carousel-caption d-none d-md-block">
          <h5>平安繞境</h5>
          <p>保佑合境平安，風調雨順。</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://placehold.co/1200x500/333/FFF?text=中元普渡+3" class="d-block w-100" alt="活動三">
        <div class="carousel-caption d-none d-md-block">
          <h5>中元普渡</h5>
          <p>十方佈施，廣植福則。</p>
        </div>
      </div>
    </div>

    <button class="carousel-control-prev" type="button" data-bs-target="#carouselSection" data-bs-slide="prev">
      <span class="carousel-control-prev-icon"></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselSection" data-bs-slide="next">
      <span class="carousel-control-next-icon"></span>
    </button>
  </div>
</template>

<style scoped>
/* 如果需要針對跑馬燈微調樣式寫在這裡 */
</style>