/**
 * categoryController.js - Kategoriyalar controlleri
 */

const Category = require("../models/Category");
const Product = require("../models/Product");

/**
 * @desc    Barcha kategoriyalarni olish (har biridagi mahsulotlar soni bilan)
 * @route   GET /api/categories
 * @access  Public
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    // Har bir kategoriya uchun mahsulotlar sonini hisoblash
    const categoriesWithCount = await Promise.all(
      categories.map(async (cat) => {
        const productCount = await Product.countDocuments({
          category: cat._id,
          isActive: true,
        });
        return { ...cat.toJSON(), productCount };
      })
    );

    res.json({ success: true, data: categoriesWithCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Bitta kategoriyani olish
 * @route   GET /api/categories/:id
 * @access  Public
 */
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Kategoriya topilmadi" });
    }

    res.json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Yangi kategoriya qo'shish
 * @route   POST /api/categories
 * @access  Private (Admin)
 */
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Bu kategoriya allaqachon mavjud" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Kategoriyani o'chirish
 * @route   DELETE /api/categories/:id
 * @access  Private (Admin)
 */
const deleteCategory = async (req, res) => {
  try {
    // Ushbu kategoriyada mahsulotlar bormi tekshirish
    const productCount = await Product.countDocuments({ category: req.params.id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Bu kategoriyada ${productCount} ta mahsulot bor. Avval mahsulotlarni o'chiring.`,
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Kategoriya topilmadi" });
    }

    res.json({ success: true, message: "Kategoriya o'chirildi" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getCategories, getCategoryById, createCategory, deleteCategory };
