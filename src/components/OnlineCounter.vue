<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// 👇 改從我們剛建好的 firebase.js 引入 rtdb
import { rtdb } from '../firebase'; 
import { 
  ref as dbRef, 
  onValue, 
  push, 
  onDisconnect, 
  set, 
  serverTimestamp 
} from "firebase/database";

const onlineCount = ref(0); // 綁定畫面上的人數

onMounted(() => {
  // 定義這台裝置在資料庫的位置： /connections/亂數ID
  const listRef = dbRef(rtdb, 'connections');
  const userRef = push(listRef);

  // 監聽：一旦連上 Firebase
  const connectedRef = dbRef(rtdb, '.info/connected');
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      // A. 當我連上時，把自己寫入資料庫
      set(userRef, {
        joinedAt: serverTimestamp()
      });

      // B. 設定「當我斷線時 (關閉視窗)」，自動把我從資料庫移除
      // 這是 Firebase 最強大的功能，不用怕使用者直接關瀏覽器
      onDisconnect(userRef).remove();
    }
  });

  // 監聽：隨時計算目前有多少人 (/connections 裡有幾筆資料)
  onValue(listRef, (snap) => {
    onlineCount.value = snap.exists() ? snap.size : 0;
  });
});
</script>

<template>
  <div class="online-badge">
    <span class="pulse-dot"></span>
    目前線上信眾：{{ onlineCount }} 人
  </div>
</template>

<style scoped>
.online-badge {
  display: inline-flex;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

/* 綠色呼吸燈效果 */
.pulse-dot {
  width: 10px;
  height: 10px;
  background-color: #00ff00;
  border-radius: 50%;
  margin-right: 8px;
  box-shadow: 0 0 0 rgba(0, 255, 0, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(0, 255, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
  }
}
</style>