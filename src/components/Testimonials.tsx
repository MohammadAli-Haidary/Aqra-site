import React from 'react';
import { useData } from '../store/DataContext';

const Testimonials: React.FC = () => {
  const { data } = useData();

  return (
    <section className="py-20 bg-gradient-to-br from-teal-800 via-teal-900 to-teal-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">نظرات مشتریان ما</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            ببینید مشتریان عزیز ما درباره تجربه خریدشان چه می‌گویند
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className={`fas fa-star ${i < testimonial.rating ? 'text-amber-400' : 'text-white/30'}`}></i>
                ))}
              </div>
              <p className="text-white/90 text-lg leading-relaxed mb-6">"{testimonial.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">{testimonial.avatar}</div>
                <div>
                  <h4 className="text-white font-bold">{testimonial.name}</h4>
                  <p className="text-white/60 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Newsletter */}
        <div className="mt-20 bg-white/10 backdrop-blur-sm rounded-3xl p-10 border border-white/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">عضویت در خبرنامه</h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            برای اطلاع از جدیدترین کتاب‌ها و تخفیف‌های ویژه، ایمیل خود را وارد کنید
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="ایمیل خود را وارد کنید..." className="flex-1 px-6 py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/50 outline-none focus:border-teal-300 transition-colors" />
            <button className="bg-white text-teal-800 font-bold px-8 py-4 rounded-xl hover:bg-teal-50 transition-colors shadow-lg">
              <i className="fas fa-bell ml-2"></i> عضویت
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
