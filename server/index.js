/**
 * کتاب‌فروشی اقرأ - سرور اصلی
 * Egra Bookstore - Main Server
 * 
 * Backend API with MongoDB
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const connectDB = require('./database/connection');

// Import routes
const booksRouter = require('./routes/books');
const galleryRouter = require('./routes/gallery');
const categoriesRouter = require('./routes/categories');
const testimonialsRouter = require('./routes/testimonials');
const contactRouter = require('./routes/contact');
const newsletterRouter = require('./routes/newsletter');
const authRouter = require('./routes/auth');
const settingsRouter = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 5000;

// Create necessary directories
const dirs = ['uploads', 'uploads/gallery', 'uploads/books'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Connect to MongoDB
connectDB();

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
    database: 'MongoDB',
    timestamp: new Date().toISOString(),
    version: '2.0.0'
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
  
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      status: 'error',
      message: messages.join(', ')
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({
      status: 'error',
      message: 'این مقدار قبلاً ثبت شده است'
    });
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      status: 'error',
      message: 'حجم فایل بیش از حد مجاز است (حداکثر 5MB)'
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'توکن نامعتبر است'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      status: 'error',
      message: 'توکن منقضی شده است'
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
  console.log('   Database: MongoDB');
  console.log('═══════════════════════════════════════════');
  console.log(`   🚀 سرور در پورت ${PORT} فعال است`);
  console.log(`   🌐 آدرس: http://localhost:${PORT}`);
  console.log(`   📚 API: http://localhost:${PORT}/api`);
  console.log(`   🏥 Health: http://localhost:${PORT}/api/health`);
  console.log('═══════════════════════════════════════════');
});

module.exports = app;
