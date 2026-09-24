/**
 * Categories Routes
 * مسیرهای دسته‌بندی‌ها
 */

const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/auth');

// Get all categories (public)
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ sort_order: 1, name: 1 });
    res.json({ status: 'success', count: categories.length,  categories });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get single category with books
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ status: 'error', message: 'دسته‌بندی یافت نشد' });
    }

    // Get books in this category
    const books = await Book.find({ category: category.name });

    res.json({ status: 'success', data: { ...category.toObject(), books } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create category (admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, icon, count, description, sort_order } = req.body;

    if (!name) {
      return res.status(400).json({ status: 'error', message: 'نام دسته‌بندی الزامی است' });
    }

    const category = new Category({
      name,
      icon: icon || 'fas fa-book',
      count: count || 0,
      description,
      sort_order: sort_order || 0
    });

    await category.save();

    res.status(201).json({
      status: 'success',
      message: 'دسته‌بندی با موفقیت اضافه شد',
       category
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Update category (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, icon, count, description, sort_order } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, icon, count, description, sort_order },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'دسته‌بندی یافت نشد' });
    }

    res.json({
      status: 'success',
      message: 'دسته‌بندی با موفقیت ویرایش شد',
       updated
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Delete category (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ status: 'error', message: 'دسته‌بندی یافت نشد' });
    }

    res.json({ status: 'success', message: 'دسته‌بندی با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
