/**
 * Newsletter Subscriber Model
 * مدل مشترکین خبرنامه
 */

const mongoose = require('mongoose');

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'ایمیل الزامی است'],
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

newsletterSubscriberSchema.index({ email: 1 });
newsletterSubscriberSchema.index({ is_active: 1 });

module.exports = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
