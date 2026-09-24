import React, { useState } from 'react';
import api from '../services/api';

interface AdminRegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

const AdminRegister: React.FC<AdminRegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    full_name: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل 6 کاراکتر باشد');
      return;
    }

    setLoading(true);

    try {
      await api.register(
        formData.username,
        formData.password,
        formData.email,
        formData.full_name
      );
      onRegister();
    } catch (err: any) {
      setError(err.message || 'خطا در ثبت‌نام');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => {}}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-700 to-teal-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-user-plus text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">ثبت‌نام ادمین جدید</h2>
          <p className="text-gray-500 mt-2">کتاب‌فروشی اقرأ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              <i className="fas fa-exclamation-circle ml-2"></i>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نام کامل</label>
            <div className="relative">
              <i className="fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="نام و نام خانوادگی"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نام کاربری <span className="text-red-500">*</span></label>
            <div className="relative">
              <i className="fas fa-user-tag absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="admin"
                required
                minLength={3}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل <span className="text-red-500">*</span></label>
            <div className="relative">
              <i className="fas fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="admin@egra-book.af"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور <span className="text-red-500">*</span></label>
            <div className="relative">
              <i className="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="حداقل 6 کاراکتر"
                required
                minLength={6}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">تکرار رمز عبور <span className="text-red-500">*</span></label>
            <div className="relative">
              <i className="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="تکرار رمز عبور"
                required
                minLength={6}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-800 text-white font-bold py-3 rounded-xl hover:bg-teal-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin ml-2"></i> در حال ثبت‌نام...</>
            ) : (
              <><i className="fas fa-user-plus ml-2"></i> ثبت‌نام</>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            قبلاً ثبت‌نام کرده‌اید؟{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-teal-700 font-medium hover:text-teal-900 transition-colors"
            >
              وارد شوید
            </button>
          </p>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-blue-800 text-sm">
            <i className="fas fa-info-circle ml-2"></i>
            <strong>توجه:</strong> پس از ثبت‌نام، به صورت خودکار وارد پنل مدیریت می‌شوید.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
