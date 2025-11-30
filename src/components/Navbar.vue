<script setup>
import OnlineCounter from './OnlineCounter.vue'
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: #8B0000;">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="fa-solid fa-place-of-worship"></i> 王聖壇
      </router-link>
      <div class="ms-3">
        <OnlineCounter />
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              廟宇簡介
            </a>

            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <router-link class="dropdown-item" to="/history">
                  王聖壇歷史沿革
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link class="dropdown-item" to="/gods-intro">
                  主祀神明介紹
                </router-link>
              </li>
            </ul>
          </li>

          <li class="nav-item"><router-link class="nav-link" :to="{ path: '/', hash: '#news' }">訊息公告</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ path: '/', hash: '#traffic' }">交通資訊</router-link></li>
        </ul>       
      </div>
    </div>
  </nav>
</template>

<style scoped>
  .nav-link:hover {
      color: #DAA520 !important;
  }

  /* 1. 下拉選單的外框 */
  .dropdown-menu {
      background-color: #8B0000;  /* 背景改深紅 (跟 Navbar 一樣) */
      border: 1px solid #DAA520;  /* 加上金色邊框 */
      border-radius: 8px;         /* 圓角稍微大一點 */
      margin-top: 10px;           /* 讓選單跟導覽列保持一點距離，不要黏太緊 */
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3); /* 加上陰影讓它浮起來 */
  }

  /* 2. 選單內的連結文字 */
  .dropdown-item {
      color: white !important;    /* 強制文字變白色 */
      font-weight: 500;
      padding: 10px 20px;         /* 增加一點點擊範圍 */
      transition: all 0.3s;       /* 讓變色有動畫效果 */
  }

  /* 3. 滑鼠移上去的效果 (Hover) */
  .dropdown-item:hover, 
  .dropdown-item:focus {
      background-color: #8B0000;
      color: #DAA520 !important;
  }

  /* 4. 分隔線 (Divider) */
  .dropdown-divider {
      border-top: 1px solid rgba(218, 165, 32, 0.5); /* 金色半透明線條 */
  }
</style>