/**
 * Database Configuration
 * SQLite Database for Egra Bookstore
 */

const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || './database/egra.db';

// Ensure database directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db;

function getDatabase() {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function initDatabase() {
  const database = getDatabase();

  // Create tables
  database.exec(`
    -- Admin users table
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      email TEXT,
      full_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );

    -- Books table
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      price TEXT NOT NULL,
      old_price TEXT,
      rating REAL DEFAULT 5,
      badge TEXT DEFAULT 'جدید',
      category TEXT,
      cover TEXT DEFAULT '📕',
      is_new INTEGER DEFAULT 0,
      description TEXT,
      image_url TEXT,
      stock INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Gallery table
    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT,
      description TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Categories table
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      icon TEXT DEFAULT 'fas fa-book',
      count INTEGER DEFAULT 0,
      description TEXT,
      sort_order INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Testimonials table
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT,
      text TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      avatar TEXT DEFAULT '👤',
      is_approved INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Contact messages table
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Newsletter subscribers table
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      name TEXT,
      is_active INTEGER DEFAULT 1,
      subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Site settings table
    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      setting_key TEXT UNIQUE NOT NULL,
      setting_value TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed default data if tables are empty
  seedDefaultData(database);
  
  console.log('✅ دیتابیس با موفقیت ایجاد شد');
  return database;
}

function seedDefaultData(database) {
  // Check if admin exists
  const adminCount = database.prepare('SELECT COUNT(*) as count FROM admins').get();
  if (adminCount.count === 0) {
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
    database.prepare(`
      INSERT INTO admins (username, password, email, full_name) 
      VALUES (?, ?, ?, ?)
    `).run(
      process.env.ADMIN_USERNAME || 'admin',
      hashedPassword,
      'admin@egra-book.af',
      'مدیر سایت'
    );
    console.log('✅ ادمین پیش‌فرض ایجاد شد');
  }

  // Seed default categories if empty
  const catCount = database.prepare('SELECT COUNT(*) as count FROM categories').get();
  if (catCount.count === 0) {
    const defaultCategories = [
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

    const insertCat = database.prepare('INSERT INTO categories (name, icon, count) VALUES (?, ?, ?)');
    defaultCategories.forEach(cat => insertCat.run(cat.name, cat.icon, cat.count));
    console.log('✅ دسته‌بندی‌های پیش‌فرض ایجاد شدند');
  }

  // Seed default books if empty
  const bookCount = database.prepare('SELECT COUNT(*) as count FROM books').get();
  if (bookCount.count === 0) {
    const defaultBooks = [
      { title: 'بوف کور', author: 'صادق هدایت', price: '۸۵۰', old_price: '۱,۲۰۰', rating: 4.8, badge: 'پرفروش', category: 'ادبیات داستانی', cover: '📕', is_new: 0 },
      { title: 'کلیدر', author: 'محمود دولت‌آبادی', price: '۲,۵۰۰', old_price: '۳,۵۰۰', rating: 4.9, badge: 'پرفروش', category: 'ادبیات داستانی', cover: '📗', is_new: 0 },
      { title: 'شازده احتجاب', author: 'هوشنگ گلشیری', price: '۶۵۰', old_price: '۹۰۰', rating: 4.5, badge: 'جدید', category: 'ادبیات داستانی', cover: '📘', is_new: 1 },
      { title: 'دیوان حافظ', author: 'حافظ شیرازی', price: '۱,۵۰۰', old_price: '۲,۰۰۰', rating: 5.0, badge: 'پرفروش', category: 'شعر و ادبیات', cover: '📙', is_new: 0 },
      { title: 'مثنوی معنوی', author: 'مولانا جلال‌الدین', price: '۱,۸۰۰', old_price: '۲,۵۰۰', rating: 4.9, badge: 'پرفروش', category: 'شعر و ادبیات', cover: '📕', is_new: 0 },
      { title: 'قدرت عادت', author: 'چارلز داهیگ', price: '۹۵۰', old_price: '۱,۳۰۰', rating: 4.6, badge: 'جدید', category: 'روانشناسی', cover: '📗', is_new: 1 },
      { title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', price: '۷۵۰', old_price: '۱,۱۰۰', rating: 4.7, badge: 'جدید', category: 'روانشناسی', cover: '📘', is_new: 1 },
      { title: 'تاریخ افغانستان', author: 'مراد علی مراد', price: '۲,۲۰۰', old_price: '۳,۰۰۰', rating: 4.4, badge: 'پرفروش', category: 'تاریخ', cover: '📙', is_new: 0 },
    ];

    const insertBook = database.prepare(`
      INSERT INTO books (title, author, price, old_price, rating, badge, category, cover, is_new) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    defaultBooks.forEach(book => insertBook.run(book.title, book.author, book.price, book.old_price, book.rating, book.badge, book.category, book.cover, book.is_new));
    console.log('✅ کتاب‌های پیش‌فرض ایجاد شدند');
  }

  // Seed default gallery if empty
  const galleryCount = database.prepare('SELECT COUNT(*) as count FROM gallery').get();
  if (galleryCount.count === 0) {
    const defaultGallery = [
      { title: 'صنف ادبیات', category: 'فروشگاه' },
      { title: 'بخش کودکان', category: 'فروشگاه' },
      { title: 'نمای بیرونی فروشگاه', category: 'فروشگاه' },
      { title: 'کتاب‌های کلاسیک', category: 'کتاب' },
      { title: 'کتاب‌های هنری', category: 'کتاب' },
      { title: 'لوازم تحریر', category: 'محصولات' },
    ];

    const insertGallery = database.prepare('INSERT INTO gallery (title, category) VALUES (?, ?)');
    defaultGallery.forEach(item => insertGallery.run(item.title, item.category));
    console.log('✅ گالری پیش‌فرض ایجاد شد');
  }

  // Seed default testimonials if empty
  const testCount = database.prepare('SELECT COUNT(*) as count FROM testimonials').get();
  if (testCount.count === 0) {
    const defaultTestimonials = [
      { name: 'احمد نجفی', role: 'محصل پوهنتون کابل', text: 'بهترین کتاب‌فروشی آنلاین که تا حالا باهاش کار کردم. ارسال سریع و کتاب‌های اصل.', rating: 5, avatar: '👨‍🎓' },
      { name: 'فاطمه رحیمی', role: 'استاد پوهنتون', text: 'من همیشه کتاب‌های درسی و مرجع خود را از اقرأ خریداری می‌کنم. تنوع کتاب‌ها فوق‌العاده است.', rating: 5, avatar: '👩‍🏫' },
      { name: 'محمد کریمی', role: 'نویسنده و شاعر', text: 'بسته‌بندی کتاب‌ها عالی است و ارسال به هرات هم خیلی سریع انجام شد.', rating: 4, avatar: '👨‍💼' },
    ];

    const insertTest = database.prepare('INSERT INTO testimonials (name, role, text, rating, avatar) VALUES (?, ?, ?, ?, ?)');
    defaultTestimonials.forEach(test => insertTest.run(test.name, test.role, test.text, test.rating, test.avatar));
    console.log('✅ نظرات پیش‌فرض ایجاد شدند');
  }

  // Seed default settings
  const settingsCount = database.prepare('SELECT COUNT(*) as count FROM site_settings').get();
  if (settingsCount.count === 0) {
    const defaultSettings = [
      { key: 'site_name', value: 'کتاب‌فروشی اقرأ' },
      { key: 'site_description', value: 'بزرگترین کتاب‌فروشی کابل، افغانستان' },
      { key: 'site_address', value: 'کابل، سرک اصلی دارالامان، نمره ۴۵' },
      { key: 'site_phone', value: '+۹۳ ۷۰ ۱۲۳ ۴۵۶۷' },
      { key: 'site_email', value: 'info@egra-book.af' },
      { key: 'site_working_hours', value: 'شنبه تا پنجشنبه: ۸ صبح تا ۸ شب' },
      { key: 'free_shipping_threshold', value: '2000' },
    ];

    const insertSetting = database.prepare('INSERT INTO site_settings (setting_key, setting_value) VALUES (?, ?)');
    defaultSettings.forEach(setting => insertSetting.run(setting.key, setting.value));
    console.log('✅ تنظیمات پیش‌فرض ایجاد شدند');
  }
}

// Handle seed command
if (process.argv[2] === 'seed') {
  initDatabase();
  console.log('🌱 داده‌های پیش‌فرض با موفقیت ایجاد شدند');
  process.exit(0);
}

module.exports = { getDatabase, initDatabase };
