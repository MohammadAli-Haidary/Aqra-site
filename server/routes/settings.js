/**
 * Site Settings Routes
 */

const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const authMiddleware = require('../middleware/auth');

// Get all settings (public)
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const settings = db.prepare('SELECT * FROM site_settings').all();
    
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.setting_key] = s.setting_value;
    });

    res.json({ status: 'success', data: settingsObj });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get single setting
router.get('/:key', (req, res) => {
  try {
    const db = getDatabase();
    const setting = db.prepare('SELECT * FROM site_settings WHERE setting_key = ?').get(req.params.key);

    if (!setting) {
      return res.status(404).json({ status: 'error', message: 'تنظیم یافت نشد' });
    }

    res.json({ status: 'success', data: { key: setting.setting_key, value: setting.setting_value } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update settings (admin)
router.put('/', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const settings = req.body;

    const updateStmt = db.prepare(`
      INSERT INTO site_settings (setting_key, setting_value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(setting_key) DO UPDATE SET setting_value = ?, updated_at = CURRENT_TIMESTAMP
    `);

    const updateMany = db.transaction((settings) => {
      for (const [key, value] of Object.entries(settings)) {
        updateStmt.run(key, value, value);
      }
    });

    updateMany(settings);

    res.json({ status: 'success', message: 'تنظیمات با موفقیت ذخیره شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update single setting (admin)
router.put('/:key', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const { value } = req.body;

    db.prepare(`
      INSERT INTO site_settings (setting_key, setting_value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(setting_key) DO UPDATE SET setting_value = ?, updated_at = CURRENT_TIMESTAMP
    `).run(req.params.key, value, value);

    res.json({ status: 'success', message: 'تنظیم با موفقیت ذخیره شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Dashboard stats (admin)
router.get('/dashboard/stats', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    
    const stats = {
      totalBooks: db.prepare('SELECT COUNT(*) as count FROM books').get().count,
      totalCategories: db.prepare('SELECT COUNT(*) as count FROM categories').get().count,
      totalGallery: db.prepare('SELECT COUNT(*) as count FROM gallery').get().count,
      totalTestimonials: db.prepare('SELECT COUNT(*) as count FROM testimonials').get().count,
      totalMessages: db.prepare('SELECT COUNT(*) as count FROM contact_messages').get().count,
      unreadMessages: db.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0').get().count,
      totalSubscribers: db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers WHERE is_active = 1').get().count,
      newBooks: db.prepare("SELECT COUNT(*) as count FROM books WHERE is_new = 1").get().count,
      bestsellers: db.prepare("SELECT COUNT(*) as count FROM books WHERE badge = 'پرفروش'").get().count,
    };

    res.json({ status: 'success', data: stats });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
