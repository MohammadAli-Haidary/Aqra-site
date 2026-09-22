import React from 'react';

const stats = [
  { number: '۱۰,۰۰۰+', label: 'عنوان کتاب' },
  { number: '۵۰,۰۰۰+', label: 'مشتری راضی' },
  { number: '۱۵+', label: 'سال تجربه' },
  { number: '۳۱', label: 'استان تحت پوشش' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Right Side - Content */}
          <div>
            <h2 className="section-title">درباره کتاب‌فروشی اقرأ</h2>
            <p className="text-gray-600 mt-8 text-lg leading-relaxed">
              کتاب‌فروشی اقرأ با بیش از ۱۵ سال سابقه درخشان در صنعت نشر و کتاب، 
              یکی از معتبرترین فروشگاه‌های کتاب در ایران است. ما با هدف ترویج فرهنگ 
              کتابخوانی و دسترسی آسان همه علاقه‌مندان به کتاب‌های باکیفیت، فعالیت خود را آغاز کردیم.
            </p>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              مجموعه ما شامل بیش از ۱۰,۰۰۰ عنوان کتاب در دسته‌بندی‌های مختلف از جمله 
              ادبیات داستانی، شعر، روانشناسی، تاریخ، علوم و بسیاری دیگر است. 
              ما افتخار می‌کنیم که بهترین کتاب‌ها را با مناسب‌ترین قیمت به دست شما می‌رسانیم.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-amber-50 rounded-xl px-5 py-3">
                <i className="fas fa-check-circle text-amber-600 text-xl"></i>
                <span className="text-gray-700 font-medium">کتاب‌های اصل و معتبر</span>
              </div>
              <div className="flex items-center gap-3 bg-emerald-50 rounded-xl px-5 py-3">
                <i className="fas fa-check-circle text-emerald-600 text-xl"></i>
                <span className="text-gray-700 font-medium">قیمت مناسب</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-5 py-3">
                <i className="fas fa-check-circle text-blue-600 text-xl"></i>
                <span className="text-gray-700 font-medium">ارسال سریع</span>
              </div>
            </div>
          </div>

          {/* Left Side - Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-amber-100 to-amber-50 rounded-3xl p-10 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200/50 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-amber-200/50 rounded-full translate-x-1/2 translate-y-1/2"></div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <h3 className="text-3xl font-black text-amber-600 mb-2">{stat.number}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Book icons decoration */}
              <div className="mt-8 flex justify-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">📖</span>
                </div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">🎓</span>
                </div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-2xl">✍️</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
