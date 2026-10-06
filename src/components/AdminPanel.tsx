import React, { useState, useEffect } from 'react';
import api from '../services/api';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  // Add/Edit Form States
  const [showAddBook, setShowAddBook] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [showAddGallery, setShowAddGallery] = useState(false);
  const [editingGallery, setEditingGallery] = useState<any>(null);
  const [showAddTestimonial, setShowAddTestimonial] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);

  const [bookForm, setBookForm] = useState({
    title: '', author: '', price: '', old_price: '', rating: 5,
    badge: 'جدید', category: '', cover: '📕', is_new: false, description: '', stock: 0
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '', icon: 'fas fa-book', count: 0, description: ''
  });

  const [galleryForm, setGalleryForm] = useState({
    title: '', category: 'فروشگاه', description: '', image: null as File | null
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: '', role: '', text: '', rating: 5, avatar: '👤'
  });

  const [settingsForm, setSettingsForm] = useState({
    site_name: '', site_description: '', site_address: '',
    site_phone: '', site_email: '', site_working_hours: '',
    free_shipping_threshold: ''
  });

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Load data when tab changes
  useEffect(() => {
    if (!isLoggedIn || !isOpen) return;
    loadData();
  }, [activeTab, isLoggedIn, isOpen]);

  const showNotification = (type: string, message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'dashboard':
          const statsRes = await api.getStats();
          setStats(statsRes.data);
          break;
        case 'books':
          const booksRes = await api.getBooks();
          setBooks(booksRes.data);
          break;
        case 'categories':
          const catsRes = await api.getCategories();
          setCategories(catsRes.data);
          break;
        case 'gallery':
          const galRes = await api.getGallery();
          setGallery(galRes.data);
          break;
        case 'testimonials':
          const testsRes = await api.getAllTestimonials();
          setTestimonials(testsRes.data);
          break;
        case 'messages':
          const msgRes = await api.getMessages();
          setMessages(msgRes.data);
          break;
        case 'settings':
          const settingsRes = await api.getSettings();
          setSettings(settingsRes.data);
          setSettingsForm(settingsRes.data);
          break;
      }
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در دریافت اطلاعات');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsLoggedIn(false);
    onClose();
  };

  // ============ Settings Handlers ============

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.updateSettings(settingsForm);
      showNotification('success', 'تنظیمات با موفقیت ذخیره شد');
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در ذخیره تنظیمات');
    }
  };

  // ============ Book Handlers ============

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const formData = new FormData();
      Object.entries(bookForm).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      await api.createBook(formData);
      showNotification('success', 'کتاب با موفقیت اضافه شد');
      setShowAddBook(false);
      resetBookForm();
      loadData();
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در افزودن کتاب');
    }
  };

  const handleEditBook = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editingBook) return;
    try {
      const formData = new FormData();
      Object.entries(bookForm).forEach(([key, value]) => {
        formData.append(key, String(value));
      });
      await api.updateBook(editingBook._id, formData);
      showNotification('success', 'کتاب با موفقیت ویرایش شد');
      setEditingBook(null);
      resetBookForm();
      loadData();
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در ویرایش کتاب');
    }
  };

  const resetBookForm = () => {
    setBookForm({
      title: '', author: '', price: '', old_price: '', rating: 5,
      badge: 'جدید', category: '', cover: '📕', is_new: false, description: '', stock: 0
    });
  };

  const startEditBook = (book: any) => {
    setEditingBook(book);
    setBookForm({
      title: book.title,
      author: book.author,
      price: book.price,
      old_price: book.old_price || '',
      rating: book.rating,
      badge: book.badge,
      category: book.category,
      cover: book.cover,
      is_new: book.is_new,
      description: book.description || '',
      stock: book.stock || 0
    });
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    try {
      await api.deleteBook(id);
      showNotification('success', 'کتاب حذف شد');
      loadData();
    } catch (error: any) {
      showNotification('error', error.message);
    }
  };

  // ============ Category Handlers ============

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.createCategory(categoryForm);
      showNotification('success', 'دسته‌بندی با موفقیت اضافه شد');
      setShowAddCategory(false);
      resetCategoryForm();
      loadData();
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در افزودن دسته‌بندی');
    }
  };

  const handleEditCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editingCategory) return;
    try {
      await api.updateCategory(editingCategory._id, categoryForm);
      showNotification('success', 'دسته‌بندی با موفقیت ویرایش شد');
      setEditingCategory(null);
      resetCategoryForm();
      loadData();
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در ویرایش دسته‌بندی');
    }
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', icon: 'fas fa-book', count: 0, description: '' });
  };

  const startEditCategory = (cat: any) => {
    setEditingCategory(cat);
    setCategoryForm({
      name: cat.name,
      icon: cat.icon,
      count: cat.count,
      description: cat.description || ''
    });
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    try {
      await api.deleteCategory(id);
      showNotification('success', 'دسته‌بندی حذف شد');
      loadData();
    } catch (error: any) {
      showNotification('error', error.message);
    }
  };

  // ============ Gallery Handlers ============

  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const formData = new FormData();
      formData.append('title', galleryForm.title);
      formData.append('category', galleryForm.category);
      formData.append('description', galleryForm.description || '');
      if (galleryForm.image) {
        formData.append('image', galleryForm.image);
      }
      await api.createGallery(formData);
      showNotification('success', 'تصویر با موفقیت اضافه شد');
      setShowAddGallery(false);
      resetGalleryForm();
      loadData();
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در افزودن تصویر');
    }
  };

  const handleEditGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editingGallery) return;
    try {
      const formData = new FormData();
      formData.append('title', galleryForm.title);
      formData.append('category', galleryForm.category);
      formData.append('description', galleryForm.description || '');
      if (galleryForm.image) {
        formData.append('image', galleryForm.image);
      }
      await api.updateGallery(editingGallery._id, formData);
      showNotification('success', 'تصویر با موفقیت ویرایش شد');
      setEditingGallery(null);
      resetGalleryForm();
      loadData();
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در ویرایش تصویر');
    }
  };

  const resetGalleryForm = () => {
    setGalleryForm({ title: '', category: 'فروشگاه', description: '', image: null });
  };

  const startEditGallery = (item: any) => {
    setEditingGallery(item);
    setGalleryForm({
      title: item.title,
      category: item.category,
      description: item.description || '',
      image: null
    });
  };

  const handleDeleteGallery = async (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    try {
      await api.deleteGallery(id);
      showNotification('success', 'تصویر حذف شد');
      loadData();
    } catch (error: any) {
      showNotification('error', error.message);
    }
  };

  // ============ Testimonial Handlers ============

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await api.submitTestimonial(testimonialForm);
      showNotification('success', 'نظر با موفقیت اضافه شد');
      setShowAddTestimonial(false);
      resetTestimonialForm();
      loadData();
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در افزودن نظر');
    }
  };

  const handleEditTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editingTestimonial) return;
    try {
      await api.updateTestimonial(editingTestimonial._id, testimonialForm);
      showNotification('success', 'نظر با موفقیت ویرایش شد');
      setEditingTestimonial(null);
      resetTestimonialForm();
      loadData();
    } catch (error: any) {
      showNotification('error', error.message || 'خطا در ویرایش نظر');
    }
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({ name: '', role: '', text: '', rating: 5, avatar: '👤' });
  };

  const startEditTestimonial = (test: any) => {
    setEditingTestimonial(test);
    setTestimonialForm({
      name: test.name,
      role: test.role || '',
      text: test.text,
      rating: test.rating,
      avatar: test.avatar
    });
  };

  const handleApproveTestimonial = async (id: string) => {
    try {
      await api.approveTestimonial(id);
      showNotification('success', 'نظر تأیید شد');
      loadData();
    } catch (error: any) {
      showNotification('error', error.message);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    try {
      await api.deleteTestimonial(id);
      showNotification('success', 'نظر حذف شد');
      loadData();
    } catch (error: any) {
      showNotification('error', error.message);
    }
  };

  // ============ Message Handlers ============

  const handleMarkMessageRead = async (id: string) => {
    try {
      await api.markMessageRead(id);
      loadData();
    } catch (error: any) {
      showNotification('error', error.message);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm('آیا مطمئن هستید؟')) return;
    try {
      await api.deleteMessage(id);
      showNotification('success', 'پیام حذف شد');
      loadData();
    } catch (error: any) {
      showNotification('error', error.message);
    }
  };

  if (!isOpen) return null;

  if (!isLoggedIn) {
    if (showRegister) {
      return (
        <AdminRegister 
          onRegister={() => setIsLoggedIn(true)} 
          onSwitchToLogin={() => setShowRegister(false)} 
        />
      );
    }
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} onSwitchToRegister={() => setShowRegister(true)} />;
  }

  const tabs = [
    { id: 'dashboard', label: 'داشبورد', icon: 'fas fa-chart-line' },
    { id: 'books', label: 'کتاب‌ها', icon: 'fas fa-book' },
    { id: 'categories', label: 'دسته‌بندی', icon: 'fas fa-layer-group' },
    { id: 'gallery', label: 'گالری', icon: 'fas fa-images' },
    { id: 'testimonials', label: 'نظرات', icon: 'fas fa-comments' },
    { id: 'messages', label: 'پیام‌ها', icon: 'fas fa-envelope' },
    { id: 'settings', label: 'تنظیمات', icon: 'fas fa-cog' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 rounded-xl shadow-lg text-white ${
          notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        }`}>
          <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} ml-2`}></i>
          {notification.message}
        </div>
      )}

      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-l from-teal-50 to-white">
          <h2 className="text-2xl font-bold text-gray-800">
            <i className="fas fa-cog text-teal-700 ml-3"></i>
            پنل مدیریت
          </h2>
          <div className="flex gap-2">
            <button onClick={handleLogout} className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm">
              <i className="fas fa-sign-out-alt ml-1"></i> خروج
            </button>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-red-100 hover:text-red-600 transition-colors">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b overflow-x-auto bg-gray-50">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id ? 'bg-teal-800 text-white shadow-md' : 'bg-white text-gray-600 hover:bg-teal-50 border'
              }`}
            >
              <i className={`${tab.icon} ml-2`}></i> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {loading ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-4xl text-teal-600"></i>
              <p className="mt-4 text-gray-500">در حال بارگذاری...</p>
            </div>
          ) : (
            <>
              {/* Dashboard */}
              {activeTab === 'dashboard' && stats && (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-teal-50 rounded-xl p-4 text-center">
                      <i className="fas fa-book text-teal-600 text-2xl mb-2"></i>
                      <div className="text-2xl font-bold text-teal-800">{stats.totalBooks}</div>
                      <div className="text-sm text-gray-600">کتاب</div>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 text-center">
                      <i className="fas fa-layer-group text-blue-600 text-2xl mb-2"></i>
                      <div className="text-2xl font-bold text-blue-800">{stats.totalCategories}</div>
                      <div className="text-sm text-gray-600">دسته‌بندی</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <i className="fas fa-images text-purple-600 text-2xl mb-2"></i>
                      <div className="text-2xl font-bold text-purple-800">{stats.totalGallery}</div>
                      <div className="text-sm text-gray-600">تصویر</div>
                    </div>
                    <div className="bg-amber-50 rounded-xl p-4 text-center">
                      <i className="fas fa-envelope text-amber-600 text-2xl mb-2"></i>
                      <div className="text-2xl font-bold text-amber-800">{stats.unreadMessages}</div>
                      <div className="text-sm text-gray-600">پیام جدید</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-lg font-bold text-gray-800">{stats.newBooks}</div>
                      <div className="text-sm text-gray-500">کتاب جدید</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-lg font-bold text-gray-800">{stats.bestsellers}</div>
                      <div className="text-sm text-gray-500">پرفروش</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-lg font-bold text-gray-800">{stats.totalSubscribers}</div>
                      <div className="text-sm text-gray-500">مشترک خبرنامه</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <div>
                  <h3 className="text-lg font-bold mb-4">تنظیمات سایت</h3>
                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">نام سایت</label>
                        <input value={settingsForm.site_name} onChange={(e) => setSettingsForm({...settingsForm, site_name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">توضیحات سایت</label>
                        <input value={settingsForm.site_description} onChange={(e) => setSettingsForm({...settingsForm, site_description: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">آدرس</label>
                        <input value={settingsForm.site_address} onChange={(e) => setSettingsForm({...settingsForm, site_address: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">شماره تلفن</label>
                        <input value={settingsForm.site_phone} onChange={(e) => setSettingsForm({...settingsForm, site_phone: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ایمیل</label>
                        <input value={settingsForm.site_email} onChange={(e) => setSettingsForm({...settingsForm, site_email: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ساعات کاری</label>
                        <input value={settingsForm.site_working_hours} onChange={(e) => setSettingsForm({...settingsForm, site_working_hours: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">حد ارسال رایگان (افغانی)</label>
                        <input value={settingsForm.free_shipping_threshold} onChange={(e) => setSettingsForm({...settingsForm, free_shipping_threshold: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                      </div>
                    </div>
                    <button type="submit" className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-900 transition-colors">
                      <i className="fas fa-save ml-2"></i> ذخیره تنظیمات
                    </button>
                  </form>
                </div>
              )}

              {/* Books */}
              {activeTab === 'books' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">مجموع: {books.length} کتاب</h3>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowAddBook(true); setEditingBook(null); resetBookForm(); }}
                      className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-900 transition-colors"
                    >
                      <i className="fas fa-plus ml-2"></i> افزودن کتاب
                    </button>
                  </div>

                  {/* Add/Edit Book Form */}
                  {(showAddBook || editingBook) && (
                    <div className="bg-teal-50 rounded-xl p-6 mb-4 border-2 border-teal-200" onClick={(e) => e.stopPropagation()}>
                      <h4 className="font-bold text-lg mb-4 text-teal-800">
                        <i className={`fas ${editingBook ? 'fa-edit' : 'fa-plus-circle'} ml-2`}></i>
                        {editingBook ? 'ویرایش کتاب' : 'افزودن کتاب جدید'}
                      </h4>
                      <form onSubmit={editingBook ? handleEditBook : handleAddBook} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input value={bookForm.title} onChange={(e) => setBookForm({...bookForm, title: e.target.value})} placeholder="عنوان کتاب *" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" required />
                          <input value={bookForm.author} onChange={(e) => setBookForm({...bookForm, author: e.target.value})} placeholder="نویسنده *" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" required />
                          <input value={bookForm.price} onChange={(e) => setBookForm({...bookForm, price: e.target.value})} placeholder="قیمت (افغانی) *" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" required />
                          <input value={bookForm.old_price} onChange={(e) => setBookForm({...bookForm, old_price: e.target.value})} placeholder="قیمت قبلی" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                          <input value={bookForm.category} onChange={(e) => setBookForm({...bookForm, category: e.target.value})} placeholder="دسته‌بندی" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                          <input value={bookForm.cover} onChange={(e) => setBookForm({...bookForm, cover: e.target.value})} placeholder="ایموجی جلد (📕)" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                          <select value={bookForm.badge} onChange={(e) => setBookForm({...bookForm, badge: e.target.value})} className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none">
                            <option value="جدید">جدید</option>
                            <option value="پرفروش">پرفروش</option>
                            <option value="ویژه">ویژه</option>
                          </select>
                          <input type="number" value={bookForm.rating} onChange={(e) => setBookForm({...bookForm, rating: Number(e.target.value)})} placeholder="امتیاز (0-5)" min="0" max="5" step="0.1" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                        </div>
                        <textarea value={bookForm.description} onChange={(e) => setBookForm({...bookForm, description: e.target.value})} placeholder="توضیحات" rows={3} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none resize-none"></textarea>
                        <div className="flex gap-2">
                          <button type="submit" className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-900 transition-colors">
                            <i className="fas fa-save ml-2"></i> {editingBook ? 'بروزرسانی' : 'ذخیره'}
                          </button>
                          <button type="button" onClick={() => { setShowAddBook(false); setEditingBook(null); resetBookForm(); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            لغو
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="space-y-3">
                    {books.map(book => (
                      <div key={book._id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <span className="text-3xl">{book.cover}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{book.title}</h4>
                          <p className="text-sm text-gray-500">{book.author} | {book.price} افغانی</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => startEditBook(book)} className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                            <i className="fas fa-edit text-sm"></i>
                          </button>
                          <button onClick={() => handleDeleteBook(book._id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories */}
              {activeTab === 'categories' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">مجموع: {categories.length} دسته‌بندی</h3>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowAddCategory(true); setEditingCategory(null); resetCategoryForm(); }}
                      className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-900 transition-colors"
                    >
                      <i className="fas fa-plus ml-2"></i> افزودن دسته‌بندی
                    </button>
                  </div>

                  {/* Add/Edit Category Form */}
                  {(showAddCategory || editingCategory) && (
                    <div className="bg-teal-50 rounded-xl p-6 mb-4 border-2 border-teal-200" onClick={(e) => e.stopPropagation()}>
                      <h4 className="font-bold text-lg mb-4 text-teal-800">
                        <i className={`fas ${editingCategory ? 'fa-edit' : 'fa-plus-circle'} ml-2`}></i>
                        {editingCategory ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
                      </h4>
                      <form onSubmit={editingCategory ? handleEditCategory : handleAddCategory} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input value={categoryForm.name} onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})} placeholder="نام دسته‌بندی *" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" required />
                          <input value={categoryForm.icon} onChange={(e) => setCategoryForm({...categoryForm, icon: e.target.value})} placeholder="آیکون (fas fa-book)" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                          <input type="number" value={categoryForm.count} onChange={(e) => setCategoryForm({...categoryForm, count: Number(e.target.value)})} placeholder="تعداد کتاب" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                        </div>
                        <input value={categoryForm.description} onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})} placeholder="توضیحات" className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                        <div className="flex gap-2">
                          <button type="submit" className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-900 transition-colors">
                            <i className="fas fa-save ml-2"></i> {editingCategory ? 'بروزرسانی' : 'ذخیره'}
                          </button>
                          <button type="button" onClick={() => { setShowAddCategory(false); setEditingCategory(null); resetCategoryForm(); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            لغو
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="space-y-3">
                    {categories.map(cat => (
                      <div key={cat._id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <i className={`${cat.icon} text-teal-700`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{cat.name}</h4>
                          <p className="text-sm text-gray-500">{cat.count} کتاب</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => startEditCategory(cat)} className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                            <i className="fas fa-edit text-sm"></i>
                          </button>
                          <button onClick={() => handleDeleteCategory(cat._id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery */}
              {activeTab === 'gallery' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">مجموع: {gallery.length} تصویر</h3>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowAddGallery(true); setEditingGallery(null); resetGalleryForm(); }}
                      className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-900 transition-colors"
                    >
                      <i className="fas fa-plus ml-2"></i> افزودن تصویر
                    </button>
                  </div>

                  {/* Add/Edit Gallery Form */}
                  {(showAddGallery || editingGallery) && (
                    <div className="bg-teal-50 rounded-xl p-6 mb-4 border-2 border-teal-200" onClick={(e) => e.stopPropagation()}>
                      <h4 className="font-bold text-lg mb-4 text-teal-800">
                        <i className={`fas ${editingGallery ? 'fa-edit' : 'fa-plus-circle'} ml-2`}></i>
                        {editingGallery ? 'ویرایش تصویر' : 'افزودن تصویر جدید'}
                      </h4>
                      <form onSubmit={editingGallery ? handleEditGallery : handleAddGallery} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input value={galleryForm.title} onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})} placeholder="عنوان تصویر *" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" required />
                          <select value={galleryForm.category} onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})} className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none">
                            <option value="فروشگاه">فروشگاه</option>
                            <option value="کتاب">کتاب</option>
                            <option value="محصولات">محصولات</option>
                            <option value="فضا">فضا</option>
                            <option value="رویداد">رویداد</option>
                          </select>
                        </div>
                        <input value={galleryForm.description} onChange={(e) => setGalleryForm({...galleryForm, description: e.target.value})} placeholder="توضیحات" className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">تصویر {editingGallery && '(خالی بگذارید اگر تغییر نمی‌کنید)'}</label>
                          <input type="file" accept="image/*" onChange={(e) => setGalleryForm({...galleryForm, image: e.target.files?.[0] || null})} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                        </div>
                        <div className="flex gap-2">
                          <button type="submit" className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-900 transition-colors">
                            <i className="fas fa-save ml-2"></i> {editingGallery ? 'بروزرسانی' : 'ذخیره'}
                          </button>
                          <button type="button" onClick={() => { setShowAddGallery(false); setEditingGallery(null); resetGalleryForm(); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            لغو
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map(item => (
                      <div key={item._id} className="bg-gray-50 rounded-xl p-4 relative hover:shadow-md transition-shadow">
                        <div className="w-full h-32 bg-teal-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          {item.image_url ? (
                            <img src={`http://localhost:5000${item.image_url}`} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <i className="fas fa-image text-teal-400 text-3xl"></i>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.category}</p>
                        <div className="absolute top-2 left-2 flex gap-1">
                          <button onClick={() => startEditGallery(item)} className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                            <i className="fas fa-edit text-xs"></i>
                          </button>
                          <button onClick={() => handleDeleteGallery(item._id)} className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                            <i className="fas fa-trash text-xs"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials */}
              {activeTab === 'testimonials' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">مجموع: {testimonials.length} نظر</h3>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowAddTestimonial(true); setEditingTestimonial(null); resetTestimonialForm(); }}
                      className="bg-teal-800 text-white px-4 py-2 rounded-lg hover:bg-teal-900 transition-colors"
                    >
                      <i className="fas fa-plus ml-2"></i> افزودن نظر
                    </button>
                  </div>

                  {/* Add/Edit Testimonial Form */}
                  {(showAddTestimonial || editingTestimonial) && (
                    <div className="bg-teal-50 rounded-xl p-6 mb-4 border-2 border-teal-200" onClick={(e) => e.stopPropagation()}>
                      <h4 className="font-bold text-lg mb-4 text-teal-800">
                        <i className={`fas ${editingTestimonial ? 'fa-edit' : 'fa-plus-circle'} ml-2`}></i>
                        {editingTestimonial ? 'ویرایش نظر' : 'افزودن نظر جدید'}
                      </h4>
                      <form onSubmit={editingTestimonial ? handleEditTestimonial : handleAddTestimonial} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input value={testimonialForm.name} onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})} placeholder="نام *" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" required />
                          <input value={testimonialForm.role} onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})} placeholder="سمت / شغل" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                          <input value={testimonialForm.avatar} onChange={(e) => setTestimonialForm({...testimonialForm, avatar: e.target.value})} placeholder="ایموجی آواتار (👤)" className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none" />
                          <select value={testimonialForm.rating} onChange={(e) => setTestimonialForm({...testimonialForm, rating: Number(e.target.value)})} className="px-4 py-2 border rounded-lg focus:border-teal-600 outline-none">
                            <option value={5}>۵ ستاره</option>
                            <option value={4}>۴ ستاره</option>
                            <option value={3}>۳ ستاره</option>
                          </select>
                        </div>
                        <textarea value={testimonialForm.text} onChange={(e) => setTestimonialForm({...testimonialForm, text: e.target.value})} placeholder="متن نظر *" rows={3} className="w-full px-4 py-2 border rounded-lg focus:border-teal-600 outline-none resize-none" required></textarea>
                        <div className="flex gap-2">
                          <button type="submit" className="bg-teal-800 text-white px-6 py-2 rounded-lg hover:bg-teal-900 transition-colors">
                            <i className="fas fa-save ml-2"></i> {editingTestimonial ? 'بروزرسانی' : 'ذخیره'}
                          </button>
                          <button type="button" onClick={() => { setShowAddTestimonial(false); setEditingTestimonial(null); resetTestimonialForm(); }} className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            لغو
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="space-y-3">
                    {testimonials.map(test => (
                      <div key={test._id} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                        <span className="text-3xl">{test.avatar}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{test.name}</h4>
                          <p className="text-sm text-gray-500">{test.role}</p>
                          <p className="text-sm text-gray-600 mt-1">{test.text}</p>
                          <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${test.is_approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                            {test.is_approved ? 'تأیید شده' : 'در انتظار تأیید'}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {!test.is_approved && (
                            <button onClick={() => handleApproveTestimonial(test._id)} className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-200 transition-colors">
                              <i className="fas fa-check text-sm"></i>
                            </button>
                          )}
                          <button onClick={() => startEditTestimonial(test)} className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                            <i className="fas fa-edit text-sm"></i>
                          </button>
                          <button onClick={() => handleDeleteTestimonial(test._id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages */}
              {activeTab === 'messages' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">مجموع: {messages.length} پیام</h3>
                  </div>
                  <div className="space-y-3">
                    {messages.map(msg => (
                      <div key={msg._id} className={`rounded-xl p-4 ${msg.is_read ? 'bg-gray-50' : 'bg-teal-50 border-2 border-teal-200'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-gray-800">{msg.name}</h4>
                            <p className="text-sm text-gray-500">{msg.email} | {msg.phone}</p>
                          </div>
                          <div className="flex gap-2">
                            {!msg.is_read && (
                              <button onClick={() => handleMarkMessageRead(msg._id)} className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors">
                                <i className="fas fa-eye text-xs"></i>
                              </button>
                            )}
                            <button onClick={() => handleDeleteMessage(msg._id)} className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors">
                              <i className="fas fa-trash text-xs"></i>
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{msg.message}</p>
                        <p className="text-xs text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleDateString('fa-IR')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            <i className="fas fa-database ml-1 text-teal-600"></i>
            متصل به MongoDB
          </p>
          <button onClick={loadData} className="text-sm text-teal-600 hover:text-teal-800 transition-colors">
            <i className="fas fa-sync-alt ml-1"></i> بروزرسانی
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
