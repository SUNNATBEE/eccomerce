/**
 * contactRoutes.js - Aloqa formasi route'lari
 */

const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { sendContact, getContacts } = require("../controllers/contactController");

// Forma validatsiya qoidalari
const contactValidation = [
  body("firstName")
    .trim()
    .notEmpty().withMessage("Ism kiritish shart")
    .isLength({ max: 50 }).withMessage("Ism 50 belgidan oshmasin"),

  body("lastName")
    .trim()
    .notEmpty().withMessage("Familiya kiritish shart")
    .isLength({ max: 50 }).withMessage("Familiya 50 belgidan oshmasin"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email kiritish shart")
    .isEmail().withMessage("Email noto'g'ri formatda")
    .normalizeEmail(),

  body("message")
    .trim()
    .notEmpty().withMessage("Xabar matni kiritish shart")
    .isLength({ min: 10 }).withMessage("Xabar kamida 10 ta belgi bo'lsin")
    .isLength({ max: 2000 }).withMessage("Xabar 2000 belgidan oshmasin"),
];

/**
 * @swagger
 * tags:
 *   name: Aloqa
 *   description: Aloqa formasi API
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Aloqa formasini yuborish
 *     tags: [Aloqa]
 *     description: |
 *       Foydalanuvchi xabarini ma'lumotlar bazasiga saqlaydi.
 *
 *       **Frontend da ishlatilishi (Contact sahifasida - Bobur):**
 *       ```javascript
 *       import { sendContactForm } from "../../services/api";
 *
 *       const handleSubmit = async (e) => {
 *         e.preventDefault();
 *         try {
 *           await sendContactForm({
 *             firstName: "Bobur",
 *             lastName: "Toshmatov",
 *             email: "bobur@gmail.com",
 *             message: "Salom, savolim bor..."
 *           });
 *           toast.success("Xabaringiz yuborildi!");
 *         } catch (err) {
 *           toast.error("Xatolik yuz berdi!");
 *         }
 *       };
 *       ```
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, message]
 *             properties:
 *               firstName:
 *                 type: string
 *                 example: "Bobur"
 *                 description: Ism (majburiy)
 *               lastName:
 *                 type: string
 *                 example: "Toshmatov"
 *                 description: Familiya (majburiy)
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "bobur@gmail.com"
 *                 description: Email manzil (majburiy)
 *               phone:
 *                 type: string
 *                 example: "+998901234567"
 *                 description: Telefon raqam (ixtiyoriy)
 *               subject:
 *                 type: string
 *                 example: "Umumiy savol"
 *                 description: Mavzu (ixtiyoriy)
 *               message:
 *                 type: string
 *                 example: "Salom, mahsulot haqida savolim bor..."
 *                 description: Xabar matni (majburiy, min 10 belgi)
 *     responses:
 *       201:
 *         description: Xabar qabul qilindi
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Xabaringiz qabul qilindi! Tez orada javob beramiz."
 *               data:
 *                 id: "64a7b3c2d9e4f5a6b7c8d9e0"
 *       400:
 *         description: Validatsiya xatoligi
 *         content:
 *           application/json:
 *             example:
 *               success: false
 *               message: "Email noto'g'ri formatda"
 *       500:
 *         description: Server xatoligi
 */
router.post("/", contactValidation, sendContact);

/**
 * @swagger
 * /contacts:
 *   get:
 *     summary: Barcha xabarlarni ko'rish (Admin)
 *     tags: [Aloqa]
 *     description: Barcha yuborilgan aloqa xabarlarini qaytaradi
 *     responses:
 *       200:
 *         description: Xabarlar ro'yxati
 */
router.get("/", getContacts);

module.exports = router;
