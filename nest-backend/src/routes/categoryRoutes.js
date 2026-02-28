/**
 * categoryRoutes.js - Kategoriyalar route'lari
 */

const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

/**
 * @swagger
 * tags:
 *   name: Kategoriyalar
 *   description: Mahsulot kategoriyalari API
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Barcha kategoriyalarni olish
 *     tags: [Kategoriyalar]
 *     description: |
 *       Har bir kategoriyada nechta mahsulot borligini ham qaytaradi.
 *
 *       **Frontend da ishlatilishi:**
 *       ```javascript
 *       import { getCategories } from "../../services/api";
 *       const { data: categories } = useFetch(getCategories);
 *       // categories = [{ _id, name, slug, icon, productCount }]
 *       ```
 *     responses:
 *       200:
 *         description: Kategoriyalar ro'yxati
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: "64a7b3c2..."
 *                   name: "Vegetables"
 *                   slug: "vegetables"
 *                   icon: "https://..."
 *                   productCount: 45
 */
router.get("/", getCategories);

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Bitta kategoriyani olish
 *     tags: [Kategoriyalar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Kategoriya topildi
 *       404:
 *         description: Topilmadi
 */
router.get("/:id", getCategoryById);

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Yangi kategoriya yaratish (Admin)
 *     tags: [Kategoriyalar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string, example: "Fresh Vegetables" }
 *               icon: { type: string, example: "https://..." }
 *               image: { type: string, example: "https://..." }
 *     responses:
 *       201:
 *         description: Kategoriya yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot yoki allaqachon mavjud
 */
router.post("/", createCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Kategoriyani o'chirish (Admin)
 *     tags: [Kategoriyalar]
 *     description: Kategoriyani faqat mahsulotlari yo'q bo'lsa o'chirishga ruxsat
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: O'chirildi
 *       400:
 *         description: Kategoriyada mahsulotlar bor
 *       404:
 *         description: Topilmadi
 */
router.delete("/:id", deleteCategory);

module.exports = router;
