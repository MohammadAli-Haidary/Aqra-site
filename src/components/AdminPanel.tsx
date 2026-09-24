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
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

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
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-5xl" onClick={e => e.stopPropagation()}>
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[300] px-6 py-3 rounded-xl shadow-lg text-white ${
            notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
          }`}>
            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} ml-2`}></i>
            {notification.message}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b">
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

              {/* Books */}
              {activeTab === 'books' && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">مجموع: {books.length} کتاب</h3>
                  </div>
                  <div className="space-y-3">
                    {books.map(book => (
                      <div key={book._id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                        <span className="text-3xl">{book.cover}</span>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{book.title}</h4>
                          <p className="text-sm text-gray-500">{book.author} | {book.price} افغانی</p>
                        </div>
                        <button onClick={() => handleDeleteBook(book._id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200">
                          <i className="fas fa-trash text-sm"></i>
                        </button>
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
                  </div>
                  <div className="space-y-3">
                    {categories.map(cat => (
                      <div key={cat._id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                        <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <i className={`${cat.icon} text-teal-700`}></i>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{cat.name}</h4>
                          <p className="text-sm text-gray-500">{cat.count} کتاب</p>
                        </div>
                        <button onClick={() => handleDeleteCategory(cat._id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200">
                          <i className="fas fa-trash text-sm"></i>
                        </button>
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
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map(item => (
                      <div key={item._id} className="bg-gray-50 rounded-xl p-4 relative">
                        <div className="w-full h-32 bg-teal-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          {item.image_url ? (
                            <img src={`http://localhost:5000${item.image_url}`} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <i className="fas fa-image text-teal-400 text-3xl"></i>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-800 text-sm truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.category}</p>
                        <button onClick={() => handleDeleteGallery(item._id)} className="absolute top-2 left-2 w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200">
                          <i className="fas fa-trash text-xs"></i>
                        </button>
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
                  </div>
                  <div className="space-y-3">
                    {testimonials.map(test => (
                      <div key={test._id} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
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
                            <button onClick={() => handleApproveTestimonial(test._id)} className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center hover:bg-emerald-200">
                              <i className="fas fa-check text-sm"></i>
                            </button>
                          )}
                          <button onClick={() => handleDeleteTestimonial(test._id)} className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200">
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
                      <div key={msg._id} className={`rounded-xl p-4 ${msg.is_read ? 'bg-gray-50' : 'bg-teal-50 border border-teal-200'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-gray-800">{msg.name}</h4>
                            <p className="text-sm text-gray-500">{msg.email} | {msg.phone}</p>
                          </div>
                          <div className="flex gap-2">
                            {!msg.is_read && (
                              <button onClick={() => handleMarkMessageRead(msg._id)} className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200">
                                <i className="fas fa-eye text-xs"></i>
                              </button>
                            )}
                            <button onClick={() => handleDeleteMessage(msg._id)} className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200">
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
        <div className="mt-6 pt-4 border-t flex items-center justify-between">
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
