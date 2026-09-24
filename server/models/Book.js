/**
 * Book Model
 * مدل کتاب
 */

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان کتاب الزامی است'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'نام نویسنده الزامی است'],
    trim: true
  },
  price: {
    type: String,
    required: [true, 'قیمت الزامی است']
  },
  old_price: {
    type: String
  },
  rating: {
    type: Number,
    default: 5,
    min: 0,
    max: 5
  },
  badge: {
    type: String,
    enum: ['پرفروش', 'جدید', 'ویژه'],
    default: 'جدید'
  },
  category: {
    type: String,
    trim: true
  },
  cover: {
    type: String,
    default: '📕'
  },
  is_new: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    trim: true
  },
  image_url: {
    type: String
  },
  stock: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
bookSchema.index({ title: 'text', author: 'text' });
bookSchema.index({ category: 1 });
bookSchema.index({ badge: 1 });
bookSchema.index({ is_new: 1 });

module.exports = mongoose.model('Book', bookSchema);
