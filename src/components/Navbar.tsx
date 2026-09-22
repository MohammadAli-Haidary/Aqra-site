import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'صفحه اصلی', href: '#home' },
    { name: 'درباره ما', href: '#about' },
    { name: 'کتاب‌ها', href: '#books' },
    { name: 'دسته‌بندی', href: '#categories' },
    { name: 'گالری', href: '#gallery' },
    { name: 'ارتباط با ما', href: '#contact' },
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-amber-700 text-white text-center py-2 text-sm relative z-50">
        <p>
          <i className="fas fa-truck ml-2"></i>
          ارسال رایگان برای سفارش‌های بالای ۲,۰۰۰ افغانی در سراسر افغانستان
          <i className="fas fa-star mx-3 text-amber-300"></i>
          <i className="fas fa-phone ml-2"></i>
          سفارش تلفنی: ۰۷۰ ۱۲۳ ۴۵۶۷
        </p>
      </div>

      <nav
        className={`fixed top-8 right-0 left-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg top-0'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-book-quran text-white text-xl"></i>
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                  کتاب‌فروشی اقرأ
                </h1>
                <p className={`text-xs ${isScrolled ? 'text-gray-500' : 'text-white/70'}`}>
                  کابل، افغانستان
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors duration-300 hover:text-amber-600 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <a href="#books" className="btn-primary text-sm py-2 px-5">
                <i className="fas fa-shopping-cart ml-2"></i>
                سبد خرید
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i
                className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-xl border-t">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-700 font-medium hover:text-amber-600 transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#books" className="btn-primary text-center block text-sm py-2 px-5">
                <i className="fas fa-shopping-cart ml-2"></i>
                سبد خرید
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
