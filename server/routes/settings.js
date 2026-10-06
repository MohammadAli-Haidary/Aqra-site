/**
 * Settings Routes
 * مسیرهای تنظیمات - نسخه کامل
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
    const settings = await SiteSetting.findOne();
    
    if (!settings) {
      return res.json({ status: 'success', data: {} });
    }

    res.json({ status: 'success', data: settings });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update all settings (admin)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const settingsData = req.body;

    // Find or create settings
    let settings = await SiteSetting.findOne();
    
    if (!settings) {
      settings = new SiteSetting(settingsData);
    } else {
      // Update all fields
      Object.keys(settingsData).forEach(key => {
        if (settings.hasOwnProperty(key)) {
          settings[key] = settingsData[key];
        }
      });
    }

    await settings.save();

    res.json({ 
      status: 'success', 
      message: 'تنظیمات با موفقیت ذخیره شد',
      data: settings 
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Update single setting (admin)
router.put('/:key', authMiddleware, async (req, res) => {
  try {
    const { value } = req.body;
    const key = req.params.key;

    let settings = await SiteSetting.findOne();
    
    if (!settings) {
      settings = new SiteSetting({ [key]: value });
    } else {
      settings[key] = value;
    }

    await settings.save();

    res.json({ 
      status: 'success', 
      message: 'تنظیم با موفقیت ذخیره شد',
      data: { [key]: settings[key] }
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
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

    res.json({ status: 'success', data: stats });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
