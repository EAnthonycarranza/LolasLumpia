import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const addToCart = (item, selectedFlavor) => {
    setCart(prev => {
      // Create a unique key for the item based on ID and selected flavor
      const existing = prev.find(i => i._id === item._id && i.selectedFlavor === selectedFlavor);
      if (existing) {
        return prev.map(i => (i._id === item._id && i.selectedFlavor === selectedFlavor) ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, selectedFlavor, qty: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id, selectedFlavor) => {
    setCart(prev => prev.filter(i => !(i._id === id && i.selectedFlavor === selectedFlavor)));
  };

  const changeQty = (id, selectedFlavor, delta) => {
    setCart(prev => prev.map(i => {
      if (!(i._id === id && i.selectedFlavor === selectedFlavor)) return i;
      const newQty = i.qty + delta;
      return newQty <= 0 ? null : { ...i, qty: newQty };
    }).filter(Boolean));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, isOpen, setIsOpen, addToCart, removeFromCart, changeQty, clearCart, totalItems, totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
