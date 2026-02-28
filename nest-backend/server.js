/**
 * server.js - Asosiy server fayli
 *
 * Bu fayl:
 * 1. .env o'zgaruvchilarini yuklaydi
 * 2. MongoDB ga ulanadi
 * 3. Express serverni ishga tushiradi
 *
 * Ishga tushirish:
 * - Development: npm run dev  (nodemon bilan avtomatik restart)
 * - Production:  npm start    (Render da shu ishlatiladi)
 *
 * MUHIM: .env faylini yarating (.env.example dan nusxa oling)!
 */

// .env faylini yuklash (ENG BIRINCHI!)
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/config/db");

// Port - .env dan yoki default 5000
const PORT = process.env.PORT || 5000;

// MongoDB ga ulaning va serverni ishga tushiring
const startServer = async () => {
  try {
    // MongoDB ga ulanish
    await connectDB();

    // Serverni ishga tushirish
    app.listen(PORT, () => {
      console.log("=".repeat(50));
      console.log(`🚀 Nest Mart API Server ishga tushdi!`);
      console.log(`📍 Server: http://localhost:${PORT}`);
      console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
      console.log(`🌍 Muhit: ${process.env.NODE_ENV || "development"}`);
      console.log("=".repeat(50));
    });
  } catch (error) {
    console.error("❌ Server ishga tushmadi:", error.message);
    process.exit(1);
  }
};

startServer();

// Kutilmagan xatoliklarni ushlab olish
process.on("unhandledRejection", (err) => {
  console.error("❌ Kutilmagan xatolik:", err.message);
  process.exit(1);
});
