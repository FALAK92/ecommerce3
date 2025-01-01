"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  quantity: number;
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]); // Correct state initialization
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    setCart(cart);

    const totalItems = cart.reduce(
      (count: number, item: { quantity: number }) => count + item.quantity,
      0
    );
    setCartCount(totalItems);
  }, [cartCount]);

  const updateQuantity = (id: number, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeItem = (id: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total: number, item: { price: number; discount: number; quantity: number }) =>
        total + ((item.price * (100 - item.discount)) / 100) * item.quantity,
      0
    );
  };

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      let updatedCart;
      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updatedCart = [...prevCart, newItem];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  if (cart.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-600 mb-4">Your Cart is Empty</h1>
        <Link href="/">
          <button className="px-6 py-2 bg-neutral-500 text-white rounded-lg hover:bg-gray-600 transition">
            Go Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-neutral-500 mb-8 text-center">Your Cart</h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center border-b border-gray-200 pb-4 mb-4">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-700">{item.name}</h2>
              <p className="text-gray-400 line-through text-sm">${item.price.toFixed(2)}</p>
              <p className="text-red-400 font-bold">
                ${((item.price * (100 - item.discount)) / 100).toFixed(2)}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2 py-1 bg-gray-300 text-gray-700 rounded-l-lg hover:bg-gray-400"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-12 text-center border border-gray-300"
                  min="1"
                />
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 bg-gray-300 text-gray-700 rounded-r-lg hover:bg-gray-400"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="ml-4 bg-red-400 text-white px-3 py-1 rounded-lg hover:bg-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-bold text-gray-700">Total:</h2>
          <p className="text-2xl font-bold text-red-400">${calculateTotal().toFixed(2)}</p>
        </div>
        <div className="text-right mt-4">
            <Link href={'/checkout'}>
          <button className="px-6 py-2 bg-neutral-500 text-white rounded-lg hover:bg-gray-600 transition">
            Proceed to Checkout
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;




