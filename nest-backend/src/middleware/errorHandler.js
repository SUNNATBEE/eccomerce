/**
 * errorHandler.js - Global xatolik boshqarish middleware
 *
 * Catch qilinmagan xatoliklarni ushlab, JSON formatda qaytaradi.
 * app.js da eng oxirida ulangan bo'ladi.
 */

const errorHandler = (err, req, res, next) => {
  // Console ga xatolikni yozish (development uchun)
  console.error("❌ Xatolik:", err.stack);

  // Statusni aniqlash
  let statusCode = err.statusCode || 500;
  let message = err.message || "Ichki server xatoligi";

  // MongoDB Cast xatoligi (noto'g'ri ID format)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Noto'g'ri ID format";
  }

  // MongoDB Validation xatoligi
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // MongoDB unikal qiymat xatoligi
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Bu ${field} allaqachon mavjud`;
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Faqat development da stack trace ko'rinsin
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
