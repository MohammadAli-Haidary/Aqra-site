/**
 * MongoDB Connection
 * اتصال به MongoDB
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/egra_bookstore');
    
    console.log('═══════════════════════════════════════════');
    console.log('   ✅ MongoDB متصل شد');
    console.log(`   📦 Database: ${conn.connection.name}`);
    console.log(`   🌐 Host: ${conn.connection.host}`);
    console.log('═══════════════════════════════════════════');
  } catch (error) {
    console.error('❌ خطا در اتصال به MongoDB:', error.message);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ اتصال MongoDB قطع شد');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ خطای MongoDB:', err);
});

module.exports = connectDB;
