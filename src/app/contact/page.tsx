"use client";

import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Importing React Icons

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real scenario, you would send the form data to your backend or API
    setFormStatus("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        {/* Page Title */}
        <h1 className="text-4xl font-extrabold text-neutral-500 text-center mb-8">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-neutral-500 mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-500 mb-4">
              Feel free to reach out to us for any inquiries. We &apos; re here to help!
            </p>

            <div className="space-y-6">
              <div className="flex items-center text-gray-500">
                <FaMapMarkerAlt className="text-2xl mr-4" />
                <p>123 Street Name, City, Country</p>
              </div>

              <div className="flex items-center text-gray-500">
                <FaPhoneAlt className="text-2xl mr-4" />
                <p>(123) 456-7890</p>
              </div>

              <div className="flex items-center text-gray-500">
                <FaEnvelope className="text-2xl mr-4" />
                <p>info@yourcompany.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-semibold text-neutral-500 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-500 font-semibold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-500 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-500 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={4}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-600 text-white py-3 rounded-lg hover:bg-neutral-700 transition"
              >
                Send Message
              </button>
            </form>

            {formStatus && (
              <p className="text-green-900 text-center mt-4">{formStatus}</p>
            )}
          </div>
        </div>

        {/* Google Map Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-neutral-500 mb-6 text-center">
            Our Location
          </h2>
          <div className="w-full h-72 overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.268314634798!2d-0.11809223503179625!3d51.50986533913558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b3f42811b33%3A0xeeb79c44d840e600!2sBig%20Ben!5e0!3m2!1sen!2sus!4v1689703952015!5m2!1sen!2sus"
              className="w-full h-full border-0"
              title="Map Location"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
