"use client";

import React from "react";
import { FaTruck, FaThumbsUp, FaHeadset } from "react-icons/fa";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div className="bg-neutral-50 p-6 min-h-screen ">
      <div className="max-w-screen-xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-neutral-500 text-center mb-8">
          About Us
        </h1>

        {/* Company Overview Section */}
        <div className="bg-neutral-100 shadow-lg rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-gray-500 mb-6 text-center">
            Our Story
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="w-full">
              <Image
                src="/about.jpg"
                alt="About Us"
                width={800}
                height={500}
                className="w-full h-auto rounded-lg shadow-lg "
              />
            </div>
            <div className="w-full md:w-1/2 text-gray-400">
              <p className="text-lg mb-4">
                Welcome to E-Shop! We are an e-commerce platform dedicated to offering
                high-quality products for your everyday needs. Our mission is to provide an
                exceptional online shopping experience that combines convenience, reliability, and
                customer satisfaction.
              </p>
              <p className="text-lg">
                Whether you're looking for the latest fashion trends, innovative gadgets, or
                premium home accessories, we have it all. Our carefully curated collection ensures
                that you get only the best products at competitive prices.
              </p>
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <section className="bg-neutral-100 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-semibold text-neutral-500 mb-6 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <FaTruck className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Fast Delivery</h3>
              <p className="text-gray-400">
                We ensure timely deliveries, so you can get your products when you need them.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <FaThumbsUp className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Quality Products</h3>
              <p className="text-gray-400">
                Our products go through strict quality checks to ensure they meet high standards.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-4">
                <FaHeadset className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">Customer Support</h3>
              <p className="text-gray-400">
                Our dedicated support team is available 24/7 to assist you with any inquiries.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
