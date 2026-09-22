import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center">
                <i className="fas fa-book-quran text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold">کتاب‌فروشی اقرأ</h3>
                <p className="text-gray-400 text-xs">کابل، افغانستان</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              کتاب‌فروشی اقرأ با بیش از ۱۵ سال سابقه، بزرگترین و معتبرترین کتاب‌فروشی در کابل افغانستان.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors"><i className="fab fa-telegram"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors"><i className="fab fa-whatsapp"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-teal-700 transition-colors"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">دسترسی سریع</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>صفحه اصلی</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>درباره ما</a></li>
              <li><a href="#books" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>کتاب‌ها</a></li>
              <li><a href="#categories" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>دسته‌بندی</a></li>
              <li><a href="#gallery" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>گالری</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>ارتباط با ما</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">دسته‌بندی‌ها</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>ادبیات داستانی</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>شعر و ادبیات</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>روانشناسی</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>تاریخ افغانستان</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>کتاب‌های درسی</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-400 transition-colors flex items-center gap-2"><i className="fas fa-chevron-left text-xs"></i>علوم دینی</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6">معلومات تماس</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><i className="fas fa-location-dot text-teal-500 mt-1"></i><span className="text-gray-400">کابل، سرک دارالامان، نمره ۴۵</span></li>
              <li className="flex items-center gap-3"><i className="fas fa-phone text-teal-500"></i><span className="text-gray-400">+۹۳ ۷۰ ۱۲۳ ۴۵۶۷</span></li>
              <li className="flex items-center gap-3"><i className="fas fa-envelope text-teal-500"></i><span className="text-gray-400">info@egra-book.af</span></li>
              <li className="flex items-center gap-3"><i className="fas fa-clock text-teal-500"></i><span className="text-gray-400">شنبه تا پنجشنبه: ۸ تا ۲۰</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">© ۱۴۰۳ کتاب‌فروشی اقرأ - کابل، افغانستان. تمام حقوق محفوظ است.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">شرایط و ضوابط</a>
              <a href="#" className="text-gray-400 hover:text-teal-400 text-sm transition-colors">حریم خصوصی</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
