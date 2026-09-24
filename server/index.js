/**
 * کتاب‌فروشی اقرأ - سرور اصلی
 * Egra Bookstore - Main Server
 * 
 * Backend API for Egra Bookstore
 * Built with Node.js, Express, and SQLite
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

// Import routes
const booksRouter = require('./routes/books');
const galleryRouter = require('./routes/gallery');
const categoriesRouter = require('./routes/categories');
const testimonialsRouter = require('./routes/testimonials');
const contactRouter = require('./routes/contact');
const newsletterRouter = require('./routes/newsletter');
const authRouter = require('./routes/auth');
const settingsRouter = require('./routes/settings');

// Import database initialization
const { initDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

// Create necessary directories
const dirs = ['uploads', 'uploads/gallery', 'uploads/books', 'database'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Initialize database
initDatabase();

// ============ Middleware ============

// Security
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX || 100,
  message: { error: 'درخواست‌های زیاد، لطفاً بعداً دوباره تلاش کنید' }
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
app.use(morgan('combined'));

// Static files - serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// ============ API Routes ============

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'کتاب‌فروشی اقرأ - سرور فعال است',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/books', booksRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/settings', settingsRouter);

// ============ Error Handling ============

// 404 handler
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'مسیر مورد نظر یافت نشد'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      status: 'error',
      message: 'حجم فایل بیش از حد مجاز است (حداکثر 5MB)'
    });
  }

  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'خطای سرور، لطفاً بعداً تلاش کنید',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Serve frontend for non-API routes (production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// ============ Start Server ============

app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════');
  console.log('   کتاب‌فروشی اقرأ - سرور بک‌اند');
  console.log('   Egra Bookstore Backend Server');
  console.log('═══════════════════════════════════════════');
  console.log(`   🚀 سرور در پورت ${PORT} فعال است`);
  console.log(`   🌐 آدرس: http://localhost:${PORT}`);
  console.log(`   📚 API: http://localhost:${PORT}/api`);
  console.log(`   🏥 Health: http://localhost:${PORT}/api/health`);
  console.log('═══════════════════════════════════════════');
});

module.exports = app;
