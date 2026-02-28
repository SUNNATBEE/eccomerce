/**
 * productController.js - Mahsulotlar controlleri
 *
 * Bu fayl mahsulotlar bilan bog'liq barcha
 * so'rovlarni (GET, POST, PUT, DELETE) boshqaradi.
 */

const Product = require("../models/Product");

/**
 * @desc    Barcha mahsulotlarni olish (filter, sort, pagination bilan)
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      sort = "",
      search,
      minPrice,
      maxPrice,
      badge,
      inStock,
    } = req.query;

    // Filter obyekti
    const filter = { isActive: true };

    // Kategoriya filtr
    if (category) filter.category = category;

    // Badge filtr (NEW, HOT, SALE, DEAL)
    if (badge) filter.badge = badge;

    // Stok filtr
    if (inStock === "true") filter.inStock = true;

    // Narx oraliq filtr
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Matn bo'yicha qidiruv
    if (search) {
      filter.$text = { $search: search };
    }

    // Saralash sozlamalari
    let sortOption = {};
    switch (sort) {
      case "price_asc":   sortOption = { price: 1 };       break;
      case "price_desc":  sortOption = { price: -1 };      break;
      case "newest":      sortOption = { createdAt: -1 };  break;
      case "popular":     sortOption = { sold: -1 };       break;
      case "rating":      sortOption = { rating: -1 };     break;
      default:            sortOption = { createdAt: -1 };
    }

    // Sahifalash
    const skip = (Number(page) - 1) * Number(limit);

    // Ma'lumotlarni olish (category populate bilan)
    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .populate("category", "name slug"),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        products,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Mahsulotlarni olishda xatolik: " + error.message,
    });
  }
};

/**
 * @desc    Bitta mahsulotni ID bo'yicha olish
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name slug"
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Mahsulot topilmadi",
      });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Mahsulotni olishda xatolik: " + error.message,
    });
  }
};

/**
 * @desc    Yangi mahsulot qo'shish
 * @route   POST /api/products
 * @access  Private (Admin)
 */
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const populated = await product.populate("category", "name slug");

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    // MongoDB validation xatoliklari
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    // Unikal qiymat xatoligi (SKU)
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "Bu SKU allaqachon mavjud" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Mahsulotni yangilash
 * @route   PUT /api/products/:id
 * @access  Private (Admin)
 */
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({ success: false, message: "Mahsulot topilmadi" });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Mahsulotni o'chirish
 * @route   DELETE /api/products/:id
 * @access  Private (Admin)
 */
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Mahsulot topilmadi" });
    }

    res.json({ success: true, message: "Mahsulot o'chirildi" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
