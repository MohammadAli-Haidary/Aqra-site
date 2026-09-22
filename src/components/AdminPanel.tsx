import React, { useState } from 'react';
import { useData, Book, GalleryItem, Category, Testimonial } from '../store/DataContext';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { data, updateBooks, updateGallery, updateCategories, updateTestimonials, resetData } = useData();
  const [activeTab, setActiveTab] = useState<'books' | 'gallery' | 'categories' | 'testimonials'>('books');
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryItem | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  if (!isOpen) return null;

  // Book handlers
  const handleSaveBook = () => {
    if (!editingBook) return;
    if (editingBook.id === 0) {
      const newBook = { ...editingBook, id: Date.now() };
      updateBooks([...data.books, newBook]);
    } else {
      updateBooks(data.books.map(b => b.id === editingBook.id ? editingBook : b));
    }
    setEditingBook(null);
  };

  const handleDeleteBook = (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      updateBooks(data.books.filter(b => b.id !== id));
    }
  };

  // Gallery handlers
  const handleSaveGallery = () => {
    if (!editingGallery) return;
    if (editingGallery.id === 0) {
      const newItem = { ...editingGallery, id: Date.now() };
      updateGallery([...data.gallery, newItem]);
    } else {
      updateGallery(data.gallery.map(g => g.id === editingGallery.id ? editingGallery : g));
    }
    setEditingGallery(null);
  };

  const handleDeleteGallery = (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      updateGallery(data.gallery.filter(g => g.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingGallery) {
          setEditingGallery({ ...editingGallery, imageUrl: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Category handlers
  const handleSaveCategory = () => {
    if (!editingCategory) return;
    if (editingCategory.id === 0) {
      const newCat = { ...editingCategory, id: Date.now() };
      updateCategories([...data.categories, newCat]);
    } else {
      updateCategories(data.categories.map(c => c.id === editingCategory.id ? editingCategory : c));
    }
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      updateCategories(data.categories.filter(c => c.id !== id));
    }
  };

  // Testimonial handlers
  const handleSaveTestimonial = () => {
    if (!editingTestimonial) return;
    if (editingTestimonial.id === 0) {
      const newTest = { ...editingTestimonial, id: Date.now() };
      updateTestimonials([...data.testimonials, newTest]);
    } else {
      updateTestimonials(data.testimonials.map(t => t.id === editingTestimonial.id ? editingTestimonial : t));
    }
    setEditingTestimonial(null);
  };

  const handleDeleteTestimonial = (id: number) => {
    if (confirm('آیا مطمئن هستید؟')) {
      updateTestimonials(data.testimonials.filter(t => t.id !== id));
    }
  };

  const tabs = [
    { id: 'books' as const, label: 'کتاب‌ها', icon: 'fas fa-book' },
    { id: 'gallery' as const, label: 'گالری', icon: 'fas fa-images' },
    { id: 'categories' as const, label: 'دسته‌بندی', icon: 'fas fa-layer-group' },
    { id: 'testimonials' as const, label: 'نظرات', icon: 'fas fa-comments' },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            <i className="fas fa-cog text-teal-700 ml-3"></i>
            پنل مدیریت سایت
          </h2>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-teal-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-teal-50'
              }`}
            >
              <i className={`${tab.icon} ml-2`}></i> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Books Tab */}
          {activeTab === 'books' && (
            <div>
              <button onClick={() => setEditingBook({ id: 0, title: '', author: '', price: '', oldPrice: '', rating: 5, badge: 'جدید', category: '', cover: '📕', isNew: true })} className="btn-primary mb-4 text-sm py-2 px-4">
                <i className="fas fa-plus ml-2"></i> افزودن کتاب جدید
              </button>
              <div className="space-y-3">
                {data.books.map(book => (
                  <div key={book.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                    <span className="text-3xl">{book.cover}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{book.title}</h4>
                      <p className="text-sm text-gray-500">{book.author} | {book.price} افغانی</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingBook({...book})} className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200"><i className="fas fa-edit text-sm"></i></button>
                      <button onClick={() => handleDeleteBook(book.id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200"><i className="fas fa-trash text-sm"></i></button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Edit Book Modal */}
              {editingBook && (
                <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4" onClick={() => setEditingBook(null)}>
                  <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-bold mb-4">{editingBook.id === 0 ? 'افزودن کتاب' : 'ویرایش کتاب'}</h3>
                    <div className="space-y-3">
                      <input value={editingBook.title} onChange={e => setEditingBook({...editingBook, title: e.target.value})} placeholder="عنوان کتاب" className="w-full px-4 py-2 border rounded-lg" />
                      <input value={editingBook.author} onChange={e => setEditingBook({...editingBook, author: e.target.value})} placeholder="نویسنده" className="w-full px-4 py-2 border rounded-lg" />
                      <div className="grid grid-cols-2 gap-3">
                        <input value={editingBook.price} onChange={e => setEditingBook({...editingBook, price: e.target.value})} placeholder="قیمت (افغانی)" className="w-full px-4 py-2 border rounded-lg" />
                        <input value={editingBook.oldPrice} onChange={e => setEditingBook({...editingBook, oldPrice: e.target.value})} placeholder="قیمت قبلی" className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <input value={editingBook.category} onChange={e => setEditingBook({...editingBook, category: e.target.value})} placeholder="دسته‌بندی" className="w-full px-4 py-2 border rounded-lg" />
                      <div className="grid grid-cols-2 gap-3">
                        <select value={editingBook.badge} onChange={e => setEditingBook({...editingBook, badge: e.target.value})} className="px-4 py-2 border rounded-lg">
                          <option value="پرفروش">پرفروش</option>
                          <option value="جدید">جدید</option>
                        </select>
                        <input value={editingBook.cover} onChange={e => setEditingBook({...editingBook, cover: e.target.value})} placeholder="ایموجی جلد" className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={editingBook.isNew} onChange={e => setEditingBook({...editingBook, isNew: e.target.checked})} id="isNew" />
                        <label htmlFor="isNew">تازه‌وارد</label>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={handleSaveBook} className="btn-primary flex-1 text-sm py-2">ذخیره</button>
                        <button onClick={() => setEditingBook(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium">لغو</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              <button onClick={() => setEditingGallery({ id: 0, title: '', category: 'فروشگاه', imageUrl: '' })} className="btn-primary mb-4 text-sm py-2 px-4">
                <i className="fas fa-plus ml-2"></i> افزودن تصویر جدید
              </button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.gallery.map(item => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <i className="fas fa-image text-teal-600 text-xl"></i>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 truncate">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => setEditingGallery({...item})} className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200"><i className="fas fa-edit text-sm"></i></button>
                      <button onClick={() => handleDeleteGallery(item.id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200"><i className="fas fa-trash text-sm"></i></button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Edit Gallery Modal */}
              {editingGallery && (
                <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4" onClick={() => setEditingGallery(null)}>
                  <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-bold mb-4">{editingGallery.id === 0 ? 'افزودن تصویر' : 'ویرایش تصویر'}</h3>
                    <div className="space-y-3">
                      <input value={editingGallery.title} onChange={e => setEditingGallery({...editingGallery, title: e.target.value})} placeholder="عنوان تصویر" className="w-full px-4 py-2 border rounded-lg" />
                      <select value={editingGallery.category} onChange={e => setEditingGallery({...editingGallery, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg">
                        <option value="فروشگاه">فروشگاه</option>
                        <option value="کتاب">کتاب</option>
                        <option value="محصولات">محصولات</option>
                        <option value="فضا">فضا</option>
                        <option value="رویداد">رویداد</option>
                      </select>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">تصویر</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full px-4 py-2 border rounded-lg" />
                        {editingGallery.imageUrl && (
                          <img src={editingGallery.imageUrl} alt="preview" className="mt-3 w-full h-32 object-cover rounded-lg" />
                        )}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={handleSaveGallery} className="btn-primary flex-1 text-sm py-2">ذخیره</button>
                        <button onClick={() => setEditingGallery(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium">لغو</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <button onClick={() => setEditingCategory({ id: 0, name: '', icon: 'fas fa-book', count: 0 })} className="btn-primary mb-4 text-sm py-2 px-4">
                <i className="fas fa-plus ml-2"></i> افزودن دسته‌بندی
              </button>
              <div className="space-y-3">
                {data.categories.map(cat => (
                  <div key={cat.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <i className={`${cat.icon} text-teal-700`}></i>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{cat.name}</h4>
                      <p className="text-sm text-gray-500">{cat.count} عنوان کتاب</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingCategory({...cat})} className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200"><i className="fas fa-edit text-sm"></i></button>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200"><i className="fas fa-trash text-sm"></i></button>
                    </div>
                  </div>
                ))}
              </div>
              {editingCategory && (
                <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4" onClick={() => setEditingCategory(null)}>
                  <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-bold mb-4">{editingCategory.id === 0 ? 'افزودن دسته‌بندی' : 'ویرایش دسته‌بندی'}</h3>
                    <div className="space-y-3">
                      <input value={editingCategory.name} onChange={e => setEditingCategory({...editingCategory, name: e.target.value})} placeholder="نام دسته‌بندی" className="w-full px-4 py-2 border rounded-lg" />
                      <input value={editingCategory.icon} onChange={e => setEditingCategory({...editingCategory, icon: e.target.value})} placeholder="آیکون (fas fa-book)" className="w-full px-4 py-2 border rounded-lg" />
                      <input type="number" value={editingCategory.count} onChange={e => setEditingCategory({...editingCategory, count: Number(e.target.value)})} placeholder="تعداد کتاب" className="w-full px-4 py-2 border rounded-lg" />
                      <div className="flex gap-2 pt-2">
                        <button onClick={handleSaveCategory} className="btn-primary flex-1 text-sm py-2">ذخیره</button>
                        <button onClick={() => setEditingCategory(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium">لغو</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Testimonials Tab */}
          {activeTab === 'testimonials' && (
            <div>
              <button onClick={() => setEditingTestimonial({ id: 0, name: '', role: '', text: '', rating: 5, avatar: '👤' })} className="btn-primary mb-4 text-sm py-2 px-4">
                <i className="fas fa-plus ml-2"></i> افزودن نظر
              </button>
              <div className="space-y-3">
                {data.testimonials.map(test => (
                  <div key={test.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                    <span className="text-3xl">{test.avatar}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800">{test.name}</h4>
                      <p className="text-sm text-gray-500">{test.role}</p>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{test.text}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingTestimonial({...test})} className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200"><i className="fas fa-edit text-sm"></i></button>
                      <button onClick={() => handleDeleteTestimonial(test.id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200"><i className="fas fa-trash text-sm"></i></button>
                    </div>
                  </div>
                ))}
              </div>
              {editingTestimonial && (
                <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center p-4" onClick={() => setEditingTestimonial(null)}>
                  <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
                    <h3 className="text-lg font-bold mb-4">{editingTestimonial.id === 0 ? 'افزودن نظر' : 'ویرایش نظر'}</h3>
                    <div className="space-y-3">
                      <input value={editingTestimonial.name} onChange={e => setEditingTestimonial({...editingTestimonial, name: e.target.value})} placeholder="نام" className="w-full px-4 py-2 border rounded-lg" />
                      <input value={editingTestimonial.role} onChange={e => setEditingTestimonial({...editingTestimonial, role: e.target.value})} placeholder="سمت / شغل" className="w-full px-4 py-2 border rounded-lg" />
                      <textarea value={editingTestimonial.text} onChange={e => setEditingTestimonial({...editingTestimonial, text: e.target.value})} placeholder="متن نظر" rows={3} className="w-full px-4 py-2 border rounded-lg resize-none"></textarea>
                      <div className="grid grid-cols-2 gap-3">
                        <input value={editingTestimonial.avatar} onChange={e => setEditingTestimonial({...editingTestimonial, avatar: e.target.value})} placeholder="ایموجی آواتار" className="w-full px-4 py-2 border rounded-lg" />
                        <select value={editingTestimonial.rating} onChange={e => setEditingTestimonial({...editingTestimonial, rating: Number(e.target.value)})} className="px-4 py-2 border rounded-lg">
                          <option value={5}>۵ ستاره</option>
                          <option value={4}>۴ ستاره</option>
                          <option value={3}>۳ ستاره</option>
                        </select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button onClick={handleSaveTestimonial} className="btn-primary flex-1 text-sm py-2">ذخیره</button>
                        <button onClick={() => setEditingTestimonial(null)} className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg font-medium">لغو</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t flex items-center justify-between">
          <button onClick={resetData} className="text-sm text-red-500 hover:text-red-700 transition-colors">
            <i className="fas fa-undo ml-1"></i> بازنشانی به حالت اولیه
          </button>
          <p className="text-sm text-gray-500">
            <i className="fas fa-info-circle ml-1"></i> تغییرات به صورت خودکار ذخیره می‌شوند
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
