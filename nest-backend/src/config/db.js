/**
 * db.js - MongoDB ga ulanish sozlamalari
 *
 * Mongoose kutubxonasi orqali MongoDB ga ulanadi.
 * MONGODB_URI - .env faylidan olinadi.
 *
 * Ishlatilishi: server.js da connectDB() chaqiriladi
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB ulandi: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB xatolik: ${error.message}`);
    process.exit(1); // Server to'xtaydi
  }
};

module.exports = connectDB;
