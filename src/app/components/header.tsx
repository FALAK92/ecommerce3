"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaUser, FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    // LocalStorage se cart ka data fetch karna
    const storedCart = localStorage.getItem("cart");
    const cart = storedCart ? JSON.parse(storedCart) : [];

    // Cart me total items ka count calculate karna
    const totalItems = cart.reduce(
      (count: number, item: { quantity: number }) => count + item.quantity,
      0
    );

    setCartCount(totalItems);
  }, [cartCount]);


  return (
    <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-24 py-4 bg-white text-black h-[100px] shadow-md relative">
      {/* Logo Section (Left aligned) */}
      <div className="flex items-center justify-start space-x-4">
        <Link href="/">
          <h1 className="text-3xl font-bold cursor-pointer text-gray-800">
            E-Shop
          </h1>
        </Link>
      </div>

      {/* Desktop Menu (Center aligned) */}
      <ul className="hidden md:flex space-x-[72px] flex-grow justify-center">
        <li>
          <Link
            href="/"
            className="text-black hover:text-gray-600 font-medium text-[20px]"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="text-black hover:text-gray-600 font-medium text-[20px]"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="text-black hover:text-gray-600 font-medium text-[20px]"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-black hover:text-gray-600 font-medium text-[20px]"
          >
            Contact
          </Link>
        </li>
      </ul>

      {/* Desktop Icons Section (Right aligned) */}
      <div className="hidden md:flex space-x-[30px] items-center">
        
          <FaUser size={28} className="hover:text-gray-600" />
        
        <FaSearch size={28} className="hover:text-gray-600" />
        <FaHeart size={28} className="hover:text-gray-600" />
        <button onClick={toggleCart}>
          <Link href="/cart">
          <FaShoppingCart size={28} className="hover:text-gray-600" />
          <span className="absolute top-4 right-5 mr-16 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {cartCount}
            </span>

          </Link>
        </button>
      </div>
      {/* Mobile Menu Icon (Toggles on Mobile) */}
      <button className="block md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? "X" : <FaBars size={28} />}
      </button>

      {/* Mobile Menu (Mobile version) */}
      {isMenuOpen && (
        <ul className="absolute top-[100px] left-0 w-full bg-[#FFF3E3] flex flex-col space-y-4 px-6 py-4 z-50 shadow-md md:hidden">
          <li>
            <Link
              href="/"
              className="text-black hover:text-gray-600 font-medium text-[16px]"
              onClick={toggleMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-black hover:text-gray-600 font-medium text-[16px]"
              onClick={toggleMenu}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="text-black hover:text-gray-600 font-medium text-[16px]"
              onClick={toggleMenu}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-black hover:text-gray-600 font-medium text-[16px]"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </li>
          {/* Icons Section in Mobile */}
          <div className="flex space-x-[30px] justify-end">
            
              <FaUser size={24} className="hover:text-gray-600" />
          
            <FaSearch size={24} className="hover:text-gray-600" />
            <FaHeart size={24} className="hover:text-gray-600" />
            <button onClick={toggleCart}>
              <Link href="/cart">
              <FaShoppingCart size={24} className="hover:text-gray-600" />
              <span className="absolute top-17 right-3 bottom-9  bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {cartCount}
            </span>
              </Link>
            </button>
          </div>
        </ul>
      )}
    </div>
  );
}

export default Navbar;

