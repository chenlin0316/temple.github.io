<script setup>
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

// 登出功能
const handleLogout = async () => {
  await signOut(auth);
  alert('已登出');
  router.push('/admin'); // 踢回登入頁
};
</script>

<template>
  <div class="dashboard-container">
    <nav class="navbar navbar-dark bg-dark px-4 py-3 d-flex justify-content-between">
      <span class="navbar-brand mb-0 h1">
        <i class="fa-solid fa-gear"></i> 廟宇後台管理系統
      </span>
      <button @click="handleLogout" class="btn btn-outline-light btn-sm">
        <i class="fa-solid fa-right-from-bracket"></i> 登出
      </button>
    </nav>

    <div class="container py-5">
      <h2 class="mb-4">👋 歡迎回來，管理員</h2>
      
      <div class="row">
        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm hover-card">
            <div class="card-body text-center py-5">
              <i class="fa-solid fa-bullhorn text-danger fa-3x mb-3"></i>
              <h4 class="card-title">最新消息管理</h4>
              <p class="text-muted">發布、修改或刪除網站公告</p>
              <router-link to="/admin/newsmanger" class="btn btn-danger mt-2">
                進入管理
              </router-link>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm hover-card">
            <div class="card-body text-center py-5">
              <i class="fa-solid fa-user-plus text-warning fa-3x mb-3"></i>
              <h4 class="card-title">神明介紹管理</h4>
              <p class="text-muted">新增或編輯供奉神明資料</p>
              <button class="btn btn-warning mt-2 text-white" disabled>即將開放</button>
            </div>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm hover-card">
            <div class="card-body text-center py-5">
              <i class="fa-solid fa-images text-primary fa-3x mb-3"></i>
              <h4 class="card-title">跑馬燈管理</h4>
              <p class="text-muted">更換首頁輪播圖片與連結</p>
              <button class="btn btn-primary mt-2" disabled>即將開放</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-card {
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: translateY(-5px);
}
</style>