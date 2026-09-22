import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface Book {
  id: number;
  title: string;
  author: string;
  price: string;
  oldPrice: string;
  rating: number;
  badge: string;
  category: string;
  cover: string;
  isNew: boolean;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface SiteData {
  books: Book[];
  gallery: GalleryItem[];
  categories: Category[];
  testimonials: Testimonial[];
}

// Default data
const defaultBooks: Book[] = [
  { id: 1, title: 'بوف کور', author: 'صادق هدایت', price: '۸۵۰', oldPrice: '۱,۲۰۰', rating: 4.8, badge: 'پرفروش', category: 'ادبیات داستانی', cover: '📕', isNew: false },
  { id: 2, title: 'کلیدر', author: 'محمود دولت‌آبادی', price: '۲,۵۰۰', oldPrice: '۳,۵۰۰', rating: 4.9, badge: 'پرفروش', category: 'ادبیات داستانی', cover: '📗', isNew: false },
  { id: 3, title: 'شازده احتجاب', author: 'هوشنگ گلشیری', price: '۶۵۰', oldPrice: '۹۰۰', rating: 4.5, badge: 'جدید', category: 'ادبیات داستانی', cover: '📘', isNew: true },
  { id: 4, title: 'دیوان حافظ', author: 'حافظ شیرازی', price: '۱,۵۰۰', oldPrice: '۲,۰۰۰', rating: 5.0, badge: 'پرفروش', category: 'شعر و ادبیات', cover: '📙', isNew: false },
  { id: 5, title: 'مثنوی معنوی', author: 'مولانا جلال‌الدین', price: '۱,۸۰۰', oldPrice: '۲,۵۰۰', rating: 4.9, badge: 'پرفروش', category: 'شعر و ادبیات', cover: '📕', isNew: false },
  { id: 6, title: 'قدرت عادت', author: 'چارلز داهیگ', price: '۹۵۰', oldPrice: '۱,۳۰۰', rating: 4.6, badge: 'جدید', category: 'روانشناسی', cover: '📗', isNew: true },
  { id: 7, title: 'هنر شفاف اندیشیدن', author: 'رولف دوبلی', price: '۷۵۰', oldPrice: '۱,۱۰۰', rating: 4.7, badge: 'جدید', category: 'روانشناسی', cover: '📘', isNew: true },
  { id: 8, title: 'تاریخ افغانستان', author: 'مراد علی مراد', price: '۲,۲۰۰', oldPrice: '۳,۰۰۰', rating: 4.4, badge: 'پرفروش', category: 'تاریخ', cover: '📙', isNew: false },
];

const defaultGallery: GalleryItem[] = [
  { id: 1, title: 'صنف ادبیات', category: 'فروشگاه', imageUrl: '' },
  { id: 2, title: 'بخش کودکان', category: 'فروشگاه', imageUrl: '' },
  { id: 3, title: 'نمای بیرونی فروشگاه', category: 'فروشگاه', imageUrl: '' },
  { id: 4, title: 'کتاب‌های کلاسیک', category: 'کتاب', imageUrl: '' },
  { id: 5, title: 'کتاب‌های هنری', category: 'کتاب', imageUrl: '' },
  { id: 6, title: 'لوازم تحریر', category: 'محصولات', imageUrl: '' },
];

const defaultCategories: Category[] = [
  { id: 1, name: 'ادبیات داستانی', icon: 'fas fa-book', count: 1250 },
  { id: 2, name: 'شعر و ادبیات', icon: 'fas fa-feather-pointed', count: 890 },
  { id: 3, name: 'روانشناسی', icon: 'fas fa-brain', count: 650 },
  { id: 4, name: 'تاریخ افغانستان', icon: 'fas fa-landmark', count: 780 },
  { id: 5, name: 'کودک و نوجوان', icon: 'fas fa-child', count: 1100 },
  { id: 6, name: 'علوم دینی', icon: 'fas fa-mosque', count: 920 },
  { id: 7, name: 'کتاب‌های درسی', icon: 'fas fa-graduation-cap', count: 1450 },
  { id: 8, name: 'زبان انگلیسی', icon: 'fas fa-language', count: 560 },
  { id: 9, name: 'سیاست و اجتماع', icon: 'fas fa-scale-balanced', count: 430 },
  { id: 10, name: 'فلسفه و منطق', icon: 'fas fa-lightbulb', count: 380 },
  { id: 11, name: 'کمپیوتر و تکنالوژی', icon: 'fas fa-laptop-code', count: 620 },
  { id: 12, name: 'صحت و طب', icon: 'fas fa-heart-pulse', count: 510 },
];

const defaultTestimonials: Testimonial[] = [
  { id: 1, name: 'احمد نجفی', role: 'محصل پوهنتون کابل', text: 'بهترین کتاب‌فروشی آنلاین که تا حالا باهاش کار کردم. ارسال سریع و کتاب‌های اصل.', rating: 5, avatar: '👨‍🎓' },
  { id: 2, name: 'فاطمه رحیمی', role: 'استاد پوهنتون', text: 'من همیشه کتاب‌های درسی و مرجع خود را از اقرأ خریداری می‌کنم. تنوع کتاب‌ها فوق‌العاده است.', rating: 5, avatar: '👩‍🏫' },
  { id: 3, name: 'محمد کریمی', role: 'نویسنده و شاعر', text: 'بسته‌بندی کتاب‌ها عالی است و ارسال به هرات هم خیلی سریع انجام شد.', rating: 4, avatar: '👨‍💼' },
];

const defaultData: SiteData = {
  books: defaultBooks,
  gallery: defaultGallery,
  categories: defaultCategories,
  testimonials: defaultTestimonials,
};

// Context
interface DataContextType {
  data: SiteData;
  updateBooks: (books: Book[]) => void;
  updateGallery: (gallery: GalleryItem[]) => void;
  updateCategories: (categories: Category[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  resetData: () => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};

// Provider
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('egra-site-data');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('egra-site-data', JSON.stringify(data));
  }, [data]);

  const updateBooks = (books: Book[]) => setData(prev => ({ ...prev, books }));
  const updateGallery = (gallery: GalleryItem[]) => setData(prev => ({ ...prev, gallery }));
  const updateCategories = (categories: Category[]) => setData(prev => ({ ...prev, categories }));
  const updateTestimonials = (testimonials: Testimonial[]) => setData(prev => ({ ...prev, testimonials }));
  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem('egra-site-data');
  };

  return (
    <DataContext.Provider value={{ data, updateBooks, updateGallery, updateCategories, updateTestimonials, resetData }}>
      {children}
    </DataContext.Provider>
  );
};
