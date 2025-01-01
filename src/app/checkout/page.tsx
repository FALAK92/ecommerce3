"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  discount: number;
  quantity: number;
}

const CheckoutPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const router = useRouter();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];
    setCart(cart);

    const total = cart.reduce(
      (total: number, item: { price: number; discount: number; quantity: number }) =>
        total + ((item.price * (100 - item.discount)) / 100) * item.quantity,
      0
    );
    setCartTotal(total);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    // For simplicity, let's log the checkout details
    console.log("Order Details:", {
      cart,
      shippingAddress,
      totalAmount: cartTotal,
    });

    // Redirect to a confirmation page or payment gateway
    router.push("/order-confirmation"); // Replace with your confirmation page
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-neutral-500 mb-8 text-center">Checkout</h1>

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex items-center border-b border-gray-200 pb-4 mb-4">
            <Image
            width={80}
            height={80}
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg mr-4"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-700">{item.name}</h3>
              <p className="text-red-400 font-bold">
                ${((item.price * (100 - item.discount)) / 100).toFixed(2)} x {item.quantity}
              </p>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-bold text-gray-700">Total:</h2>
          <p className="text-2xl font-bold text-red-400">${cartTotal.toFixed(2)}</p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">Shipping Address</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={shippingAddress.name}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={shippingAddress.email}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={shippingAddress.city}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={handleInputChange}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
          </div>

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold text-gray-700">Total:</h2>
            <p className="text-2xl font-bold text-red-400">${cartTotal.toFixed(2)}</p>
          </div>

          <div className="mt-8">
            <button
              onClick={handleCheckout}
              className="w-full py-3 bg-neutral-500 text-white font-semibold rounded-lg hover:bg-gray-600"
            >
              Confirm and Pay
            </button>
            <Link href="/cart">
              <button className="w-full mt-4 py-3 bg-neutral-500 text-white font-semibold rounded-lg hover:bg-gray-600">
                Go Back to Cart
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
