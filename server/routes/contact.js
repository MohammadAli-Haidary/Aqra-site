/**
 * Contact Routes
 * مسیرهای تماس
 */

const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const authMiddleware = require('../middleware/auth');

// Submit contact message (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        status: 'error',
        message: 'نام، ایمیل و پیام الزامی است'
      });
    }

    const contactMessage = new ContactMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    await contactMessage.save();

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
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    
    const unread = messages.filter(m => !m.is_read).length;

    res.json({
      status: 'success',
      count: messages.length,
      unread,
       messages
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Mark message as read (admin)
router.patch('/:id/read', authMiddleware, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { is_read: true },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ status: 'error', message: 'پیام یافت نشد' });
    }

    res.json({ status: 'success', message: 'پیام خوانده شد',  message });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Delete message (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ status: 'error', message: 'پیام یافت نشد' });
    }

    res.json({ status: 'success', message: 'پیام حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
