import React from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Trash2 } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartCount } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-slate-800 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold">Your Cart ({cartCount})</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-700">
              <X size={24} />
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
              <p className="text-slate-400">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-indigo-400">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      className="w-14 bg-slate-700 text-center rounded"
                    />
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-slate-400 hover:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cartItems.length > 0 && (
            <div className="p-6 border-t border-slate-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Subtotal</span>
                <span className="text-lg font-bold text-indigo-400">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                className="w-full bg-indigo-600 py-3 rounded-lg hover:bg-indigo-500 transition-colors font-semibold"
                onClick={() => {
                  onClose();
                  alert('Checkout functionality is not implemented in this demo.');
                  clearCart();
                }}
              >
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full text-center text-slate-400 mt-3 hover:text-white text-sm"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
