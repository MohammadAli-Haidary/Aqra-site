/**
 * Slider Model
 * مدل اسلایدر صفحه اصلی
 */

const mongoose = require('mongoose');

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'عنوان اسلاید الزامی است'],
    trim: true
  },
  subtitle: {
    type: String,
    required: [true, 'زیرعنوان الزامی است'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  background: {
    type: String,
    default: 'from-teal-900 via-teal-800 to-emerald-900'
  },
  image_url: {
    type: String
  },
  button_text: {
    type: String,
    default: 'مشاهده کتاب‌ها'
  },
  button_link: {
    type: String,
    default: '#books'
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

sliderSchema.index({ is_active: 1, sort_order: 1 });

module.exports = mongoose.model('Slider', sliderSchema);
