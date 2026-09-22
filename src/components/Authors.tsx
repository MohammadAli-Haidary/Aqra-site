import React from 'react';

const authors = [
  { name: 'استاد خالد حسین', books: 5, emoji: '👨‍💼' },
  { name: 'سهراب سهرابی', books: 8, emoji: '👨‍🎓' },
  { name: 'پروین اعتصامی', books: 4, emoji: '👩‍💼' },
  { name: 'احمد شاملو', books: 15, emoji: '👨‍🏫' },
  { name: 'نادر نادرپور', books: 7, emoji: '👨‍🎓' },
  { name: 'مولانا جلال‌الدین', books: 20, emoji: '🧙‍♂️' },
];

const Authors: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title mx-auto">نویسندگان برتر</h2>
          <p className="text-gray-600 mt-6 text-lg max-w-2xl mx-auto">
            آثار نویسندگان محبوب و برجسته افغانستان و جهان
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {authors.map((author, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 text-center card-hover border border-gray-100 group cursor-pointer"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                <span className="text-4xl">{author.emoji}</span>
              </div>
              <h3 className="font-bold text-gray-800 text-sm mb-1">{author.name}</h3>
              <p className="text-xs text-gray-500">{author.books} کتاب</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Authors;
