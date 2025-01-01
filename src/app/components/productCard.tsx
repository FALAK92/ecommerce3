"use client";

import React, { useEffect, useState } from "react";
import { HeartIcon, ArrowUpIcon, ShareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Product {
  id: number;
  category: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}
const addToCart = (product: Product) => {
  if (typeof window === "undefined") return; // Ensure we're in the browser
  
  // Retrieve the existing cart from localStorage
  const storedCart = localStorage.getItem("cart");
  const cart = storedCart ? JSON.parse(storedCart) : [];
  
  // Check if the product already exists in the cart
  const existingItem = cart.find((item: CartItem) => item.id === product.id);
  
  if (existingItem) {
    // Increase quantity if the item already exists
    existingItem.quantity += 1;
  } else {
    // Add new product to the cart
    cart.push({ ...product, quantity: 1 });
  }
  
  // Save updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  
  alert(`${product.name} added to the cart!`);
};


const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await response.json();
        setProducts(data);
        setVisibleProducts(data.slice(0, 6)); // Initially show first 6 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleShowMore = () => {
    if (showAll) {
      setVisibleProducts(products.slice(0, 9)); // Reset to 9 products
    } else {
      setVisibleProducts(products); // Show all products
    }
    setShowAll(!showAll);
  };

  // const addToCart = (product: Product) => {
  //   if (typeof window === "undefined") return; // Ensure we're in the browser
    
  //   // Retrieve the existing cart from localStorage
  //   const storedCart = localStorage.getItem("cart");
  //   const cart = storedCart ? JSON.parse(storedCart) : [];
    
  //   // Check if the product already exists in the cart
  //   const existingItem = cart.find((item: CartItem) => item.id === product.id);
    
  //   if (existingItem) {
  //     // Increase quantity if the item already exists
  //     existingItem.quantity += 1;
  //   } else {
  //     // Add new product to the cart
  //     cart.push({ ...product, quantity: 1 });
  //   }
    
  //   // Save updated cart back to localStorage
  //   localStorage.setItem("cart", JSON.stringify(cart));
    
  //   alert(`${product.name} added to the cart!`);
  // };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-neutral-500 mb-8 text-center">
        Explore Our Collections
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 relative"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.description}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-red-400 text-white text-xs font-semibold rounded-full px-3 py-1">
                {product.discount}% OFF
              </div>
              {/* Hover Icons */}
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 flex justify-end p-4 gap-2 items-start transition-opacity duration-300">
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-pink-200 scale-110 transition-transform">
                  <ShareIcon className="h-5 w-5 text-gray-700" />
                </button>
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-pink-200 scale-110 transition-transform">
                  <ArrowUpIcon className="h-5 w-5 text-gray-700" />
                </button>
                <button className="bg-white p-2 rounded-full shadow-md hover:bg-pink-200 scale-110 transition-transform">
                  <HeartIcon className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
            {/* Product Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-500">{product.name}</h3>
              <p className="text-gray-400 line-through text-sm">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-red-400 font-bold text-lg">
                ${((product.price * (100 - product.discount)) / 100).toFixed(2)}
              </p>

              <Link href="/cart">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-2 bg-neutral-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600 transition"
                >
                  Add to Cart
                </button>
              </Link>

              {/* View Details Button */}
              <Link href={`/products/${product.id}`}>
                <button className="w-full mt-2 bg-neutral-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-600 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={toggleShowMore}
          className="px-6 py-2 bg-neutral-500 text-white rounded-lg hover:bg-gray-600 transition"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;













