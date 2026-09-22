import React from 'react';

const features = [
  { icon: 'fas fa-truck-fast', title: 'ارسال سریع', description: 'ارسال به سراسر افغانستان در کمترین زمان ممکن', color: 'from-blue-500 to-blue-600' },
  { icon: 'fas fa-shield-halved', title: 'ضمانت اصالت', description: 'تمامی کتاب‌ها اصل و با مجوز رسمی نشر هستند', color: 'from-emerald-500 to-emerald-600' },
  { icon: 'fas fa-percent', title: 'تخفیف‌های ویژه', description: 'تخفیف‌های هفتگی و فصلی برای مشتریان ویژه', color: 'from-teal-500 to-teal-600' },
  { icon: 'fas fa-headset', title: 'پشتیبانی ۲۴/۷', description: 'تیم پشتیبانی ما همیشه آماده پاسخگویی شما عزیزان است', color: 'from-purple-500 to-purple-600' },
  { icon: 'fas fa-rotate-left', title: 'پس‌دادن آسان', description: 'امکان پس‌دادن کتاب تا ۷ روز بدون هیچ شرطی', color: 'from-rose-500 to-rose-600' },
  { icon: 'fas fa-money-bill-wave', title: 'پرداخت آسان', description: 'پرداخت نقدی در محل و آنلاین با تمام بانک‌های افغانستان', color: 'from-indigo-500 to-indigo-600' },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">چرا کتاب‌فروشی اقرأ؟</h2>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            ما با ارائه بهترین خدمات، تجربه‌ای لذت‌بخش از خرید کتاب را برای شما فراهم می‌کنیم
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 card-hover border border-gray-100 group">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${feature.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
