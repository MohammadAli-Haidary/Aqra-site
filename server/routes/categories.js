/**
 * Categories Routes
 */

const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const authMiddleware = require('../middleware/auth');

// Get all categories (public)
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const categories = db.prepare('SELECT * FROM categories ORDER BY sort_order ASC, name ASC').all();

    res.json({ status: 'success', count: categories.length, data: categories });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get single category
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(req.params.id);

    if (!category) {
      return res.status(404).json({ status: 'error', message: 'دسته‌بندی یافت نشد' });
    }

    // Get books in this category
    const books = db.prepare('SELECT * FROM books WHERE category = ?').all(category.name);

    res.json({ status: 'success', data: { ...category, books } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create category (admin)
router.post('/', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const { name, icon, count, description } = req.body;

    if (!name) {
      return res.status(400).json({ status: 'error', message: 'نام دسته‌بندی الزامی است' });
    }

    const result = db.prepare(`
      INSERT INTO categories (name, icon, count, description)
      VALUES (?, ?, ?, ?)
    `).run(name, icon || 'fas fa-book', count || 0, description || null);

    const newCategory = db.prepare('SELECT * FROM categories WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      status: 'success',
      message: 'دسته‌بندی با موفقیت اضافه شد',
      data: newCategory
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update category (admin)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const { name, icon, count, description, sort_order } = req.body;

    const existing = db.prepare('SELECT * FROM categories WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'دسته‌بندی یافت نشد' });
    }

    db.prepare(`
      UPDATE categories SET name=?, icon=?, count=?, description=?, sort_order=?
      WHERE id=?
    `).run(name, icon, count, description || null, sort_order || 0, req.params.id);

    const updated = db.prepare('SELECT * FROM categories WHERE id = ?').get(req.params.id);

    res.json({
      status: 'success',
      message: 'دسته‌بندی با موفقیت ویرایش شد',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Delete category (admin)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM categories WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ status: 'error', message: 'دسته‌بندی یافت نشد' });
    }

    res.json({ status: 'success', message: 'دسته‌بندی با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
