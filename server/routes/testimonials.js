/**
 * Testimonials Routes
 * مسیرهای نظرات
 */

const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const authMiddleware = require('../middleware/auth');

// Get approved testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ is_approved: true }).sort({ createdAt: -1 });
    res.json({ status: 'success', count: testimonials.length,  testimonials });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get all testimonials (admin)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json({ status: 'success', count: testimonials.length,  testimonials });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Submit testimonial (public - needs approval)
router.post('/', async (req, res) => {
  try {
    const { name, role, text, rating, avatar } = req.body;

    if (!name || !text) {
      return res.status(400).json({ status: 'error', message: 'نام و متن نظر الزامی است' });
    }

    const testimonial = new Testimonial({
      name,
      role,
      text,
      rating: rating || 5,
      avatar: avatar || '👤',
      is_approved: false
    });

    await testimonial.save();

    res.status(201).json({
      status: 'success',
      message: 'نظر شما ثبت شد و پس از تأیید نمایش داده خواهد شد',
       testimonial
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Approve testimonial (admin)
router.patch('/:id/approve', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { is_approved: true },
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ status: 'error', message: 'نظر یافت نشد' });
    }

    res.json({ status: 'success', message: 'نظر تأیید شد',  testimonial });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create testimonial (admin - auto approved)
router.post('/admin', authMiddleware, async (req, res) => {
  try {
    const { name, role, text, rating, avatar } = req.body;

    const testimonial = new Testimonial({
      name,
      role,
      text,
      rating: rating || 5,
      avatar: avatar || '👤',
      is_approved: true
    });

    await testimonial.save();

    res.status(201).json({
      status: 'success',
      message: 'نظر با موفقیت اضافه شد',
       testimonial
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Update testimonial (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { name, role, text, rating, avatar, is_approved } = req.body;

    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { name, role, text, rating, avatar, is_approved },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'نظر یافت نشد' });
    }

    res.json({
      status: 'success',
      message: 'نظر با موفقیت ویرایش شد',
       updated
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Delete testimonial (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ status: 'error', message: 'نظر یافت نشد' });
    }

    res.json({ status: 'success', message: 'نظر با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
