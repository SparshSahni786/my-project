import React, { useState, useRef } from 'react';
import SiteHeader from './components/SiteHeader';
import ProductGrid from './components/ProductGrid';
import ChatWidget from './components/ChatWidget';
import { CartProvider } from './contexts/CartContext';
import SupportPage from './components/SupportPage';

function App() {
  const [view, setView] = useState('home');
  const [activeCategory, setActiveCategory] = useState(null);
  const productsRef = useRef(null);

  const handleNavigate = (targetView, category) => {
    setView(targetView);
    setActiveCategory(category || null);
    window.scrollTo(0, 0);
  };
  
  const handleShopNow = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <CartProvider>
      <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
        <SiteHeader onNavigate={handleNavigate} />
        <main>
          {view === 'home' && (
             <>
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                      aria-hidden="true"
                    >
                      <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                          clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                      />
                    </div>
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-24">
                       <div className="text-center">
                          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                            Welcome to the AI Future Store
                          </h1>
                          <p className="mt-6 text-lg leading-8 text-slate-300">
                            Discover a curated collection of futuristic gadgets and accessories designed to enhance your life.
                          </p>
                          <div className="mt-10 flex items-center justify-center gap-x-6">
                            <button
                              onClick={handleShopNow}
                              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Shop Now
                            </button>
                          </div>
                      </div>
                    </div>
                </div>
                <div ref={productsRef}>
                    <ProductGrid />
                </div>
                <SupportPage />
             </>
          )}

          {view === 'category' && activeCategory && <ProductGrid category={activeCategory} />}
          {view === 'support' && <SupportPage />}

        </main>
        <ChatWidget />
        <footer className="bg-slate-900 py-6 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} AI Future Store. All rights reserved.</p>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
