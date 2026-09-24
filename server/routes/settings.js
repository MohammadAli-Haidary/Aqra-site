/**
 * Settings Routes
 * مسیرهای تنظیمات
 */

const express = require('express');
const router = express.Router();
const SiteSetting = require('../models/SiteSetting');
const Book = require('../models/Book');
const Category = require('../models/Category');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const authMiddleware = require('../middleware/auth');

// Get all settings (public)
router.get('/', async (req, res) => {
  try {
    const settings = await SiteSetting.find();
    
    const settingsObj = {};
    settings.forEach(s => {
      settingsObj[s.setting_key] = s.setting_value;
    });

    res.json({ status: 'success',  settingsObj });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get single setting
router.get('/:key', async (req, res) => {
  try {
    const setting = await SiteSetting.findOne({ setting_key: req.params.key });

    if (!setting) {
      return res.status(404).json({ status: 'error', message: 'تنظیم یافت نشد' });
    }

    res.json({ status: 'success',  { key: setting.setting_key, value: setting.setting_value } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update settings (admin)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const settings = req.body;

    for (const [key, value] of Object.entries(settings)) {
      await SiteSetting.findOneAndUpdate(
        { setting_key: key },
        { setting_value: value },
        { upsert: true, new: true }
      );
    }

    res.json({ status: 'success', message: 'تنظیمات با موفقیت ذخیره شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update single setting (admin)
router.put('/:key', authMiddleware, async (req, res) => {
  try {
    const { value } = req.body;

    await SiteSetting.findOneAndUpdate(
      { setting_key: req.params.key },
      { setting_value: value },
      { upsert: true, new: true }
    );

    res.json({ status: 'success', message: 'تنظیم با موفقیت ذخیره شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Dashboard stats (admin)
router.get('/dashboard/stats', authMiddleware, async (req, res) => {
  try {
    const [
      totalBooks,
      totalCategories,
      totalGallery,
      totalTestimonials,
      totalMessages,
      unreadMessages,
      totalSubscribers,
      newBooks,
      bestsellers
    ] = await Promise.all([
      Book.countDocuments(),
      Category.countDocuments(),
      Gallery.countDocuments(),
      Testimonial.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ is_read: false }),
      NewsletterSubscriber.countDocuments({ is_active: true }),
      Book.countDocuments({ is_new: true }),
      Book.countDocuments({ badge: 'پرفروش' })
    ]);

    const stats = {
      totalBooks,
      totalCategories,
      totalGallery,
      totalTestimonials,
      totalMessages,
      unreadMessages,
      totalSubscribers,
      newBooks,
      bestsellers
    };

    res.json({ status: 'success',  stats });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
