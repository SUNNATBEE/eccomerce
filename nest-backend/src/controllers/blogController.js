/**
 * blogController.js - Blog postlar controlleri
 */

const Blog = require("../models/Blog");

/**
 * @desc    Barcha blog postlarni olish
 * @route   GET /api/blogs
 * @access  Public
 */
const getBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 9, category, tag, search } = req.query;

    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (tag) filter.tags = { $in: [tag] };
    if (search) filter.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .select("-content"), // Detail sahifasida kerak emas, tezlashtiradi
      Blog.countDocuments(filter),
    ]);

    res.json({
      success: true,
      data: {
        blogs,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Bitta blog postni olish (ko'rilganlar soni oshadi)
 * @route   GET /api/blogs/:id
 * @access  Public
 */
const getBlogById = async (req, res) => {
  try {
    // Ko'rilganlar sonini +1 oshirib, to'liq ma'lumotni qaytarish
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog topilmadi" });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Yangi blog post qo'shish
 * @route   POST /api/blogs
 * @access  Private (Admin)
 */
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(", ") });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Blog postni o'chirish
 * @route   DELETE /api/blogs/:id
 * @access  Private (Admin)
 */
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog topilmadi" });
    }
    res.json({ success: true, message: "Blog o'chirildi" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, deleteBlog };
