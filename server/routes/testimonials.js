/**
 * Testimonials Routes
 */

const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const authMiddleware = require('../middleware/auth');

// Get approved testimonials (public)
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const testimonials = db.prepare('SELECT * FROM testimonials WHERE is_approved = 1 ORDER BY created_at DESC').all();
    res.json({ status: 'success', count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get all testimonials (admin)
router.get('/all', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all();
    res.json({ status: 'success', count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Submit testimonial (public - needs approval)
router.post('/', (req, res) => {
  try {
    const db = getDatabase();
    const { name, role, text, rating, avatar } = req.body;

    if (!name || !text) {
      return res.status(400).json({ status: 'error', message: 'نام و متن نظر الزامی است' });
    }

    const result = db.prepare(`
      INSERT INTO testimonials (name, role, text, rating, avatar, is_approved)
      VALUES (?, ?, ?, ?, ?, 0)
    `).run(name, role || null, text, rating || 5, avatar || '👤');

    const newTestimonial = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      status: 'success',
      message: 'نظر شما ثبت شد و پس از تأیید نمایش داده خواهد شد',
      data: newTestimonial
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Approve testimonial (admin)
router.patch('/:id/approve', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    db.prepare('UPDATE testimonials SET is_approved = 1 WHERE id = ?').run(req.params.id);
    res.json({ status: 'success', message: 'نظر تأیید شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create testimonial (admin)
router.post('/admin', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const { name, role, text, rating, avatar } = req.body;

    const result = db.prepare(`
      INSERT INTO testimonials (name, role, text, rating, avatar, is_approved)
      VALUES (?, ?, ?, ?, ?, 1)
    `).run(name, role || null, text, rating || 5, avatar || '👤');

    const newTestimonial = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      status: 'success',
      message: 'نظر با موفقیت اضافه شد',
      data: newTestimonial
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update testimonial (admin)
router.put('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const { name, role, text, rating, avatar, is_approved } = req.body;

    const existing = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(req.params.id);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'نظر یافت نشد' });
    }

    db.prepare(`
      UPDATE testimonials SET name=?, role=?, text=?, rating=?, avatar=?, is_approved=?
      WHERE id=?
    `).run(name, role, text, rating, avatar, is_approved !== undefined ? (is_approved ? 1 : 0) : existing.is_approved, req.params.id);

    const updated = db.prepare('SELECT * FROM testimonials WHERE id = ?').get(req.params.id);

    res.json({
      status: 'success',
      message: 'نظر با موفقیت ویرایش شد',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Delete testimonial (admin)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM testimonials WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ status: 'error', message: 'نظر یافت نشد' });
    }

    res.json({ status: 'success', message: 'نظر با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
