/**
 * swagger.js - Swagger/OpenAPI dokumentatsiya sozlamalari
 *
 * Swagger - API ni vizual ko'rish va test qilish vositasi.
 * http://localhost:5000/api-docs da ko'rish mumkin.
 *
 * swagger-jsdoc: route va model fayllaridagi JSDoc dan docs yaratadi
 * swagger-ui-express: dokumentatsiyani web sahifada ko'rsatadi
 */

const swaggerJsdoc = require("swagger-jsdoc");

// Swagger asosiy sozlamalari
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nest Mart API",
      version: "1.0.0",
      description: `
# Nest Mart - E-Commerce Grocery API

Bu API Nest Mart oziq-ovqat do'koni uchun yaratilgan.

## Asosiy imkoniyatlar:
- 🛍️ Mahsulotlarni ko'rish, qidirish, filtrlash
- 📂 Kategoriyalar bilan ishlash
- 📰 Blog postlarni boshqarish
- 📞 Aloqa formasi yuborish

## Autentifikatsiya:
Hozircha ochiq API. Kelajakda JWT token qo'shiladi.

## O'zbek tilida yozilgan - Frontend o'quvchilari uchun!
      `,
      contact: {
        name: "Nest Mart Jamoa",
        email: "info@nestmart.uz",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local development server",
      },
      {
        url: "https://nest-backend.onrender.com/api",
        description: "Render production server",
      },
    ],
    // Umumiy komponentlar (reusable)
    components: {
      schemas: {
        // Muvaffaqiyatli javob
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { type: "object" },
          },
        },
        // Xatolik javob
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string", example: "Xatolik yuz berdi" },
          },
        },
        // Mahsulot modeli
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64a7b3c2d9e4f5a6b7c8d9e0" },
            name: { type: "string", example: "Seeds of Change Organic Quinoa" },
            price: { type: "number", example: 38.00 },
            oldPrice: { type: "number", example: 52.00 },
            image: { type: "string", example: "https://example.com/product.jpg" },
            category: {
              type: "object",
              properties: {
                _id: { type: "string" },
                name: { type: "string", example: "Vegetables" },
              },
            },
            rating: { type: "number", example: 4, minimum: 0, maximum: 5 },
            sold: { type: "number", example: 120 },
            inStock: { type: "boolean", example: true },
            badge: { type: "string", enum: ["NEW", "HOT", "SALE", "DEAL"], example: "NEW" },
          },
        },
        // Blog modeli
        Blog: {
          type: "object",
          properties: {
            _id: { type: "string" },
            title: { type: "string", example: "Healthy Food Guide" },
            excerpt: { type: "string" },
            content: { type: "string" },
            image: { type: "string" },
            category: { type: "string", example: "Recipe" },
            author: {
              type: "object",
              properties: {
                name: { type: "string" },
                avatar: { type: "string" },
              },
            },
            tags: { type: "array", items: { type: "string" } },
            createdAt: { type: "string", format: "date-time" },
            commentsCount: { type: "number" },
          },
        },
      },
    },
  },
  // Swagger JSDoc fayllarni qayerdan o'qish kerak
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
