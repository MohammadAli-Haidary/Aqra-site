/**
 * Authentication Middleware
 * Middleware احراز هویت
 */

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'دسترسی غیرمجاز - لطفاً وارد شوید'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default-secret');
    req.admin = decoded;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'توکن نامعتبر است'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'توکن منقضی شده است'
      });
    }
    res.status(401).json({
      status: 'error',
      message: 'خطا در احراز هویت'
    });
  }
};

module.exports = authMiddleware;
