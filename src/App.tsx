import React, { useState, useEffect } from 'react';
import { DataProvider } from './store/DataContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Categories from './components/Categories';
import Books from './components/Books';
import SpecialOffer from './components/SpecialOffer';
import About from './components/About';
import Authors from './components/Authors';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <DataProvider>
      <div className="min-h-screen bg-white" dir="rtl">
        <Navbar />
        <Hero />
        <Features />
        <Categories />
        <Books />
        <SpecialOffer />
        <About />
        <Authors />
        <Gallery />
        <Testimonials />
        <Contact />
        <Footer />

        {/* Back to Top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-8 left-8 z-40 w-14 h-14 bg-teal-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-900 transition-all duration-300 ${
            showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <i className="fas fa-arrow-up text-lg"></i>
        </button>

        {/* Admin Panel Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gray-800 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-teal-800 transition-all duration-300 group"
          title="پنل مدیریت"
        >
          <i className="fas fa-cog text-lg group-hover:rotate-90 transition-transform duration-300"></i>
        </button>

        {/* Admin Panel */}
        <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
      </div>
    </DataProvider>
  );
};

export default App;
