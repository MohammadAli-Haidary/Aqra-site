import React from 'react';

const categories = [
  {
    name: 'ادبیات داستانی',
    icon: 'fas fa-book',
    count: 1250,
    color: 'from-rose-400 to-rose-600',
    bg: 'bg-rose-50',
  },
  {
    name: 'شعر و ادبیات',
    icon: 'fas fa-feather-pointed',
    count: 890,
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-50',
  },
  {
    name: 'روانشناسی',
    icon: 'fas fa-brain',
    count: 650,
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    name: 'تاریخ افغانستان',
    icon: 'fas fa-landmark',
    count: 780,
    color: 'from-amber-400 to-amber-600',
    bg: 'bg-amber-50',
  },
  {
    name: 'کودک و نوجوان',
    icon: 'fas fa-child',
    count: 1100,
    color: 'from-emerald-400 to-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    name: 'علوم دینی',
    icon: 'fas fa-mosque',
    count: 920,
    color: 'from-teal-400 to-teal-600',
    bg: 'bg-teal-50',
  },
  {
    name: 'کتاب‌های درسی',
    icon: 'fas fa-graduation-cap',
    count: 1450,
    color: 'from-indigo-400 to-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    name: 'زبان انگلیسی',
    icon: 'fas fa-language',
    count: 560,
    color: 'from-pink-400 to-pink-600',
    bg: 'bg-pink-50',
  },
];

const Categories: React.FC = () => {
  return (
    <section id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">دسته‌بندی کتاب‌ها</h2>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            کتاب مورد علاقه خود را در دسته‌بندی‌های متنوع ما پیدا کنید
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`${category.bg} rounded-2xl p-6 text-center card-hover cursor-pointer group border border-gray-100`}
            >
              <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
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
