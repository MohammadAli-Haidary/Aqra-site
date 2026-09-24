/**
 * Authentication Routes
 * مسیرهای احراز هویت
 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'نام کاربری و رمز عبور الزامی است'
      });
    }

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(401).json({
        status: 'error',
        message: 'نام کاربری یا رمز عبور اشتباه است'
      });
    }

    const isValidPassword = await admin.comparePassword(password);

    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'نام کاربری یا رمز عبور اشتباه است'
      });
    }

    // Update last login
    admin.last_login = new Date();
    await admin.save();

    // Generate token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    );

    res.json({
      status: 'success',
      message: 'ورود موفقیت‌آمیز',
       {
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          full_name: admin.full_name
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      status: 'error',
      message: 'خطای سرور'
    });
  }
});

// Get current admin info
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password');

    if (!admin) {
      return res.status(404).json({
        status: 'error',
        message: 'ادمین یافت نشد'
      });
    }

    res.json({
      status: 'success',
       admin
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'خطای سرور'
    });
  }
});

// Change password
router.post('/change-password', authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin.id);

    if (!admin) {
      return res.status(404).json({
        status: 'error',
        message: 'ادمین یافت نشد'
      });
    }

    const isValidPassword = await admin.comparePassword(currentPassword);

    if (!isValidPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'رمز عبور فعلی اشتباه است'
      });
    }

    admin.password = newPassword;
    await admin.save();

    res.json({
      status: 'success',
      message: 'رمز عبور با موفقیت تغییر کرد'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'خطای سرور'
    });
  }
});

module.exports = router;
