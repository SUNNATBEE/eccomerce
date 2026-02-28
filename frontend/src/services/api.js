/**
 * api.js - Backend bilan bog'lanish uchun barcha API funksiyalari
 *
 * Bu faylda axios bilan backend ga so'rovlar yuboriladi.
 * BASE_URL - backend server manzili (Render ga deploy qilingan)
 *
 * MUHIM: .env fayliga qo'shing:
 * VITE_API_URL=https://nest-backend.onrender.com/api
 *
 * Yoki local development uchun:
 * VITE_API_URL=http://localhost:5000/api
 *
 * ================================================
 * BARCHA O'QUVCHILAR BU FAYLNI IMPORT QILADI!
 * O'zgartirish kerak bo'lsa birgalikda hal qiling.
 * ================================================
 */

import axios from "axios";

// Axios instance - barcha so'rovlar uchun umumiy sozlamalar
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 10000, // 10 soniya kutadi
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== MAHSULOTLAR API =====

/**
 * Barcha mahsulotlarni olish
 * @param {object} params - { page, limit, category, search, sort }
 */
export const getProducts = (params = {}) => {
  return api.get("/products", { params });
};

/**
 * Bitta mahsulotni ID bo'yicha olish
 * @param {string} id - Mahsulot IDsi
 */
export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

/**
 * Eng ko'p sotilgan mahsulotlar
 */
export const getTopSellingProducts = () => {
  return api.get("/products?sort=sold&limit=8");
};

/**
 * Kunning takliflari (deals of the day)
 */
export const getDealProducts = () => {
  return api.get("/products?badge=DEAL&limit=5");
};

// ===== KATEGORIYALAR API =====

/**
 * Barcha kategoriyalarni olish
 */
export const getCategories = () => {
  return api.get("/categories");
};

// ===== BLOG API =====

/**
 * Barcha blog postlarni olish
 * @param {object} params - { page, limit, category }
 */
export const getBlogs = (params = {}) => {
  return api.get("/blogs", { params });
};

/**
 * Bitta blog postni ID bo'yicha olish
 * @param {string} id - Blog IDsi
 */
export const getBlogById = (id) => {
  return api.get(`/blogs/${id}`);
};

// ===== CONTACT API =====

/**
 * Aloqa formasini yuborish
 * @param {object} data - { firstName, lastName, email, phone, message }
 */
export const sendContactForm = (data) => {
  return api.post("/contacts", data);
};

// ===== INTERCEPTORS (Xatoliklarni ushlab olish) =====

// So'rov yuborilganda
api.interceptors.request.use(
  (config) => {
    // Agar auth token kerak bo'lsa shu yerga qo'shing
    // const token = localStorage.getItem("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Javob kelganda
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Xatolik xabarini console ga chiqarish
    console.error("API Xatolik:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export default api;
