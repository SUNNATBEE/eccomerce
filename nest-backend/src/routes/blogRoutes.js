/**
 * blogRoutes.js - Blog postlar route'lari
 */

const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
  deleteBlog,
} = require("../controllers/blogController");

/**
 * @swagger
 * tags:
 *   name: Blog
 *   description: Blog postlar bilan ishlash API
 */

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Barcha blog postlarni olish
 *     tags: [Blog]
 *     description: |
 *       Filtr va sahifalash imkoniyatlari bilan bloglarni qaytaradi.
 *       Detail sahifada kerakli `content` maydoni QAYTARILMAYDI (tezlik uchun).
 *
 *       **Frontend da ishlatilishi (Blog sahifasida):**
 *       ```javascript
 *       import { getBlogs } from "../../services/api";
 *       const { data } = useFetch(getBlogs, { page: 1, limit: 9 });
 *       // data.blogs - blog postlar
 *       // data.totalPages - jami sahifalar
 *       ```
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 9 }
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [Recipe, Kitchen, Shopping, Home, Food, Other]
 *         description: Kategoriya bo'yicha filter
 *       - in: query
 *         name: tag
 *         schema: { type: string }
 *         description: Teg bo'yicha filter
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Matn bo'yicha qidiruv
 *     responses:
 *       200:
 *         description: Blog postlar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data:
 *                   type: object
 *                   properties:
 *                     blogs:
 *                       type: array
 *                       items: { $ref: '#/components/schemas/Blog' }
 *                     total: { type: integer }
 *                     totalPages: { type: integer }
 */
router.get("/", getBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Bitta blog postni olish (to'liq matn bilan)
 *     tags: [Blog]
 *     description: |
 *       Bitta blogni qaytaradi. Ko'rilganlar soni avtomatik +1 oshadi.
 *
 *       **Frontend da ishlatilishi (BlogDetail sahifasida):**
 *       ```javascript
 *       import { getBlogById } from "../../services/api";
 *       const { id } = useParams();
 *       const { data: blog } = useFetch(getBlogById, id);
 *       ```
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: 64a7b3c2d9e4f5a6b7c8d9e0
 *     responses:
 *       200:
 *         description: Blog topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 data: { $ref: '#/components/schemas/Blog' }
 *       404:
 *         description: Blog topilmadi
 */
router.get("/:id", getBlogById);

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Yangi blog post yaratish (Admin)
 *     tags: [Blog]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, excerpt, content, image, category, author]
 *             properties:
 *               title: { type: string, example: "Healthy Food Guide" }
 *               excerpt: { type: string, example: "Qisqacha tavsif..." }
 *               content: { type: string, example: "To'liq matn..." }
 *               image: { type: string, example: "https://..." }
 *               category:
 *                 type: string
 *                 enum: [Recipe, Kitchen, Shopping, Home, Food]
 *               author:
 *                 type: object
 *                 properties:
 *                   name: { type: string, example: "Aziz Karimov" }
 *                   avatar: { type: string }
 *               tags: { type: array, items: { type: string } }
 *     responses:
 *       201:
 *         description: Blog yaratildi
 *       400:
 *         description: Noto'g'ri ma'lumot
 */
router.post("/", createBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Blog postni o'chirish (Admin)
 *     tags: [Blog]
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
router.delete("/:id", deleteBlog);

module.exports = router;
