/**
 * Authentication Routes
 */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDatabase } = require('../database');
const authMiddleware = require('../middleware/auth');

// Login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'نام کاربری و رمز عبور الزامی است'
      });
    }

    const db = getDatabase();
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);

    if (!admin) {
      return res.status(401).json({
        status: 'error',
        message: 'نام کاربری یا رمز عبور اشتباه است'
      });
    }

    const isValidPassword = bcrypt.compareSync(password, admin.password);

    if (!isValidPassword) {
      return res.status(401).json({
        status: 'error',
        message: 'نام کاربری یا رمز عبور اشتباه است'
      });
    }

    // Update last login
    db.prepare('UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(admin.id);

    // Generate token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET || 'default-secret',
      { expiresIn: '7d' }
    );

    res.json({
      status: 'success',
      message: 'ورود موفقیت‌آمیز',
      data: {
        token,
        admin: {
          id: admin.id,
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
router.get('/me', authMiddleware, (req, res) => {
  try {
    const db = getDatabase();
    const admin = db.prepare('SELECT id, username, email, full_name, created_at, last_login FROM admins WHERE id = ?').get(req.admin.id);

    res.json({
      status: 'success',
      data: admin
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'خطای سرور'
    });
  }
});

// Change password
router.post('/change-password', authMiddleware, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const db = getDatabase();

    const admin = db.prepare('SELECT * FROM admins WHERE id = ?').get(req.admin.id);

    if (!bcrypt.compareSync(currentPassword, admin.password)) {
      return res.status(400).json({
        status: 'error',
        message: 'رمز عبور فعلی اشتباه است'
      });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    db.prepare('UPDATE admins SET password = ? WHERE id = ?').run(hashedPassword, req.admin.id);

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
