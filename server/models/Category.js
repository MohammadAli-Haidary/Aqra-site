/**
 * Category Model
 * مدل دسته‌بندی
 */

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام دسته‌بندی الزامی است'],
    trim: true,
    unique: true
  },
  icon: {
    type: String,
    default: 'fas fa-book'
  },
  count: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    trim: true
  },
  sort_order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

categorySchema.index({ sort_order: 1 });
categorySchema.index({ name: 1 });

module.exports = mongoose.model('Category', categorySchema);
