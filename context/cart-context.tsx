// context/CartContext.tsx
"use client";
// context/CartContext.tsx
// context/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Book {
  id: string;
  titulo: string;
  precio: number;
  portadaBase64: string;
  cantidad: number;
}

interface CartContextType {
  cart: Book[];
  addToCart: (book: Omit<Book, 'cantidad'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  iva: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Book[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book: Omit<Book, 'cantidad'>) => {
    setCart((prevCart) => {
      const existingBook = prevCart.find((item) => item.id === book.id);
      if (existingBook) {
        return prevCart.map((item) =>
          item.id === book.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prevCart, { ...book, cantidad: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, book) => acc + book.precio * book.cantidad, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, subtotal, iva, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

