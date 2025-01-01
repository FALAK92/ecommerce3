"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeftIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  category: string;
  name: string;
  image: string;
  price: number;
  discount: number;
  description: string;
}

const ProductDetail: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {id} = useParams();

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products`);
        if (!response.ok) throw new Error("Failed to fetch product data");
        const data: Product[] = await response.json();

        // Find the product by ID
        const product = data.find((item) => item.id === parseInt(id as string));
        setProduct(product || null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found!</div>;
  }

  const discountedPrice = (
    product.price *
    (100 - product.discount)
  ) / 100;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        Go Back
      </button>

      {/* Product Details */}
      <div className="flex flex-col md:flex-row items-start gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <Image
            src={product.image}
            alt={product.description}
            className="w-full rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-gray-400 line-through text-sm">
            Original Price: ${product.price.toFixed(2)}
          </p>
          <p className="text-red-500 font-bold text-xl mb-4">
            Discounted Price: ${discountedPrice.toFixed(2)}
          </p>

          {/* Add to Cart Button */}
          <Link href= "/cart">
          <button
            className="bg-neutral-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-600 transition"
          >
            <ShoppingCartIcon className="h-5 w-5" />
            Add to Cart
          </button>
          </Link>

          {/* Product Category */}
          <p className="mt-6 text-sm text-gray-500">Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;




