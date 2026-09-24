/**
 * Books Routes
 * مسیرهای کتاب‌ها
 */

const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authMiddleware = require('../middleware/auth');
const { uploadBook } = require('../middleware/upload');

// Get all books (public)
router.get('/', async (req, res) => {
  try {
    const { category, badge, search } = req.query;
    
    const filter = {};
    if (category) filter.category = category;
    if (badge) filter.badge = badge;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });

    res.json({
      status: 'success',
      count: books.length,
       books
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get bestsellers
router.get('/filter/bestsellers', async (req, res) => {
  try {
    const books = await Book.find({ badge: 'پرفروش' }).sort({ rating: -1 });
    res.json({ status: 'success',  books });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get new arrivals
router.get('/filter/new-arrivals', async (req, res) => {
  try {
    const books = await Book.find({ is_new: true }).sort({ createdAt: -1 });
    res.json({ status: 'success',  books });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ status: 'error', message: 'کتاب یافت نشد' });
    }

    res.json({ status: 'success',  book });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create book (admin)
router.post('/', authMiddleware, uploadBook.single('image'), async (req, res) => {
  try {
    const { title, author, price, old_price, rating, badge, category, cover, is_new, description, stock } = req.body;
    
    const image_url = req.file ? `/uploads/books/${req.file.filename}` : null;

    const book = new Book({
      title,
      author,
      price,
      old_price,
      rating: rating || 5,
      badge: badge || 'جدید',
      category,
      cover: cover || '📕',
      is_new: is_new === 'true' || is_new === true,
      description,
      image_url,
      stock: stock || 0
    });

    await book.save();

    res.status(201).json({
      status: 'success',
      message: 'کتاب با موفقیت اضافه شد',
       book
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Update book (admin)
router.put('/:id', authMiddleware, uploadBook.single('image'), async (req, res) => {
  try {
    const { title, author, price, old_price, rating, badge, category, cover, is_new, description, stock } = req.body;
    
    const existingBook = await Book.findById(req.params.id);
    if (!existingBook) {
      return res.status(404).json({ status: 'error', message: 'کتاب یافت نشد' });
    }

    const image_url = req.file ? `/uploads/books/${req.file.filename}` : existingBook.image_url;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        price,
        old_price,
        rating,
        badge,
        category,
        cover,
        is_new: is_new === 'true' || is_new === true,
        description,
        image_url,
        stock
      },
      { new: true, runValidators: true }
    );

    res.json({
      status: 'success',
      message: 'کتاب با موفقیت ویرایش شد',
       updatedBook
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Delete book (admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ status: 'error', message: 'کتاب یافت نشد' });
    }

    res.json({ status: 'success', message: 'کتاب با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
