/**
 * File Upload Middleware
 */

const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = (folder) => multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', folder));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('فقط فایل‌های تصویری (JPG, PNG, GIF, WebP) مجاز هستند'));
  }
};

// Upload middleware for gallery
const uploadGallery = multer({
  storage: storage('gallery'),
  fileFilter,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 } // 5MB
});

// Upload middleware for books
const uploadBook = multer({
  storage: storage('books'),
  fileFilter,
  limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5242880 } // 5MB
});

module.exports = { uploadGallery, uploadBook };
