"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Exclusive Winter Collection",
    subtitle: "Up to 50% Off on All Winter Wear",
    image: "/b1.jpg", // Replace with your image URL
  },
  {
    id: 2,
    title: "Trendy Accessories",
    subtitle: "Upgrade Your Style Game Today",
    image: "/b2.jpg", // Replace with your image URL
  },
  {
    id: 3,
    title: "Footwear Fiesta",
    subtitle: "Flat 40% Off on All Shoes",
    image: "/b3.avif", // Replace with your image URL
  },
];

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to handle slide change
  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

  return (
    <div className="relative w-full h-[400px] lg:h-[600px] overflow-hidden">
      {/* Slides */}
      <div className="w-full h-full flex">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
              index === currentSlide ? "opacity-50" : "opacity-0"
            }`}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{
              opacity: index === currentSlide ? 1 : 0,
              x: index === currentSlide ? 0 : "-100%",
            }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
            />
            {/* Text Content */}
            <div className="absolute inset-0  flex flex-col items-center justify-center text-purple-600 p-4 text-center">
              <motion.h1
                className="text-4xl lg:text-6xl font-bold"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-lg lg:text-2xl mt-4"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                {slide.subtitle}
              </motion.p>
              <Link href='/products'>
              <motion.button
                className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-600 transition-all"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                Shop Now
              </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition-all"
        onClick={prevSlide}
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-3 rounded-full shadow-lg hover:scale-110 transition-all"
        onClick={nextSlide}
      >
        &#8250;
      </button>
    </div>
  );
}
