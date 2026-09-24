/**
 * Newsletter Routes
 * مسیرهای خبرنامه
 */

const express = require('express');
const router = express.Router();
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const authMiddleware = require('../middleware/auth');

// Subscribe to newsletter (public)
router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'ایمیل الزامی است'
      });
    }

    // Check if already subscribed
    const existing = await NewsletterSubscriber.findOne({ email });
    
    if (existing) {
      if (existing.is_active) {
        return res.status(400).json({
          status: 'error',
          message: 'این ایمیل قبلاً ثبت شده است'
        });
      } else {
        // Reactivate
        existing.is_active = true;
        await existing.save();
        return res.json({
          status: 'success',
          message: 'عضویت شما دوباره فعال شد'
        });
      }
    }

    const subscriber = new NewsletterSubscriber({ email, name });
    await subscriber.save();

    res.status(201).json({
      status: 'success',
      message: 'شما با موفقیت در خبرنامه عضو شدید'
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Unsubscribe (public)
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ status: 'error', message: 'ایمیل الزامی است' });
    }

    const subscriber = await NewsletterSubscriber.findOne({ email });
    
    if (subscriber) {
      subscriber.is_active = false;
      await subscriber.save();
    }

    res.json({ status: 'success', message: 'شما از خبرنامه لغو عضویت شدید' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get all subscribers (admin)
router.get('/subscribers', authMiddleware, async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
    const active = subscribers.filter(s => s.is_active).length;

    res.json({
      status: 'success',
      count: subscribers.length,
      active,
       subscribers
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Delete subscriber (admin)
router.delete('/subscribers/:id', authMiddleware, async (req, res) => {
  try {
    const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ status: 'error', message: 'مشترک یافت نشد' });
    }

    res.json({ status: 'success', message: 'مشترک حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
