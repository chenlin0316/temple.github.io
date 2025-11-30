<script setup>
import { ref } from 'vue';
import { auth } from '../../firebase'; // 引入我們設定好的 auth
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    // Firebase 登入
    await signInWithEmailAndPassword(auth, email.value, password.value);
    // 登入成功，跳轉到後台首頁 (我們等一下會建)
    router.push('/admin/dashboard');
  } catch (error) {
    console.error(error);
    errorMsg.value = '登入失敗：帳號或密碼錯誤';
  }
};
</script>

<template>
  <div class="login-container d-flex justify-content-center align-items-center">
    <div class="card shadow p-4" style="width: 400px;">
      <h3 class="text-center mb-4 fw-bold text-danger">廟宇後台登入</h3>
      
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">管理員信箱</label>
          <input type="email" class="form-control" v-model="email" required>
        </div>
        
        <div class="mb-3">
          <label class="form-label">密碼</label>
          <input type="password" class="form-control" v-model="password" required>
        </div>

        <div v-if="errorMsg" class="alert alert-danger py-2 small">
          {{ errorMsg }}
        </div>

        <button type="submit" class="btn btn-danger w-100">登入系統</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 80vh; /* 讓登入框置中 */
  background-color: #f8f9fa;
}
</style>