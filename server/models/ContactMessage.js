/**
 * Contact Message Model
 * مدل پیام‌های تماس
 */

const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'نام الزامی است'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  subject: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    required: [true, 'پیام الزامی است'],
    trim: true
  },
  is_read: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

contactMessageSchema.index({ is_read: 1 });
contactMessageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
