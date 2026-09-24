/**
 * Gallery Routes
 * مسیرهای گالری
 */

const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');
const authMiddleware = require('../middleware/auth');
const { uploadGallery } = require('../middleware/upload');

// Get all gallery items (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    
    const filter = {};
    if (category) filter.category = category;

    const items = await Gallery.find(filter).sort({ sort_order: 1, createdAt: -1 });

    res.json({ status: 'success', count: items.length,  items });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get gallery categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Gallery.distinct('category');
    res.json({ status: 'success',  categories });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create gallery item (admin)
router.post('/', authMiddleware, uploadGallery.single('image'), async (req, res) => {
  try {
    const { title, category, description, sort_order } = req.body;
    
    const image_url = req.file ? `/uploads/gallery/${req.file.filename}` : null;

    const item = new Gallery({
      title,
      category,
      image_url,
      description,
      sort_order: sort_order || 0
    });

    await item.save();

    res.status(201).json({
      status: 'success',
      message: 'تصویر با موفقیت اضافه شد',
       item
    });
  } catch (error) {
    console.error('Create gallery error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Update gallery item (admin)
router.put('/:id', authMiddleware, uploadGallery.single('image'), async (req, res) => {
  try {
    const { title, category, description, sort_order } = req.body;
    
    const existing = await Gallery.findById(req.params.id);
    if (!existing) {
      return res.status(404).json({ status: 'error', message: 'تصویر یافت نشد' });
    }

    const image_url = req.file ? `/uploads/gallery/${req.file.filename}` : existing.image_url;

    const updated = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, category, image_url, description, sort_order },
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      message: 'تصویر با موفقیت ویرایش شد',
       updated
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Delete gallery item (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Gallery.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ status: 'error', message: 'تصویر یافت نشد' });
    }

    res.json({ status: 'success', message: 'تصویر با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
