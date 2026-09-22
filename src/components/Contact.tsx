import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد! به زودی با شما تماس خواهیم گرفت.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: 'fas fa-location-dot', title: 'آدرس', detail: 'کابل، سرک اصلی دارالامان، نمره ۴۵', color: 'from-rose-500 to-rose-600' },
    { icon: 'fas fa-phone', title: 'شماره تماس', detail: '+۹۳ ۷۰ ۱۲۳ ۴۵۶۷', color: 'from-emerald-500 to-emerald-600' },
    { icon: 'fas fa-envelope', title: 'ایمیل', detail: 'info@egra-book.af', color: 'from-blue-500 to-blue-600' },
    { icon: 'fas fa-clock', title: 'ساعات کاری', detail: 'شنبه تا پنجشنبه: ۸ صبح تا ۸ شب', color: 'from-teal-500 to-teal-600' },
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">ارتباط با ما</h2>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            سوالی دارید؟ ما آماده پاسخگویی هستیم
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              <i className="fas fa-paper-plane text-teal-700 ml-3"></i> ارسال پیام
            </h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">نام</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="نام خود را وارد کنید" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">شماره تلفن</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="۰۷۰ ۱۲۳ ۴۵۶۷" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all" placeholder="example@email.com" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">موضوع</label>
                <select value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all" required>
                  <option value="">انتخاب کنید...</option>
                  <option value="order">پیگیری سفارش</option>
                  <option value="question">سوال درباره کتاب</option>
                  <option value="complaint">شکایت</option>
                  <option value="suggestion">پیشنهاد</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">پیام شما</label>
                <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-600 focus:ring-2 focus:ring-teal-200 outline-none transition-all resize-none" placeholder="پیام خود را بنویسید..." required></textarea>
              </div>
              <button type="submit" className="btn-primary w-full text-center">
                <i className="fas fa-paper-plane ml-2"></i> ارسال پیام
              </button>
            </form>
          </div>
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-center gap-5 bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <i className={`${info.icon} text-white text-xl`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 mb-1">{info.title}</h4>
                  <p className="text-gray-600">{info.detail}</p>
                </div>
              </div>
            ))}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-2xl p-8">
              <h4 className="font-bold text-gray-800 mb-4 text-lg">ما را در شبکه‌های اجتماعی دنبال کنید</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"><i className="fab fa-instagram text-pink-600 text-xl"></i></a>
                <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"><i className="fab fa-telegram text-blue-500 text-xl"></i></a>
                <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"><i className="fab fa-whatsapp text-green-500 text-xl"></i></a>
                <a href="#" className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300"><i className="fab fa-facebook text-blue-700 text-xl"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
