/**
 * Books Routes
 */

const express = require('express');
const router = express.Router();
const { getDatabase } = require('../database');
const authMiddleware = require('../middleware/auth');
const { uploadBook } = require('../middleware/upload');

// Get all books (public)
router.get('/', (req, res) => {
  try {
    const db = getDatabase();
    const { category, badge, search } = req.query;
    
    let query = 'SELECT * FROM books';
    const params = [];
    const conditions = [];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }
    if (badge) {
      conditions.push('badge = ?');
      params.push(badge);
    }
    if (search) {
      conditions.push('(title LIKE ? OR author LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY created_at DESC';

    const books = db.prepare(query).all(...params);

    res.json({
      status: 'success',
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Get books error:', error);
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get single book
router.get('/:id', (req, res) => {
  try {
    const db = getDatabase();
    const book = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);

    if (!book) {
      return res.status(404).json({ status: 'error', message: 'کتاب یافت نشد' });
    }

    res.json({ status: 'success', data: book });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Create book (admin)
router.post('/', authMiddleware, uploadBook.single('image'), (req, res) => {
  try {
    const db = getDatabase();
    const { title, author, price, old_price, rating, badge, category, cover, is_new, description, stock } = req.body;
    
    const image_url = req.file ? `/uploads/books/${req.file.filename}` : null;

    const result = db.prepare(`
      INSERT INTO books (title, author, price, old_price, rating, badge, category, cover, is_new, description, image_url, stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(title, author, price, old_price || null, rating || 5, badge || 'جدید', category, cover || '📕', is_new ? 1 : 0, description || null, image_url, stock || 0);

    const newBook = db.prepare('SELECT * FROM books WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({
      status: 'success',
      message: 'کتاب با موفقیت اضافه شد',
      data: newBook
    });
  } catch (error) {
    console.error('Create book error:', error);
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Update book (admin)
router.put('/:id', authMiddleware, uploadBook.single('image'), (req, res) => {
  try {
    const db = getDatabase();
    const { title, author, price, old_price, rating, badge, category, cover, is_new, description, stock } = req.body;
    
    const existingBook = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);
    if (!existingBook) {
      return res.status(404).json({ status: 'error', message: 'کتاب یافت نشد' });
    }

    const image_url = req.file ? `/uploads/books/${req.file.filename}` : existingBook.image_url;

    db.prepare(`
      UPDATE books SET title=?, author=?, price=?, old_price=?, rating=?, badge=?, category=?, cover=?, is_new=?, description=?, image_url=?, stock=?, updated_at=CURRENT_TIMESTAMP
      WHERE id=?
    `).run(title, author, price, old_price || null, rating, badge, category, cover, is_new ? 1 : 0, description || null, image_url, stock || 0, req.params.id);

    const updatedBook = db.prepare('SELECT * FROM books WHERE id = ?').get(req.params.id);

    res.json({
      status: 'success',
      message: 'کتاب با موفقیت ویرایش شد',
      data: updatedBook
    });
  } catch (error) {
    console.error('Update book error:', error);
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Delete book (admin)
router.delete('/:id', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const result = db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ status: 'error', message: 'کتاب یافت نشد' });
    }

    res.json({ status: 'success', message: 'کتاب با موفقیت حذف شد' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get bestsellers
router.get('/filter/bestsellers', (req, res) => {
  try {
    const db = getDatabase();
    const books = db.prepare("SELECT * FROM books WHERE badge = 'پرفروش' ORDER BY rating DESC").all();
    res.json({ status: 'success', data: books });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

// Get new arrivals
router.get('/filter/new-arrivals', (req, res) => {
  try {
    const db = getDatabase();
    const books = db.prepare('SELECT * FROM books WHERE is_new = 1 ORDER BY created_at DESC').all();
    res.json({ status: 'success', data: books });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'خطای سرور' });
  }
});

module.exports = router;
