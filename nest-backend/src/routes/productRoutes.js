/**
 * productRoutes.js - Mahsulotlar route'lari
 *
 * Swagger JSDoc annotatsiyalari shu yerda yoziladi.
 * http://localhost:5000/api-docs da ko'rish mumkin.
 */

const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

/**
 * @swagger
 * tags:
 *   name: Mahsulotlar
 *   description: Mahsulotlar bilan ishlash API
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Barcha mahsulotlarni olish
 *     tags: [Mahsulotlar]
 *     description: |
 *       Filter, saralash va sahifalash imkoniyatlari bilan barcha mahsulotlarni qaytaradi.
 *
 *       **Frontend da ishlatilishi:**
 *       ```javascript
 *       import { getProducts } from "../../services/api";
 *       const { data } = useFetch(getProducts, { page: 1, limit: 12 });
 *       ```
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *         description: Sahifa raqami
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 12 }
 *         description: Bir sahifada nechta mahsulot
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *         description: Kategoriya ID si bo'yicha filter
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [price_asc, price_desc, newest, popular, rating]
 *         description: Saralash tartibi
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Matn bo'yicha qidiruv
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *         description: Minimum narx
 *       - in: query
 *         name: maxPrice
 *         schema: { type: number }
 *         description: Maksimum narx
 *       - in: query
 *         name: badge
 *         schema:
 *           type: string
 *           enum: [NEW, HOT, SALE, DEAL]
 *         description: Badge bo'yicha filter
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Product' }
 *                     total: { type: integer, example: 150 }
 *                     page: { type: integer, example: 1 }
 *                     totalPages: { type: integer, example: 13 }
 *       500:
 *         description: Server xatoligi
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
router.get("/", getProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Bitta mahsulotni ID bo'yicha olish
 *     tags: [Mahsulotlar]
 *     description: |
 *       **Frontend da ishlatilishi (ProductDetail sahifasida):**
 *       ```javascript
 *       import { getProductById } from "../../services/api";
 *       const { data: product } = useFetch(getProductById, id);
 *       ```
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         description: MongoDB ObjectId
 *         example: 64a7b3c2d9e4f5a6b7c8d9e0
 *     responses:
 *       200:
 *         description: Mahsulot topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean, example: true }
 *                 data: { $ref: '#/components/schemas/Product' }
 *       404:
 *         description: Mahsulot topilmadi
 *       500:
 *         description: Server xatoligi
 */
router.get("/:id", getProductById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Yangi mahsulot qo'shish (Admin)
 *     tags: [Mahsulotlar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description, price, image, category]
 *             properties:
 *               name: { type: string, example: "Fresh Apple" }
 *               description: { type: string, example: "Yangi alma..." }
 *               price: { type: number, example: 5.99 }
 *               oldPrice: { type: number, example: 7.99 }
 *               image: { type: string, example: "https://..." }
 *               category: { type: string, example: "64a7b3c2d9e4f5a6b7c8d9e0" }
 *               badge: { type: string, enum: [NEW, HOT, SALE, DEAL] }
 *     responses:
 *       201:
 *         description: Mahsulot yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumotlar
 */
router.post("/", createProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Mahsulotni yangilash (Admin)
 *     tags: [Mahsulotlar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Product' }
 *     responses:
 *       200:
 *         description: Yangilandi
 *       404:
 *         description: Topilmadi
 */
router.put("/:id", updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Mahsulotni o'chirish (Admin)
 *     tags: [Mahsulotlar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: O'chirildi
 *       404:
 *         description: Topilmadi
 */
router.delete("/:id", deleteProduct);

module.exports = router;
