/**
 * Gallery Model
 * مدل گالری تصاویر
 */

const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان تصویر الزامی است'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'دسته‌بندی الزامی است'],
    trim: true
  },
  image_url: {
    type: String
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

gallerySchema.index({ category: 1 });
gallerySchema.index({ sort_order: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
