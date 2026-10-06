import React, { useState, useEffect } from 'react';
import api from '../../services/api';

interface SettingsTabProps {
  showNotification: (type: string, message: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ showNotification }) => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await api.getSettings();
      setSettings(res.data || {});
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در دریافت تنظیمات');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.updateSettings(settings);
      showNotification('success', 'تنظیمات با موفقیت ذخیره شد');
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در ذخیره تنظیمات');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: any) => {
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-spinner fa-spin text-4xl text-teal-600"></i>
        <p className="mt-4 text-gray-500">در حال بارگذاری تنظیمات...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* تنظیمات عمومی */}
      <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
        <h3 className="text-lg font-bold text-teal-800 mb-4">
          <i className="fas fa-cog ml-2"></i> تنظیمات عمومی
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نام سایت</label>
            <input 
              type="text" 
              value={settings.site_name || ''} 
              onChange={(e) => handleChange('site_name', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آیکون لوگو</label>
            <input 
              type="text" 
              value={settings.site_logo || ''} 
              onChange={(e) => handleChange('site_logo', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
              placeholder="fas fa-book-quran"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات سایت</label>
            <input 
              type="text" 
              value={settings.site_description || ''} 
              onChange={(e) => handleChange('site_description', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
        </div>
      </div>

      {/* اطلاعات تماس */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-blue-800 mb-4">
          <i className="fas fa-address-card ml-2"></i> اطلاعات تماس
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">آدرس</label>
            <input 
              type="text" 
              value={settings.address || ''} 
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">شماره تلفن</label>
            <input 
              type="text" 
              value={settings.phone || ''} 
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ایمیل</label>
            <input 
              type="email" 
              value={settings.email || ''} 
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ساعات کاری</label>
            <input 
              type="text" 
              value={settings.working_hours || ''} 
              onChange={(e) => handleChange('working_hours', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
        </div>
      </div>

      {/* شبکه‌های اجتماعی */}
      <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
        <h3 className="text-lg font-bold text-purple-800 mb-4">
          <i className="fas fa-share-alt ml-2"></i> شبکه‌های اجتماعی
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <i className="fab fa-instagram text-pink-600 ml-1"></i> اینستاگرام
            </label>
            <input 
              type="url" 
              value={settings.social_instagram || ''} 
              onChange={(e) => handleChange('social_instagram', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
              placeholder="https://instagram.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <i className="fab fa-telegram text-blue-500 ml-1"></i> تلگرام
            </label>
            <input 
              type="url" 
              value={settings.social_telegram || ''} 
              onChange={(e) => handleChange('social_telegram', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
              placeholder="https://t.me/..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <i className="fab fa-whatsapp text-green-500 ml-1"></i> واتساپ
            </label>
            <input 
              type="text" 
              value={settings.social_whatsapp || ''} 
              onChange={(e) => handleChange('social_whatsapp', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
              placeholder="شماره واتساپ"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <i className="fab fa-facebook text-blue-700 ml-1"></i> فیسبوک
            </label>
            <input 
              type="url" 
              value={settings.social_facebook || ''} 
              onChange={(e) => handleChange('social_facebook', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
              placeholder="https://facebook.com/..."
            />
          </div>
        </div>
      </div>

      {/* متن‌های سایت */}
      <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
        <h3 className="text-lg font-bold text-amber-800 mb-4">
          <i className="fas fa-edit ml-2"></i> متن‌های سایت
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان اصلی (Hero)</label>
            <input 
              type="text" 
              value={settings.hero_title || ''} 
              onChange={(e) => handleChange('hero_title', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">زیرعنوان اصلی</label>
            <input 
              type="text" 
              value={settings.hero_subtitle || ''} 
              onChange={(e) => handleChange('hero_subtitle', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">متن درباره ما</label>
            <textarea 
              value={settings.about_text || ''} 
              onChange={(e) => handleChange('about_text', e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none resize-none" 
            />
          </div>
        </div>
      </div>

      {/* آمار */}
      <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
        <h3 className="text-lg font-bold text-emerald-800 mb-4">
          <i className="fas fa-chart-bar ml-2"></i> آمار سایت
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تعداد کتاب</label>
            <input 
              type="number" 
              value={settings.total_books || 0} 
              onChange={(e) => handleChange('total_books', Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">مشتریان راضی</label>
            <input 
              type="number" 
              value={settings.total_customers || 0} 
              onChange={(e) => handleChange('total_customers', Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">سال سابقه</label>
            <input 
              type="number" 
              value={settings.years_experience || 0} 
              onChange={(e) => handleChange('years_experience', Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ولایات تحت پوشش</label>
            <input 
              type="number" 
              value={settings.provinces_covered || 0} 
              onChange={(e) => handleChange('provinces_covered', Number(e.target.value))}
              className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
            />
          </div>
        </div>
      </div>

      {/* تنظیمات ارسال */}
      <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
        <h3 className="text-lg font-bold text-rose-800 mb-4">
          <i className="fas fa-truck ml-2"></i> تنظیمات ارسال
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            آستانه ارسال رایگان (افغانی)
          </label>
          <input 
            type="number" 
            value={settings.free_shipping_threshold || 0} 
            onChange={(e) => handleChange('free_shipping_threshold', Number(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" 
          />
          <p className="text-xs text-gray-500 mt-1">سفارش‌های بالای این مبلغ، ارسال رایگان دارند</p>
        </div>
      </div>

      {/* دکمه ذخیره */}
      <div className="flex justify-end">
        <button 
          type="submit" 
          disabled={saving}
          className="bg-teal-800 text-white px-8 py-3 rounded-xl hover:bg-teal-900 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <><i className="fas fa-spinner fa-spin ml-2"></i> در حال ذخیره...</>
          ) : (
            <><i className="fas fa-save ml-2"></i> ذخیره تنظیمات</>
          )}
        </button>
      </div>
    </form>
  );
};

export default SettingsTab;
