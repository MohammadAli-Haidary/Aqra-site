/**
 * Feature Model
 * مدل ویژگی‌های سایت
 */

const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان ویژگی الزامی است'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'توضیحات الزامی است'],
    trim: true
  },
  icon: {
    type: String,
    default: 'fas fa-star'
  },
  color: {
    type: String,
    default: 'from-teal-500 to-teal-600'
  },
  is_active: {
    type: Boolean,
    default: true
  },
  sort_order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

featureSchema.index({ is_active: 1, sort_order: 1 });

module.exports = mongoose.model('Feature', featureSchema);
