<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../../firebase'; // 引入資料庫
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  updateDoc,
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';

// 公告列表資料
const newsList = ref([]);
const loading = ref(false);
const isEditing = ref(false);
const editingId = ref(null);

// 新增表單的暫存資料
const newPost = ref({
  title: '',
  date: '',
  endDate: '', // 下架日期 (選填)
  content: '',
  icon: 'fa-bell',
  image: '',
  isTop: false // 是否置頂
});

// 定義一些常用圖示讓管理員選
const iconOptions = [
  { label: '鈴鐺 (一般公告)', value: 'fa-bell' },
  { label: '日曆 (活動日期)', value: 'fa-calendar-days' },
  { label: '工具 (整修工程)', value: 'fa-wrench' },
  { label: '卷軸 (法會科儀)', value: 'fa-scroll' },
  { label: '人員 (志工招募)', value: 'fa-users' },
  { label: '食物 (平安宴)',   value: 'fa-bowl-food' }
];

// 1. 讀取公告 (後台要看得到所有資料，包含過期的，所以不隱藏)
const fetchNews = async () => {
  loading.value = true;
  newsList.value = [];
  try {
    const q = query(collection(db, 'news'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      newsList.value.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error: ", e);
  }
  loading.value = false;
};

// 2. 送出 (新增或更新)
const handleSubmit = async () => {
  if (!newPost.value.title || !newPost.value.date) {
    alert("標題和發布日期是必填的！");
    return;
  }
  if (isEditing.value) {
    await handleUpdate();
  } else {
    await handleAdd();
  }
};

const handleAdd = async () => {
  try {
    await addDoc(collection(db, 'news'), newPost.value);
    alert("公告發布成功！");
    resetForm();
    fetchNews();
  } catch (e) {
    alert("發布失敗：" + e.message);
  }
};

const handleUpdate = async () => {
  try {
    const docRef = doc(db, 'news', editingId.value);
    await updateDoc(docRef, newPost.value);
    alert("更新成功！");
    resetForm();
    fetchNews();
  } catch (e) {
    alert("更新失敗：" + e.message);
  }
};

const handleEdit = (item) => {
  isEditing.value = true;
  editingId.value = item.id;
  // 資料回填
  newPost.value = { 
    title: item.title, 
    date: item.date, 
    content: item.content, 
    icon: item.icon, 
    image: item.image || '',
    isTop: item.isTop || false,     // 回填置頂狀態
    endDate: item.endDate || ''     // 回填下架日期
  };
};

const handleDelete = async (id) => {
  if (!confirm("確定要刪除嗎？")) return;
  try {
    await deleteDoc(doc(db, 'news', id));
    newsList.value = newsList.value.filter(item => item.id !== id);
  } catch (e) {
    alert("刪除失敗");
  }
};

const resetForm = () => {
  isEditing.value = false;
  editingId.value = null;
  newPost.value = { title: '', date: '', endDate: '', content: '', icon: 'fa-bell', image: '', isTop: false };
};

onMounted(() => {
  fetchNews();
});
</script>

<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>📢 最新消息管理</h2>
      <router-link to="/admin/dashboard" class="btn btn-outline-secondary">回後台</router-link>
    </div>

    <div class="row">
      <div class="col-md-4 mb-4">
        <div class="card shadow-sm border-0 bg-light">
          <div class="card-body">
            <h4 class="card-title mb-3">{{ isEditing ? '編輯公告' : '新增公告' }}</h4>
            
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label">標題</label>
                <input v-model="newPost.title" type="text" class="form-control" required>
              </div>
              
              <div class="row">
                <div class="col-6 mb-3">
                  <label class="form-label">發布日期</label>
                  <input v-model="newPost.date" type="date" class="form-control" required>
                </div>
                <div class="col-6 mb-3">
                  <label class="form-label text-muted">下架日期 (選填)</label>
                  <input v-model="newPost.endDate" type="date" class="form-control">
                  <div class="form-text" style="font-size: 12px;">超過此日自動隱藏</div>
                </div>
              </div>

              <div class="mb-3 form-check form-switch">
                <input class="form-check-input" type="checkbox" id="isTopSwitch" v-model="newPost.isTop">
                <label class="form-check-label fw-bold text-danger" for="isTopSwitch">
                  <i class="fa-solid fa-thumbtack"></i> 置頂顯示 (排在最前面)
                </label>
              </div>

              <div class="mb-3">
                <label class="form-label">圖示</label>
                <select v-model="newPost.icon" class="form-select">
                  <option v-for="opt in iconOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">內容</label>
                <textarea v-model="newPost.content" class="form-control" rows="4"></textarea>
              </div>
              
              <div class="mb-3">
                <label class="form-label">訊息連結網址</label>
                <input v-model="newPost.image" type="text" class="form-control">
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn w-100" :class="isEditing ? 'btn-warning' : 'btn-danger'">
                  {{ isEditing ? '更新公告' : '發布公告' }}
                </button>
                <button v-if="isEditing" type="button" @click="resetForm" class="btn btn-secondary">取消</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div class="col-md-8">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <h4 class="card-title mb-3">公告列表</h4>
            <div class="list-group list-group-flush">
              <div v-for="item in newsList" :key="item.id" class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="mb-1 text-danger">
                    <i v-if="item.isTop" class="fa-solid fa-thumbtack me-1 text-warning" title="已置頂"></i>
                    <i :class="['fa-solid', item.icon, 'me-2']"></i>
                    {{ item.title }}
                  </h5>
                  <small class="text-muted">發布: {{ item.date }}</small>
                  <small v-if="item.endDate" class="ms-2 text-secondary">
                    ( 下架: {{ item.endDate }} )
                  </small>
                </div>
                <div class="btn-group">
                  <button @click="handleEdit(item)" class="btn btn-outline-primary btn-sm">編輯</button>
                  <button @click="handleDelete(item.id)" class="btn btn-outline-danger btn-sm">刪除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>