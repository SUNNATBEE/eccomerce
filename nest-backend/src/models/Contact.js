/**
 * Contact.js - Aloqa formasi modeli (MongoDB Schema)
 *
 * Foydalanuvchilar yuborgan xabarlar saqlanadigan jadval.
 * Frontend da Contact sahifasidan yuboriladi.
 */

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // Ism
    firstName: {
      type: String,
      required: [true, "Ism kiritish shart"],
      trim: true,
      maxlength: [50, "Ism 50 belgidan oshmasin"],
    },

    // Familiya
    lastName: {
      type: String,
      required: [true, "Familiya kiritish shart"],
      trim: true,
      maxlength: [50, "Familiya 50 belgidan oshmasin"],
    },

    // Email
    email: {
      type: String,
      required: [true, "Email kiritish shart"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Email noto'g'ri formatda"],
    },

    // Telefon (ixtiyoriy)
    phone: {
      type: String,
      default: "",
    },

    // Mavzu
    subject: {
      type: String,
      default: "Umumiy savol",
    },

    // Xabar matni
    message: {
      type: String,
      required: [true, "Xabar matni kiritish shart"],
      maxlength: [2000, "Xabar 2000 belgidan oshmasin"],
    },

    // Xabar o'qildimi (admin uchun)
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt - yuborilgan vaqt
  }
);

module.exports = mongoose.model("Contact", contactSchema);
