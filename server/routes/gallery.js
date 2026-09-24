/**
 * Gallery Routes
 */

const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const authMiddleware = require('../middleware/auth');
const { uploadGallery } = require('../middleware/upload');

// Get all gallery items (public)
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const { category } = req.query;
    
    let query = 'SELECT * FROM gallery';
    const params = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    query += ' ORDER BY sort_order ASC, created_at DESC';

    const items = db.prepare(query).all(...params);

    res.json({ status: 'success', count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get gallery categories
router.get('/categories', (req, res) => {
  try {
    const db = getDatabase();
    const categories = db.prepare('SELECT DISTINCT category FROM gallery').all();
    res.json({ status: 'success', data: categories.map(c => c.category) });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create gallery item (admin)
router.post('/', authMiddleware, uploadGallery.single('image'), (req, res) => {
  try {
    const db = getDatabase();
    const { title, category, description } = req.body;
    
    const image_url = req.file ? `/uploads/gallery/${req.file.filename}` : null;

    const result = db.prepare(`
      INSERT INTO gallery (title, category, image_url, description)
      VALUES (?, ?, ?, ?)
    `).run(title, category, image_url, description || null);

    const newItem = db.prepare('SELECT * FROM gallery WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      status: 'success',
      message: 'تصویر با موفقیت اضافه شد',
      data: newItem
    });
  } catch (error) {
    console.error('Create gallery error:', error);
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update gallery item (admin)
router.put('/:id', authMiddleware, uploadGallery.single('image'), (req, res) => {
  try {
    const db = getDatabase();
    const { title, category, description, sort_order } = req.body;
    
    const existing = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'تصویر یافت نشد' });
    }

    const image_url = req.file ? `/uploads/gallery/${req.file.filename}` : existing.image_url;

    db.prepare(`
      UPDATE gallery SET title=?, category=?, image_url=?, description=?, sort_order=?
      WHERE id=?
    `).run(title, category, image_url, description || null, sort_order || 0, req.params.id);

    const updated = db.prepare('SELECT * FROM gallery WHERE id = ?').get(req.params.id);

    res.json({
      status: 'success',
      message: 'تصویر با موفقیت ویرایش شد',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Delete gallery item (admin)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM gallery WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ status: 'error', message: 'تصویر یافت نشد' });
    }

    res.json({ status: 'success', message: 'تصویر با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
