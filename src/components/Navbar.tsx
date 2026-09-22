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
    <header className="fixed top-0 right-0 left-0 z-50">
      {/* Top Announcement Bar */}
      <div className="bg-teal-900 text-white text-center py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <span>
            <i className="fas fa-truck ml-1"></i>
            ارسال رایگان بالای ۲,۰۰۰ افغانی
          </span>
          <span className="hidden sm:inline">|</span>
          <span>
            <i className="fas fa-phone ml-1"></i>
            ۰۷۰ ۱۲۳ ۴۵۶۷
          </span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden md:inline">
            <i className="fas fa-map-marker-alt ml-1"></i>
            کابل، دارالامان
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-lg'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-700 to-teal-900 rounded-xl flex items-center justify-center shadow-lg">
                <i className="fas fa-book-quran text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  کتاب‌فروشی اقرأ
                </h1>
                <p className="text-xs text-teal-700 font-medium">
                  کابل، افغانستان
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-medium text-gray-700 transition-colors duration-300 hover:text-teal-800 relative after:content-[''] after:absolute after:bottom-[-4px] after:right-0 after:w-0 after:h-0.5 after:bg-teal-800 after:transition-all hover:after:w-full"
                >
                  {link.name}
                </a>
              ))}
              <a href="#books" className="btn-primary text-sm py-2.5 px-5">
                <i className="fas fa-shopping-cart ml-2"></i>
                سبد خرید
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i
                className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl text-gray-800`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl border-t">
            <div className="px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-700 font-medium hover:text-teal-800 hover:bg-teal-50 transition-colors py-3 px-4 rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#books" className="btn-primary text-center block text-sm py-3 px-5 mt-4">
                <i className="fas fa-shopping-cart ml-2"></i>
                سبد خرید
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
