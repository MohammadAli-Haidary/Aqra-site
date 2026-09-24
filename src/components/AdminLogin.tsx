import React, { useState } from 'react';
import api from '../services/api';

interface AdminLoginProps {
  onLogin: () => void;
  onSwitchToRegister?: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.login(username, password);
      onLogin();
    } catch (err: any) {
      setError(err.message || 'نام کاربری یا رمز عبور اشتباه است');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-700 to-teal-900 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-lock text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">ورود به پنل مدیریت</h2>
          <p className="text-gray-500 mt-2">کتاب‌فروشی اقرأ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              <i className="fas fa-exclamation-circle ml-2"></i>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">نام کاربری</label>
            <div className="relative">
              <i className="fas fa-user absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">رمز عبور</label>
            <div className="relative">
              <i className="fas fa-key absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-12 pl-4 py-3 border border-gray-200 rounded-xl focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-800 text-white font-bold py-3 rounded-xl hover:bg-teal-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <><i className="fas fa-spinner fa-spin ml-2"></i> در حال ورود...</>
            ) : (
              <><i className="fas fa-sign-in-alt ml-2"></i> ورود</>
            )}
          </button>
        </form>

        {onSwitchToRegister && (
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              ادمین جدید هستید؟{' '}
              <button
                onClick={onSwitchToRegister}
                className="text-teal-700 font-medium hover:text-teal-900 transition-colors"
              >
                ثبت‌نام کنید
              </button>
            </p>
          </div>
        )}

        <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-200">
          <p className="text-amber-800 text-sm">
            <i className="fas fa-info-circle ml-2"></i>
            <strong>راهنما:</strong> ابتدا سرور Backend را اجرا کنید:
          </p>
          <code className="block mt-2 text-xs bg-amber-100 p-2 rounded text-amber-900 font-mono" dir="ltr">
            cd server && npm run dev
          </code>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
