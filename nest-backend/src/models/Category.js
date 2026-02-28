/**
 * Category.js - Kategoriya modeli (MongoDB Schema)
 *
 * Kategoriyalar jadvali tuzilmasi:
 * - name: Kategoriya nomi (Vegetables, Fruits, Snacks...)
 * - slug: URL uchun qulay nom (vegetables, fruits...)
 * - icon: Kategoriya ikoni rasmi URL
 * - image: Kategoriya asosiy rasmi
 * - productCount: Bu kategoriyada nechta mahsulot borligini ko'rsatadi
 */

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    // Kategoriya nomi - majburiy, unikal
    name: {
      type: String,
      required: [true, "Kategoriya nomi kiritish shart"],
      trim: true,
      unique: true,
      maxlength: [50, "Nom 50 belgidan oshmasin"],
    },

    // URL qulay nom - masalan: "Fresh Vegetables" → "fresh-vegetables"
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    // Kichik ikon rasmi
    icon: {
      type: String,
      default: "",
    },

    // Katta asosiy rasm
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt avtomatik qo'shiladi
    toJSON: { virtuals: true }, // virtual maydonlar JSON da ko'rinadi
  }
);

// Saqlashdan oldin slug yaratish
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, "-")         // Bo'shliqlarni "-" ga almashtirish
      .replace(/[^\w-]+/g, "")      // Maxsus belgilarni o'chirish
      .replace(/--+/g, "-")         // Ko'p "--" ni bitta "-" ga
      .replace(/^-+/, "")           // Boshidagi "-" ni o'chirish
      .replace(/-+$/, "");          // Oxiridagi "-" ni o'chirish
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
