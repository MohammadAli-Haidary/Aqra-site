import React, { useState } from 'react';

const books = [
  {
    id: 1,
    title: 'بوف کور',
    author: 'صادق هدایت',
    price: '۸۵,۰۰۰',
    oldPrice: '۱۲۰,۰۰۰',
    rating: 4.8,
    badge: 'پرفروش',
    category: 'ادبیات داستانی',
    cover: '📕',
    isNew: false,
  },
  {
    id: 2,
    title: 'کلیدر',
    author: 'محمود دولت‌آبادی',
    price: '۲۵۰,۰۰۰',
    oldPrice: '۳۵۰,۰۰۰',
    rating: 4.9,
    badge: 'پرفروش',
    category: 'ادبیات داستانی',
    cover: '📗',
    isNew: false,
  },
  {
    id: 3,
    title: 'شازده احتجاب',
    author: 'هوشنگ گلشیری',
    price: '۶۵,۰۰۰',
    oldPrice: '۹۰,۰۰۰',
    rating: 4.5,
    badge: 'جدید',
    category: 'ادبیات داستانی',
    cover: '📘',
    isNew: true,
  },
  {
    id: 4,
    title: 'دیوان حافظ',
    author: 'حافظ شیرازی',
    price: '۱۵۰,۰۰۰',
    oldPrice: '۲۰۰,۰۰۰',
    rating: 5.0,
    badge: 'پرفروش',
    category: 'شعر و ادبیات',
    cover: '📙',
    isNew: false,
  },
  {
    id: 5,
    title: 'مثنوی معنوی',
    author: 'مولانا جلال‌الدین',
    price: '۱۸۰,۰۰۰',
    oldPrice: '۲۵۰,۰۰۰',
    rating: 4.9,
    badge: 'پرفروش',
    category: 'شعر و ادبیات',
    cover: '📕',
    isNew: false,
  },
  {
    id: 6,
    title: 'قدرت عادت',
    author: 'چارلز داهیگ',
    price: '۹۵,۰۰۰',
    oldPrice: '۱۳۰,۰۰۰',
    rating: 4.6,
    badge: 'جدید',
    category: 'روانشناسی',
    cover: '📗',
    isNew: true,
  },
  {
    id: 7,
    title: 'هنر شفاف اندیشیدن',
    author: 'رولف دوبلی',
    price: '۷۵,۰۰۰',
    oldPrice: '۱۱۰,۰۰۰',
    rating: 4.7,
    badge: 'جدید',
    category: 'روانشناسی',
    cover: '📘',
    isNew: true,
  },
  {
    id: 8,
    title: 'تاریخ ایران',
    author: 'عباس اقبال',
    price: '۲۲۰,۰۰۰',
    oldPrice: '۳۰۰,۰۰۰',
    rating: 4.4,
    badge: 'پرفروش',
    category: 'تاریخ',
    cover: '📙',
    isNew: false,
  },
];

const Books: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bestseller' | 'new'>('bestseller');

  const filteredBooks = activeTab === 'bestseller' 
    ? books.filter(b => !b.isNew) 
    : books.filter(b => b.isNew);

  return (
    <section id="books" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">مجموعه کتاب‌ها</h2>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            بهترین و جدیدترین کتاب‌ها را با قیمت مناسب تهیه کنید
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-xl p-2 shadow-md inline-flex gap-2">
            <button
              onClick={() => setActiveTab('bestseller')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'bestseller'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-amber-600'
              }`}
            >
              <i className="fas fa-fire ml-2"></i>
              پرفروش‌ترین‌ها
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'new'
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-amber-600'
              }`}
            >
              <i className="fas fa-sparkles ml-2"></i>
              جدیدترین‌ها
            </button>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl overflow-hidden card-hover border border-gray-100 group"
            >
              {/* Book Cover */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                <span className="text-8xl group-hover:scale-110 transition-transform duration-500">
                  {book.cover}
                </span>
                {/* Badge */}
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white ${
                    book.badge === 'پرفروش'
                      ? 'bg-gradient-to-r from-rose-500 to-rose-600'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                  }`}
                >
                  {book.badge}
                </span>
                {/* Quick Actions */}
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="flex-1 bg-amber-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors">
                    <i className="fas fa-cart-plus ml-1"></i>
                    افزودن
                  </button>
                  <button className="bg-white text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors shadow-md">
                    <i className="fas fa-heart"></i>
                  </button>
                </div>
              </div>

              {/* Book Info */}
              <div className="p-5">
                <p className="text-xs text-amber-600 font-medium mb-2">{book.category}</p>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{book.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{book.author}</p>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star text-sm ${
                        i < Math.floor(book.rating) ? 'text-amber-400' : 'text-gray-200'
                      }`}
                    ></i>
                  ))}
                  <span className="text-xs text-gray-500 mr-2">({book.rating})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-amber-600">{book.price}</span>
                    <span className="text-xs text-gray-500 mr-1">تومان</span>
                  </div>
                  <span className="text-sm text-gray-400 line-through">{book.oldPrice}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="#" className="btn-secondary inline-block">
            مشاهده همه کتاب‌ها
            <i className="fas fa-arrow-left mr-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Books;
