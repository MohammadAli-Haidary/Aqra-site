import React, { useState } from 'react';

const galleryItems = [
  { id: 1, emoji: '📚', title: 'قفسه ادبیات', category: 'فروشگاه' },
  { id: 2, emoji: '📖', title: 'بخش کودکان', category: 'فروشگاه' },
  { id: 3, emoji: '🏛️', title: 'نمای بیرونی', category: 'فروشگاه' },
  { id: 4, emoji: '📕', title: 'کتاب‌های کلاسیک', category: 'کتاب' },
  { id: 5, emoji: '🎨', title: 'کتاب‌های هنری', category: 'کتاب' },
  { id: 6, emoji: '📝', title: 'لوازم تحریر', category: 'محصولات' },
  { id: 7, emoji: '☕', title: 'کافه کتاب', category: 'فضا' },
  { id: 8, emoji: '🎭', title: 'رویداد فرهنگی', category: 'رویداد' },
  { id: 9, emoji: '📗', title: 'کتاب‌های جدید', category: 'کتاب' },
];

const galleryColors = [
  'from-amber-100 to-amber-200',
  'from-rose-100 to-rose-200',
  'from-blue-100 to-blue-200',
  'from-emerald-100 to-emerald-200',
  'from-purple-100 to-purple-200',
  'from-indigo-100 to-indigo-200',
  'from-teal-100 to-teal-200',
  'from-pink-100 to-pink-200',
  'from-orange-100 to-orange-200',
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const categories = ['همه', 'فروشگاه', 'کتاب', 'محصولات', 'فضا', 'رویداد'];

  const filteredItems = selectedCategory === 'همه' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title mx-auto">گالری تصاویر</h2>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            نگاهی به فضای کتاب‌فروشی و مجموعه کتاب‌های ما بیندازید
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative rounded-2xl overflow-hidden h-64 bg-gradient-to-br ${galleryColors[index % galleryColors.length]} group cursor-pointer card-hover`}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl group-hover:scale-125 transition-transform duration-500">
                  {item.emoji}
                </span>
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.category}</p>
                </div>
              </div>

              {/* Zoom Icon */}
              <div className="absolute top-4 left-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fas fa-search-plus text-amber-600"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
