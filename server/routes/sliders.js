/**
 * Slider Routes
 * مسیرهای اسلایدر
 */

const express = require('express');
const router = express.Router();
const Slider = require('../models/Slider');
const authMiddleware = require('../middleware/auth');
const { uploadGallery } = require('../middleware/upload');

// Get all active sliders (public)
router.get('/', async (req, res) => {
  try {
    const sliders = await Slider.find({ is_active: true }).sort({ sort_order: 1 });
    res.json({ status: 'success', count: sliders.length, data: sliders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get all sliders (admin)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ sort_order: 1 });
    res.json({ status: 'success', count: sliders.length, data: sliders });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create slider (admin)
router.post('/', authMiddleware, uploadGallery.single('image'), async (req, res) => {
  try {
    const { title, subtitle, description, background, button_text, button_link, is_active, sort_order } = req.body;
    
    const image_url = req.file ? `/uploads/gallery/${req.file.filename}` : null;

    const slider = new Slider({
      title,
      subtitle,
      description,
      background,
      image_url,
      button_text,
      button_link,
      is_active: is_active === 'true' || is_active === true,
      sort_order: sort_order || 0
    });

    await slider.save();

    res.status(201).json({
      status: 'success',
      message: 'اسلاید با موفقیت اضافه شد',
      data: slider
    });
  } catch (error) {
    console.error('Create slider error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Update slider (admin)
router.put('/:id', authMiddleware, uploadGallery.single('image'), async (req, res) => {
  try {
    const { title, subtitle, description, background, button_text, button_link, is_active, sort_order } = req.body;
    
    const existing = await Slider.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'اسلاید یافت نشد' });
    }

    const image_url = req.file ? `/uploads/gallery/${req.file.filename}` : existing.image_url;

    const updated = await Slider.findByIdAndUpdate(
      req.params.id,
      {
        title,
        subtitle,
        description,
        background,
        image_url,
        button_text,
        button_link,
        is_active: is_active === 'true' || is_active === true,
        sort_order
      },
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      message: 'اسلاید با موفقیت ویرایش شد',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Delete slider (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const slider = await Slider.findByIdAndDelete(req.params.id);

    if (!slider) {
      return res.status(404).json({ status: 'error', message: 'اسلاید یافت نشد' });
    }

    res.json({ status: 'success', message: 'اسلاید با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
