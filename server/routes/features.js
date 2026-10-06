/**
 * Feature Routes
 * مسیرهای ویژگی‌ها
 */

const express = require('express');
const router = express.Router();
const Feature = require('../models/Feature');
const authMiddleware = require('../middleware/auth');

// Get all active features (public)
router.get('/', async (req, res) => {
  try {
    const features = await Feature.find({ is_active: true }).sort({ sort_order: 1 });
    res.json({ status: 'success', count: features.length, data: features });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get all features (admin)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const features = await Feature.find().sort({ sort_order: 1 });
    res.json({ status: 'success', count: features.length, data: features });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create feature (admin)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, icon, color, is_active, sort_order } = req.body;

    const feature = new Feature({
      title,
      description,
      icon: icon || 'fas fa-star',
      color: color || 'from-teal-500 to-teal-600',
      is_active: is_active === 'true' || is_active === true,
      sort_order: sort_order || 0
    });

    await feature.save();

    res.status(201).json({
      status: 'success',
      message: 'ویژگی با موفقیت اضافه شد',
      data: feature
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Update feature (admin)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { title, description, icon, color, is_active, sort_order } = req.body;

    const updated = await Feature.findByIdAndUpdate(
      req.params.id,
      { title, description, icon, color, is_active, sort_order },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ status: 'error', message: 'ویژگی یافت نشد' });
    }

    res.json({
      status: 'success',
      message: 'ویژگی با موفقیت ویرایش شد',
      data: updated
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Delete feature (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const feature = await Feature.findByIdAndDelete(req.params.id);

    if (!feature) {
      return res.status(404).json({ status: 'error', message: 'ویژگی یافت نشد' });
    }

    res.json({ status: 'success', message: 'ویژگی با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
