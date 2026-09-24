/**
 * Site Setting Model
 * مدل تنظیمات سایت
 */

const mongoose = require('mongoose');

const siteSettingSchema = new mongoose.Schema({
  setting_key: {
    type: String,
    required: [true, 'کلید تنظیم الزامی است'],
    unique: true,
    trim: true
  },
  setting_value: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

siteSettingSchema.index({ setting_key: 1 });

module.exports = mongoose.model('SiteSetting', siteSettingSchema);
