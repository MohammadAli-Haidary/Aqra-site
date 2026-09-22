import React from 'react';

const stats = [
  { number: '۱۰,۰۰۰+', label: 'عنوان کتاب' },
  { number: '۵۰,۰۰۰+', label: 'مشتری راضی' },
  { number: '۱۵+', label: 'سال سابقه' },
  { number: '۳۴', label: 'ولایت تحت پوشش' },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="section-title">درباره کتاب‌فروشی اقرأ</h2>
            <p className="text-gray-600 mt-8 text-lg leading-relaxed">
              کتاب‌فروشی اقرأ با بیش از ۱۵ سال سابقه درخشان در عرصه نشر و کتاب، 
              یکی از معتبرترین و بزرگترین کتاب‌فروشی‌ها در شهر کابل، افغانستان است. 
              ما از سال ۱۳۸۸ با هدف ترویج فرهنگ کتاب‌خوانی و فراهم‌سازی دسترسی آسان 
              هموطنان عزیز به کتاب‌های باکیفیت، فعالیت خود را آغاز کردیم.
            </p>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              مجموعه ما شامل بیش از ۱۰,۰۰۰ عنوان کتاب در دسته‌بندی‌های مختلف از جمله 
              ادبیات داستانی، شعر و ادبیات، روانشناسی، تاریخ، علوم دینی، کتاب‌های درسی 
              و بسیاری دیگر است. ما با افتخار بهترین کتاب‌های فارسی، دری، پشتو، عربی 
              و انگلیسی را با مناسب‌ترین قیمت‌ها به دست شما عزیزان می‌رسانیم.
            </p>
            <p className="text-gray-600 mt-4 text-lg leading-relaxed">
              کتاب‌فروشی اقرأ در طول ۱۵ سال فعالیت خود، توانسته اعتماد هزاران خواننده، 
              محصل، استاد پوهنتون و علاقه‌مند به علم و دانش را در سراسر افغانستان جلب نماید.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-teal-50 rounded-xl px-5 py-3">
                <i className="fas fa-check-circle text-teal-700 text-xl"></i>
                <span className="text-gray-700 font-medium">کتاب‌های اصل و معتبر</span>
              </div>
              <div className="flex items-center gap-3 bg-teal-50 rounded-xl px-5 py-3">
                <i className="fas fa-check-circle text-teal-700 text-xl"></i>
                <span className="text-gray-700 font-medium">قیمت مناسب</span>
              </div>
              <div className="flex items-center gap-3 bg-teal-50 rounded-xl px-5 py-3">
                <i className="fas fa-check-circle text-teal-700 text-xl"></i>
                <span className="text-gray-700 font-medium">ارسال به سراسر افغانستان</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100/50 rounded-3xl p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-teal-200/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-200/30 rounded-full translate-x-1/2 translate-y-1/2"></div>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-3xl font-black text-teal-800 mb-2">{stat.number}</h3>
                    <p className="text-gray-600 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md"><span className="text-2xl">📚</span></div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md"><span className="text-2xl">📖</span></div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md"><span className="text-2xl">🎓</span></div>
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-md"><span className="text-2xl">✍️</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
