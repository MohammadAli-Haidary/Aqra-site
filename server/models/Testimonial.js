/**
 * Testimonial Model
 * مدل نظرات مشتریان
 */

const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام الزامی است'],
    trim: true
  },
  role: {
    type: String,
    trim: true
  },
  text: {
    type: String,
    required: [true, 'متن نظر الزامی است'],
    trim: true
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5
  },
  avatar: {
    type: String,
    default: '👤'
  },
  is_approved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

testimonialSchema.index({ is_approved: 1 });

module.exports = mongoose.model('Testimonial', testimonialSchema);
