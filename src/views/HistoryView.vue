<script setup>
import { ref } from 'vue'
import Godlist from '../components/GodList.vue';
</script>

<template>
  <div class="history-page py-5">
    <div class="container">
      
      <section class="mb-5">
        <h2 class="section-title text-center mb-5">廟宇歷史沿革</h2>
        <div class="row align-items-center mb-5">
          <div class="col-md-6 mb-3">
            <img src="/images/TempleGate.jpg" class="img-fluid rounded shadow" alt="建廟初期">
            <p class="text-muted text-center small mt-2">▲ 民國 70 年建廟初期珍貴影像</p>
          </div>
          <div class="col-md-6">
            <h3 class="fw-bold text-danger">王聖壇的起源</h3>
            <p class="lead">本壇創建於民國60年間，由新進閣劇團發起</p>
            <p>王聖壇的歷史可以追溯到民國60年，當時林慶華先生成立了布袋戲班，名為「新進閣第二團」。在成立戲班之際，為了求得演出順利及演出路途的安全，他請回了西秦王爺、玄天上帝和福德正神的香火。最初以香火和木匾供奉，劇團在這些神明的庇佑下，演出順利。
            </p>
            <p>
              民國70年前後，林慶華的胞兄林正雄先生參與劇團演出，過程中受到媽祖娘娘的幫助，因此決定迎回天上聖母的香火供奉。隨後，林慶華為感念神明的庇佑，雕塑了西秦王爺、玄天上帝和福德正神的金身供奉，而林正雄也雕塑了天上聖母的金身，這些舉動奠定了王聖壇後續建立的基礎。
            </p>
          </div>
        </div>
      </section>

      <section class="mb-5">
        <h2 class="section-title text-center mb-5"> 王聖壇的重建與發展</h2>
        <div class="row align-items-center mb-5">
          <div class="col-md-6 mb-3">
            <img src="/images/temple_rebuild.jpg" class="img-fluid rounded shadow" alt="建廟初期">
            <p class="text-muted text-center small mt-2">▲ 民國 90 年 重建後影像</p>
          </div>
          <div class="col-md-6">
            <h3 class="fw-bold text-danger"> 重建與發展</h3>
            <p class="lead">壇生及信眾的加入，以及廟宇的重建</p>
            <p>
              進入民國87年，王聖壇經歷多次變遷，回到黎明村進行進香活動。此時，楊進祥、楊慶裕、王慶得、張文寶、林志富、林石星、林志乾等壇生也加入。
              活動結束時，大家向林慶華先生建議將壇留於黎明村，因此眾壇生集資向張來福先生購買古厝，作為廟壇的所在地，固定為大眾解惑救苦。
            </p>
            <p>
              隨後，陳泉山先生從苗栗來到壇中參拜，看到古厝已經十分老舊，供奉神佛的環境不安穩，也不便於祭祀活動及幫助信眾。他主動提出願意幫忙募集資金，壇生與信眾們自發募集資金並進行義工工作。
              經過黎明村的許多義工及親朋好友共同努力，最終在民國90年完成了現在的王聖壇的樣貌。
              隨著時間推移及世代更替，目前主乩為林志勝擔任，其他乩身有楊進祥、林志富、王慶得、陳建佑、韓鴻裕、陳偉嘉等人，並有眾多壇生共同為信眾服務。
            </p>
          </div>
        </div>
      </section>


      <hr class="my-5" style="border-top: 2px dashed #DAA520;">

      <section>
        <Godlist layout="scroll"></Godlist>
      </section>


      <div class="mt-5 border-top border-3 border-danger pt-5 text-center">
        <p class="display-6 fw-bold" style="color: #8B0000;">
          感謝一路走來所有師兄師姐、信眾及義工的支持與付出。
        </p>
        <p class="fs-4 mt-3" style="color: #8B0000;">
          王聖壇會持續秉持信念，為眾人祈福、為社會盡心。 🙏
        </p>
      </div>

    </div>
  </div>

</template>

<style scoped>
  .thank-you-box {
    border: 2px solid #DAA520; /* 金色邊框 */
    border-radius: 15px;       /* 圓角 */
  }
  .section-title {
      color: #8B0000;
      border-bottom: 3px solid #DAA520;
      display: inline-block;
      padding-bottom: 10px;
  }

  /* 神明照片特效 */
  .god-img {
      height: 300px;
      object-fit: cover;
      transition: transform 0.5s;
  }
  .god-card:hover .god-img {
      transform: scale(1.1); 
  }
</style>