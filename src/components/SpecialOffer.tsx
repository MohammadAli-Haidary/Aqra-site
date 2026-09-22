import React, { useState, useEffect } from 'react';

const SpecialOffer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; days--; }
        if (days < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 rounded-3xl p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div>
              <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <i className="fas fa-fire ml-2"></i> پیشنهاد ویژه
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                جشنواره فروش بهاره<br />
                <span className="text-teal-200">تا ۵۰٪ تخفیف</span>
              </h2>
              <p className="text-white/80 text-lg mb-8">
                فرصت را از دست ندهید! بهترین کتاب‌ها با تخفیف‌های باورنکردنی - ارسال به تمام ولایات
              </p>
              <div className="flex gap-4 mb-8">
                {[
                  { value: timeLeft.days, label: 'روز' },
                  { value: timeLeft.hours, label: 'ساعت' },
                  { value: timeLeft.minutes, label: 'دقیقه' },
                  { value: timeLeft.seconds, label: 'ثانیه' },
                ].map((item, index) => (
                  <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[70px]">
                    <div className="text-2xl md:text-3xl font-black text-white">{String(item.value).padStart(2, '0')}</div>
                    <div className="text-white/70 text-xs mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
              <a href="#books" className="inline-block bg-white text-teal-800 font-bold py-4 px-10 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
                <i className="fas fa-shopping-bag ml-2"></i> مشاهده تخفیف‌ها
              </a>
            </div>
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 bg-white/10 rounded-full flex items-center justify-center">
                  <div className="w-56 h-56 bg-white/10 rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-7xl">📚</span>
                      <div className="mt-4">
                        <span className="text-5xl font-black text-white">۵۰٪</span>
                        <p className="text-white/80 font-medium">تخفیف</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-5 right-5 bg-white/20 rounded-full w-12 h-12 flex items-center justify-center animate-bounce"><span className="text-xl">⭐</span></div>
                <div className="absolute bottom-10 left-0 bg-white/20 rounded-full w-10 h-10 flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}><span className="text-lg">📖</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffer;
