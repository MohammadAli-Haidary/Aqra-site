/**
 * Contact Routes
 */

const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const authMiddleware = require('../middleware/auth');

// Submit contact message (public)
router.post('/', (req, res) => {
  try {
    const db = getDatabase();
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'نام، ایمیل و پیام الزامی است'
      });
    }

    const result = db.prepare(`
      INSERT INTO contact_messages (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, phone || null, subject || null, message);

    res.status(201).json({
      status: 'success',
      message: 'پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.'
    });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get all messages (admin)
router.get('/', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
    
    res.json({
      status: 'success',
      count: messages.length,
      unread: messages.filter(m => !m.is_read).length,
      data: messages
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Mark message as read (admin)
router.patch('/:id/read', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    db.prepare('UPDATE contact_messages SET is_read = 1 WHERE id = ?').run(req.params.id);
    res.json({ status: 'success', message: 'پیام خوانده شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Delete message (admin)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM contact_messages WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ status: 'error', message: 'پیام یافت نشد' });
    }

    res.json({ status: 'success', message: 'پیام حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
