/**
 * Newsletter Routes
 */

const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const authMiddleware = require('../middleware/auth');

// Subscribe to newsletter (public)
router.post('/subscribe', (req, res) => {
  try {
    const db = getDatabase();
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'ایمیل الزامی است'
      });
    }

    // Check if already subscribed
    const existing = db.prepare('SELECT * FROM newsletter_subscribers WHERE email = ?').get(email);
    if (existing) {
      if (existing.is_active) {
        return res.status(400).json({
          status: 'error',
          message: 'این ایمیل قبلاً ثبت شده است'
        });
      } else {
        // Reactivate
        db.prepare('UPDATE newsletter_subscribers SET is_active = 1 WHERE email = ?').run(email);
        return res.json({
          status: 'success',
          message: 'عضویت شما دوباره فعال شد'
        });
      }
    }

    db.prepare(`
      INSERT INTO newsletter_subscribers (email, name)
      VALUES (?, ?)
    `).run(email, name || null);

    res.status(201).json({
      status: 'success',
      message: 'شما با موفقیت در خبرنامه عضو شدید'
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Unsubscribe (public)
router.post('/unsubscribe', (req, res) => {
  try {
    const db = getDatabase();
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ status: 'error', message: 'ایمیل الزامی است' });
    }

    db.prepare('UPDATE newsletter_subscribers SET is_active = 0 WHERE email = ?').run(email);

    res.json({ status: 'success', message: 'شما از خبرنامه لغو عضویت شدید' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get all subscribers (admin)
router.get('/subscribers', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const subscribers = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC').all();

    res.json({
      status: 'success',
      count: subscribers.length,
      active: subscribers.filter(s => s.is_active).length,
      data: subscribers
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Delete subscriber (admin)
router.delete('/subscribers/:id', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM newsletter_subscribers WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ status: 'error', message: 'مشترک یافت نشد' });
    }

    res.json({ status: 'success', message: 'مشترک حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
