/**
 * contactController.js - Aloqa formasi controlleri
 */

const Contact = require("../models/Contact");
const { validationResult } = require("express-validator");

/**
 * @desc    Aloqa formasini yuborish
 * @route   POST /api/contacts
 * @access  Public
 */
const sendContact = async (req, res) => {
  // express-validator tekshiruv natijalari
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }

  try {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Xabaringiz qabul qilindi! Tez orada javob beramiz.",
      data: { id: contact._id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Xabar yuborishda xatolik: " + error.message });
  }
};

/**
 * @desc    Barcha xabarlarni olish (Admin)
 * @route   GET /api/contacts
 * @access  Private (Admin)
 */
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts, total: contacts.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { sendContact, getContacts };
