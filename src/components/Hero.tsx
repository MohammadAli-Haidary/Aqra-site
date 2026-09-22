import React, { useState, useEffect } from 'react';

const slides = [
  {
    title: 'دنیای بی‌پایان کتاب',
    subtitle: 'بهترین کتاب‌ها با بهترین قیمت',
    description: 'بیش از ۱۰,۰۰۰ عنوان کتاب در دسته‌بندی‌های مختلف',
    bg: 'from-amber-900 via-amber-800 to-yellow-900',
  },
  {
    title: 'تخفیف‌های ویژه',
    subtitle: 'تا ۵۰٪ تخفیف روی کتاب‌های پرفروش',
    description: 'فرصت را از دست ندهید، خرید آنلاین با ارسال رایگان',
    bg: 'from-emerald-900 via-emerald-800 to-teal-900',
  },
  {
    title: 'کتاب‌های جدید',
    subtitle: 'جدیدترین آثار نویسندگان برتر',
    description: 'هر هفته کتاب‌های جدید به مجموعه ما اضافه می‌شود',
    bg: 'from-purple-900 via-purple-800 to-indigo-900',
  },
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-gradient-to-br ${slide.bg} transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          
          {/* Book decorative icons */}
          <div className="absolute inset-0 opacity-5">
            <i className="fas fa-book absolute top-[15%] right-[10%] text-[120px] text-white rotate-12"></i>
            <i className="fas fa-book-open absolute bottom-[20%] left-[15%] text-[100px] text-white -rotate-12"></i>
            <i className="fas fa-feather-pointed absolute top-[40%] left-[60%] text-[80px] text-white rotate-45"></i>
            <i className="fas fa-bookmark absolute top-[60%] right-[70%] text-[60px] text-white"></i>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10 absolute'
                }`}
              >
                {index === currentSlide && (
                  <>
                    <p className="text-amber-300 text-lg mb-4 font-medium animate-slide-in">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight animate-slide-in" style={{ animationDelay: '0.2s' }}>
                      {slide.title}
                    </h1>
                    <p className="text-white/80 text-xl mb-10 animate-slide-in" style={{ animationDelay: '0.4s' }}>
                      {slide.description}
                    </p>
                    <div className="flex flex-wrap gap-4 animate-slide-in" style={{ animationDelay: '0.6s' }}>
                      <a href="#books" className="btn-primary text-lg py-4 px-10">
                        <i className="fas fa-book ml-2"></i>
                        مشاهده کتاب‌ها
                      </a>
                      <a href="#about" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold py-4 px-10 rounded-lg hover:bg-white/20 transition-all duration-300">
                        <i className="fas fa-info-circle ml-2"></i>
                        درباره ما
                      </a>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? 'w-10 h-3 bg-amber-400'
                    : 'w-3 h-3 bg-white/50 hover:bg-white/80'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 right-10 z-10 animate-bounce">
        <a href="#features" className="text-white/70 hover:text-white transition-colors">
          <i className="fas fa-chevron-down text-2xl"></i>
        </a>
      </div>
    </section>
  );
};

export default Hero;
