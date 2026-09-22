import React from 'react';
import { useData } from '../store/DataContext';

const colorMap = [
  'from-rose-400 to-rose-600',
  'from-purple-400 to-purple-600',
  'from-blue-400 to-blue-600',
  'from-teal-400 to-teal-600',
  'from-emerald-400 to-emerald-600',
  'from-amber-400 to-amber-600',
  'from-indigo-400 to-indigo-600',
  'from-pink-400 to-pink-600',
  'from-cyan-400 to-cyan-600',
  'from-orange-400 to-orange-600',
  'from-lime-400 to-lime-600',
  'from-fuchsia-400 to-fuchsia-600',
];

const bgMap = [
  'bg-rose-50', 'bg-purple-50', 'bg-blue-50', 'bg-teal-50',
  'bg-emerald-50', 'bg-amber-50', 'bg-indigo-50', 'bg-pink-50',
  'bg-cyan-50', 'bg-orange-50', 'bg-lime-50', 'bg-fuchsia-50',
];

const Categories: React.FC = () => {
  const { data } = useData();

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">دسته‌بندی محصولات</h2>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            کتاب مورد علاقه خود را در دسته‌بندی‌های متنوع ما پیدا کنید
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.categories.map((category, index) => (
            <div
              key={category.id}
              className={`${bgMap[index % bgMap.length]} rounded-2xl p-6 text-center card-hover cursor-pointer group border border-gray-100`}
            >
              <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${colorMap[index % colorMap.length]} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <i className={`${category.icon} text-white text-2xl`}></i>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} عنوان کتاب</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
