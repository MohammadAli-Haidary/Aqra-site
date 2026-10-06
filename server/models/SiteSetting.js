/**
 * Site Setting Model
 * مدل تنظیمات سایت - نسخه کامل
 */

const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
  // تنظیمات عمومی
  site_name: { type: String, default: 'کتاب‌فروشی اقرأ' },
  site_description: { type: String, default: 'بزرگترین کتاب‌فروشی کابل، افغانستان' },
  site_logo: { type: String, default: 'fas fa-book-quran' },
  
  // اطلاعات تماس
  address: { type: String, default: 'کابل، سرک اصلی دارالامان، نمره ۴۵' },
  phone: { type: String, default: '+۹۳ ۷۰ ۱۲۳ ۴۵۶۷' },
  email: { type: String, default: 'info@egra-book.af' },
  working_hours: { type: String, default: 'شنبه تا پنجشنبه: ۸ صبح تا ۸ شب' },
  
  // شبکه‌های اجتماعی
  social_instagram: { type: String, default: '' },
  social_telegram: { type: String, default: '' },
  social_whatsapp: { type: String, default: '' },
  social_facebook: { type: String, default: '' },
  social_twitter: { type: String, default: '' },
  
  // متن‌های سایت
  about_text: { 
    type: String, 
    default: 'کتاب‌فروشی اقرأ با بیش از ۱۵ سال سابقه درخشان در عرصه نشر و کتاب، یکی از معتبرترین و بزرگترین کتاب‌فروشی‌ها در شهر کابل، افغانستان است.' 
  },
  hero_title: { type: String, default: 'دنیای بی‌پایان کتاب' },
  hero_subtitle: { type: String, default: 'بهترین کتاب‌ها با بهترین قیمت' },
  
  // آمار
  total_books: { type: Number, default: 10000 },
  total_customers: { type: Number, default: 50000 },
  years_experience: { type: Number, default: 15 },
  provinces_covered: { type: Number, default: 34 },
  
  // تنظیمات ارسال
  free_shipping_threshold: { type: Number, default: 2000 },
  
  // تنظیمات فعال/غیرفعال
  maintenance_mode: { type: Boolean, default: false },
  allow_registration: { type: Boolean, default: true },
  allow_comments: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
