import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import Cart from './Cart';
import { ShoppingCart, Bot } from 'lucide-react';

const SiteHeader = ({ onNavigate }) => {
  const { cartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-40">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Bot size={32} className="text-indigo-400" />
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-white text-left"
            >
              AI Future Store
            </button>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('category', 'Computing')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Computing
            </button>
            <button
              onClick={() => onNavigate('category', 'Wearables')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Wearables
            </button>
            <button
              onClick={() => onNavigate('category', 'Audio')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Audio
            </button>
            <button
              onClick={() => onNavigate('support')}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Support
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-slate-300 hover:text-white transition-colors"
              aria-label={`Open cart with ${cartCount} items`}
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default SiteHeader;
