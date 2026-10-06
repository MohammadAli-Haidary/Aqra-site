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
const Slider = require('../models/Slider');
const Feature = require('../models/Feature');

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
    await Slider.deleteMany({});
    await Feature.deleteMany({});

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
    await SiteSetting.create({
      site_name: 'کتاب‌فروشی اقرأ',
      site_description: 'بزرگترین کتاب‌فروشی کابل، افغانستان',
      address: 'کابل، سرک اصلی دارالامان، نمره ۴۵',
      phone: '+۹۳ ۷۰ ۱۲۳ ۴۵۶۷',
      email: 'info@egra-book.af',
      working_hours: 'شنبه تا پنجشنبه: ۸ صبح تا ۸ شب',
      about_text: 'کتاب‌فروشی اقرأ با بیش از ۱۵ سال سابقه درخشان در عرصه نشر و کتاب، یکی از معتبرترین و بزرگترین کتاب‌فروشی‌ها در شهر کابل، افغانستان است. ما از سال ۱۳۸۸ با هدف ترویج فرهنگ کتاب‌خوانی و فراهم‌سازی دسترسی آسان هموطنان عزیز به کتاب‌های باکیفیت، فعالیت خود را آغاز کردیم.',
      total_books: 10000,
      total_customers: 50000,
      years_experience: 15,
      provinces_covered: 34,
      free_shipping_threshold: 2000
    });

    // Seed Sliders
    console.log('🎬 ایجاد اسلایدرها...');
    const sliders = [
      { title: 'دنیای بی‌پایان کتاب', subtitle: 'بهترین کتاب‌ها با بهترین قیمت', description: 'بیش از ۱۰,۰۰۰ عنوان کتاب در دسته‌بندی‌های مختلف - ارسال به سراسر افغانستان', background: 'from-teal-900 via-teal-800 to-emerald-900', sort_order: 1 },
      { title: 'تخفیف‌های ویژه', subtitle: 'تا ۵۰٪ تخفیف روی کتاب‌های پرفروش', description: 'فرصت را از دست ندهید! خرید آنلاین با ارسال به تمام ولایات افغانستان', background: 'from-teal-800 via-cyan-800 to-teal-900', sort_order: 2 },
      { title: 'کتاب‌های تازه', subtitle: 'جدیدترین آثار نویسندگان برتر', description: 'هر هفته کتاب‌های جدید به مجموعه ما اضافه می‌شود', background: 'from-emerald-900 via-teal-800 to-teal-900', sort_order: 3 },
      { title: '۱۵ سال اعتماد', subtitle: 'معتبرترین کتاب‌فروشی کابل', description: 'بیش از ۵۰,۰۰۰ مشتری راضی در سراسر افغانستان', background: 'from-teal-900 via-emerald-900 to-teal-800', sort_order: 4 },
    ];
    await Slider.insertMany(sliders);

    // Seed Features
    console.log('✨ ایجاد ویژگی‌ها...');
    const features = [
      { title: 'ارسال سریع', description: 'ارسال به سراسر افغانستان در کمترین زمان ممکن', icon: 'fas fa-truck-fast', color: 'from-blue-500 to-blue-600', sort_order: 1 },
      { title: 'ضمانت اصالت', description: 'تمامی کتاب‌ها اصل و با مجوز رسمی نشر هستند', icon: 'fas fa-shield-halved', color: 'from-emerald-500 to-emerald-600', sort_order: 2 },
      { title: 'تخفیف‌های ویژه', description: 'تخفیف‌های هفتگی و فصلی برای مشتریان ویژه', icon: 'fas fa-percent', color: 'from-teal-500 to-teal-600', sort_order: 3 },
      { title: 'پشتیبانی ۲۴/۷', description: 'تیم پشتیبانی ما همیشه آماده پاسخگویی شما عزیزان است', icon: 'fas fa-headset', color: 'from-purple-500 to-purple-600', sort_order: 4 },
      { title: 'پس‌دادن آسان', description: 'امکان پس‌دادن کتاب تا ۷ روز بدون هیچ شرطی', icon: 'fas fa-rotate-left', color: 'from-rose-500 to-rose-600', sort_order: 5 },
      { title: 'پرداخت آسان', description: 'پرداخت نقدی در محل و آنلاین با تمام بانک‌های افغانستان', icon: 'fas fa-money-bill-wave', color: 'from-indigo-500 to-indigo-600', sort_order: 6 },
    ];
    await Feature.insertMany(features);

    console.log('\n═══════════════════════════════════════════');
    console.log('   ✅ دیتابیس با موفقیت seed شد!');
    console.log('═══════════════════════════════════════════');
    console.log('   👤 Admin: admin / admin123');
    console.log('   📚 Books: 8');
    console.log('   📂 Categories: 12');
    console.log('   🖼️ Gallery: 6');
    console.log('   💬 Testimonials: 3');
    console.log('   ⚙️ Settings: 1');
    console.log('   🎬 Sliders: 4');
    console.log('   ✨ Features: 6');
    console.log('═══════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ خطا در seed دیتابیس:', error);
    process.exit(1);
  }
};

seedDatabase();
