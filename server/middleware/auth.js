/**
 * Authentication Middleware
 */

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
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
    res.status(401).json({
      status: 'error',
      message: 'توکن نامعتبر یا منقضی شده است'
    });
  }
};

module.exports = authMiddleware;
