/**
 * Product.js - Mahsulot modeli (MongoDB Schema)
 *
 * Mahsulotlar jadvali tuzilmasi.
 * Frontend da ProductCard, ProductDetail, Shop sahifalarida ishlatiladi.
 */

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // Mahsulot nomi - majburiy
    name: {
      type: String,
      required: [true, "Mahsulot nomi kiritish shart"],
      trim: true,
      maxlength: [200, "Nom 200 belgidan oshmasin"],
    },

    // Batafsil tavsif
    description: {
      type: String,
      required: [true, "Mahsulot tavsifi kiritish shart"],
      maxlength: [2000, "Tavsif 2000 belgidan oshmasin"],
    },

    // Narx (dollar)
    price: {
      type: Number,
      required: [true, "Narx kiritish shart"],
      min: [0, "Narx 0 dan kichik bo'lmasin"],
    },

    // Eski narx (chegirma ko'rsatish uchun)
    oldPrice: {
      type: Number,
      default: null,
      min: [0, "Eski narx 0 dan kichik bo'lmasin"],
    },

    // Asosiy rasm URL
    image: {
      type: String,
      required: [true, "Rasm URL kiritish shart"],
    },

    // Qo'shimcha rasmlar (galereya)
    images: {
      type: [String],
      default: [],
    },

    // Kategoriya (Category modeliga reference)
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Kategoriya tanlash shart"],
    },

    // Stokdagi soni
    stock: {
      type: Number,
      default: 0,
      min: [0, "Stok 0 dan kichik bo'lmasin"],
    },

    // Stokda bormi
    inStock: {
      type: Boolean,
      default: true,
    },

    // Umumiy reyting (0-5)
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    // Baholashlar soni
    reviewsCount: {
      type: Number,
      default: 0,
    },

    // Sotilgan soni
    sold: {
      type: Number,
      default: 0,
    },

    // Badge: "NEW", "HOT", "SALE", "DEAL", yoki null
    badge: {
      type: String,
      enum: ["NEW", "HOT", "SALE", "DEAL", null],
      default: null,
    },

    // SKU - mahsulot kodi
    sku: {
      type: String,
      unique: true,
      sparse: true, // null qiymatlar unikal emas
    },

    // Teglar (filter uchun)
    tags: {
      type: [String],
      default: [],
    },

    // Og'irlik (gram)
    weight: {
      type: String,
      default: "",
    },

    // Kelib chiqish mamlakati
    origin: {
      type: String,
      default: "",
    },

    // Qadoqlash ma'lumotlari
    packaging: {
      type: String,
      default: "",
    },

    // Ogohlantirishlar
    warnings: {
      type: String,
      default: "",
    },

    // Faol/nofaol
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt avtomatik
  }
);

// Indekslar - tezroq qidirish uchun
productSchema.index({ name: "text", description: "text" }); // Full-text search
productSchema.index({ category: 1 }); // Kategoriya bo'yicha
productSchema.index({ price: 1 }); // Narx bo'yicha sort
productSchema.index({ sold: -1 }); // Eng ko'p sotilgan
productSchema.index({ createdAt: -1 }); // Yangi

module.exports = mongoose.model("Product", productSchema);
