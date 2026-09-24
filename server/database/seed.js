/**
 * Database Seeder
 * وارد کردن داده‌های اولیه به MongoDB
 */

require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const Book = require('../models/Book');
const Category = require('../models/Category');
const Gallery = require('../models/Gallery');
const Testimonial = require('../models/Testimonial');
const SiteSetting = require('../models/SiteSetting');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/egra_bookstore');
    console.log('✅ اتصال به MongoDB برقرار شد');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️ پاک کردن داده‌های قبلی...');
    await Admin.deleteMany({});
    await Book.deleteMany({});
    await Category.deleteMany({});
    await Gallery.deleteMany({});
    await Testimonial.deleteMany({});
    await SiteSetting.deleteMany({});

    // Seed Admin
    console.log('👤 ایجاد ادمین...');
    await Admin.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      email: 'admin@egra-book.af',
      full_name: 'مدیر سایت'
    });

    // Seed Categories
    console.log('📂 ایجاد دسته‌بندی‌ها...');
    const categories = [
      { name: 'ادبیات داستانی', icon: 'fas fa-book', count: 1250 },
      { name: 'شعر و ادبیات', icon: 'fas fa-feather-pointed', count: 890 },
      { name: 'روانشناسی', icon: 'fas fa-brain', count: 650 },
      { name: 'تاریخ افغانستان', icon: 'fas fa-landmark', count: 780 },
      { name: 'کودک و نوجوان', icon: 'fas fa-child', count: 1100 },
      { name: 'علوم دینی', icon: 'fas fa-mosque', count: 920 },
      { name: 'کتاب‌های درسی', icon: 'fas fa-graduation-cap', count: 1450 },
      { name: 'زبان انگلیسی', icon: 'fas fa-language', count: 560 },
      { name: 'سیاست و اجتماع', icon: 'fas fa-scale-balanced', count: 430 },
      { name: 'فلسفه و منطق', icon: 'fas fa-lightbulb', count: 380 },
      { name: 'کمپیوتر و تکنالوژی', icon: 'fas fa-laptop-code', count: 620 },
      { name: 'صحت و طب', icon: 'fas fa-heart-pulse', count: 510 },
    ];
    await Category.insertMany(categories);

    // Seed Books
    console.log('📚 ایجاد کتاب‌ها...');
    const books = [
      { title: 'بوف کور', author: 'صادق هدایت', price: '۸۵۰', old_price: '۱,۲۰۰', rating: 4.8, badge: 'پرفروش', category: 'ادبیات داستانی', cover: '📕', is_new: false },
      { title: 'کلیدر', author: 'محمود دولت‌آبادی', price: '۲,۵۰۰', old_price: '۳,۵۰۰', rating: 4.9, badge: 'پرفروش', category: 'ادبیات داستانی', cover: '📗', is_new: false },
      { title: 'شازده احتجاب', author: 'هوشنگ گلشیری', price: '۶۵۰', old_price: '۹۰۰', rating: 4.5, badge: 'جدید', category: 'ادبیات داستانی', cover: '📘', is_new: true },
      { title: 'دیوان حافظ', author: 'حافظ شیرازی', price: '۱,۵۰۰', old_price: '۲,۰۰۰', rating: 5.0, badge: 'پرفروش', category: 'شعر و ادبیات', cover: '📙', is_new: false },
      { title: 'مثنوی معنوی', author: 'مولانا جلال‌الدین', price: '۱,۸۰۰', old_price: '۲,۵۰۰', rating: 4.9, badge: 'پرفروش', category: 'شعر و ادبیات', cover: '📕', is_new: false },
      { title: 'قدرت عادت', author: 'چارلز داهیگ', price: '۹۵۰', old_price: '۱,۳۰۰', rating: 4.6, badge: 'جدید', category: 'روانشناسی', cover: '📗', is_new: true },
      { title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', price: '۷۵۰', old_price: '۱,۱۰۰', rating: 4.7, badge: 'جدید', category: 'روانشناسی', cover: '📘', is_new: true },
      { title: 'تاریخ افغانستان', author: 'مراد علی مراد', price: '۲,۲۰۰', old_price: '۳,۰۰۰', rating: 4.4, badge: 'پرفروش', category: 'تاریخ', cover: '📙', is_new: false },
    ];
    await Book.insertMany(books);

    // Seed Gallery
    console.log('🖼️ ایجاد گالری...');
    const galleryItems = [
      { title: 'صنف ادبیات', category: 'فروشگاه' },
      { title: 'بخش کودکان', category: 'فروشگاه' },
      { title: 'نمای بیرونی فروشگاه', category: 'فروشگاه' },
      { title: 'کتاب‌های کلاسیک', category: 'کتاب' },
      { title: 'کتاب‌های هنری', category: 'کتاب' },
      { title: 'لوازم تحریر', category: 'محصولات' },
    ];
    await Gallery.insertMany(galleryItems);

    // Seed Testimonials
    console.log('💬 ایجاد نظرات...');
    const testimonials = [
      { name: 'احمد نجفی', role: 'محصل پوهنتون کابل', text: 'بهترین کتاب‌فروشی آنلاین که تا حالا باهاش کار کردم. ارسال سریع و کتاب‌های اصل.', rating: 5, avatar: '👨‍🎓', is_approved: true },
      { name: 'فاطمه رحیمی', role: 'استاد پوهنتون', text: 'من همیشه کتاب‌های درسی و مرجع خود را از اقرأ خریداری می‌کنم. تنوع کتاب‌ها فوق‌العاده است.', rating: 5, avatar: '👩‍🏫', is_approved: true },
      { name: 'محمد کریمی', role: 'نویسنده و شاعر', text: 'بسته‌بندی کتاب‌ها عالی است و ارسال به هرات هم خیلی سریع انجام شد.', rating: 4, avatar: '👨‍💼', is_approved: true },
    ];
    await Testimonial.insertMany(testimonials);

    // Seed Settings
    console.log('⚙️ ایجاد تنظیمات...');
    const settings = [
      { setting_key: 'site_name', setting_value: 'کتاب‌فروشی اقرأ' },
      { setting_key: 'site_description', setting_value: 'بزرگترین کتاب‌فروشی کابل، افغانستان' },
      { setting_key: 'site_address', setting_value: 'کابل، سرک اصلی دارالامان، نمره ۴۵' },
      { setting_key: 'site_phone', setting_value: '+۹۳ ۷۰ ۱۲۳ ۴۵۶۷' },
      { setting_key: 'site_email', setting_value: 'info@egra-book.af' },
      { setting_key: 'site_working_hours', setting_value: 'شنبه تا پنجشنبه: ۸ صبح تا ۸ شب' },
      { setting_key: 'free_shipping_threshold', setting_value: '2000' },
    ];
    await SiteSetting.insertMany(settings);

    console.log('\n═══════════════════════════════════════════');
    console.log('   ✅ دیتابیس با موفقیت seed شد!');
    console.log('═══════════════════════════════════════════');
    console.log('   👤 Admin: admin / admin123');
    console.log('   📚 Books: 8');
    console.log('   📂 Categories: 12');
    console.log('   🖼️ Gallery: 6');
    console.log('   💬 Testimonials: 3');
    console.log('   ⚙️ Settings: 7');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ خطا در seed دیتابیس:', error);
    process.exit(1);
  }
};

seedDatabase();
