import React, { useState } from 'react';
import { useData } from '../store/DataContext';

const galleryColors = [
  'from-teal-100 to-teal-200',
  'from-rose-100 to-rose-200',
  'from-blue-100 to-blue-200',
  'from-emerald-100 to-emerald-200',
  'from-purple-100 to-purple-200',
  'from-indigo-100 to-indigo-200',
  'from-cyan-100 to-cyan-200',
  'from-pink-100 to-pink-200',
  'from-orange-100 to-orange-200',
];

const defaultEmojis = ['📚', '📖', '🏛️', '📕', '🎨', '📝', '☕', '🎭', '📗', '📙', '📓', '📔'];

const Gallery: React.FC = () => {
  const { data } = useData();
  const [selectedCategory, setSelectedCategory] = useState('همه');
  const categories = ['همه', ...new Set(data.gallery.map(item => item.category))];

  const filteredItems = selectedCategory === 'همه' 
    ? data.gallery 
    : data.gallery.filter(item => item.category === selectedCategory);

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
                  ? 'bg-teal-800 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-teal-50 hover:text-teal-800 border border-gray-200'
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
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl group-hover:scale-125 transition-transform duration-500">
                    {defaultEmojis[index % defaultEmojis.length]}
                  </span>
                </div>
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
