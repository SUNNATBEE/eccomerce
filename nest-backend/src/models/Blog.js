/**
 * Blog.js - Blog post modeli (MongoDB Schema)
 *
 * Blog postlar jadvali tuzilmasi.
 * Frontend da Blog va BlogDetail sahifalarida ishlatiladi.
 */

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    // Blog sarlavhasi - majburiy
    title: {
      type: String,
      required: [true, "Blog sarlavhasi kiritish shart"],
      trim: true,
      maxlength: [300, "Sarlavha 300 belgidan oshmasin"],
    },

    // Qisqacha tavsif (blog ro'yxatida ko'rinadi)
    excerpt: {
      type: String,
      required: [true, "Qisqacha tavsif kiritish shart"],
      maxlength: [500, "Qisqacha tavsif 500 belgidan oshmasin"],
    },

    // To'liq matn (blog detail da ko'rinadi)
    content: {
      type: String,
      required: [true, "Blog matni kiritish shart"],
    },

    // Asosiy rasm URL
    image: {
      type: String,
      required: [true, "Rasm URL kiritish shart"],
    },

    // Kategoriya: Recipe, Kitchen, Shopping, Home, Food
    category: {
      type: String,
      required: [true, "Kategoriya kiritish shart"],
      enum: ["Recipe", "Kitchen", "Shopping", "Home", "Food", "Other"],
    },

    // Muallif
    author: {
      name: {
        type: String,
        required: [true, "Muallif ismi kiritish shart"],
      },
      avatar: {
        type: String,
        default: "",
      },
      bio: {
        type: String,
        default: "",
      },
    },

    // Teglar
    tags: {
      type: [String],
      default: [],
    },

    // O'qish vaqti (daqiqada)
    readTime: {
      type: Number,
      default: 5,
    },

    // Ko'rilganlar soni
    views: {
      type: Number,
      default: 0,
    },

    // Izohlar soni (keyinchalik Comment modelidan hisob qilinadi)
    commentsCount: {
      type: Number,
      default: 0,
    },

    // Chop etilganmi
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Full-text search indeksi
blogSchema.index({ title: "text", content: "text" });
blogSchema.index({ category: 1 });
blogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Blog", blogSchema);
