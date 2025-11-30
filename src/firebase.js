// src/firebase.js
import { initializeApp } from "firebase/app";
// 引入我們需要的服務
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database"; // 這是給線上人數用的 Realtime DB

// 👇 請貼上你在 Firebase Console 複製的那段設定
const firebaseConfig = {
  apiKey: "AIzaSyBrazD_hbSYb8MEOh8AF2M6poVAVTkFbt4",
  authDomain: "temple-website-d2c2f.firebaseapp.com",
  databaseURL: "https://temple-website-d2c2f-default-rtdb.firebaseio.com/",
  projectId: "temple-website-d2c2f",
  storageBucket: "temple-website-d2c2f.firebasestorage.app",
  messagingSenderId: "14528129688",
  appId: "1:14528129688:web:cfce27f45248adfc897eed",
  measurementId: "G-EQZCSSR9N4"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 匯出各項服務，讓其他頁面可以直接 import 使用
export const auth = getAuth(app);
export const db = getFirestore(app);      // 新的資料庫 (存公告、神明)
//export const storage = getStorage(app);   // 圖片儲存空間
export const rtdb = getDatabase(app);     // 舊的資料庫 (線上人數)