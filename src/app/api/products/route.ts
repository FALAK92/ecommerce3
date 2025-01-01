import {  NextResponse } from 'next/server';
export async function GET(){
const products = [
  // Winter Collection
  {
    id: 1,
    category: 'Winter Collection',
    name: 'Woolen Jacket',
    price: 120,
    image: '/p1.jpg',
    description: 'A warm and stylish woolen jacket for winter.',
    discount:20,
  },
  {
    id: 2,
    category: 'Winter Collection',
    name: 'Knitted Scarf',
    price: 40,
    image: '/p2.webp',
    description: 'Soft and cozy knitted scarf to keep you warm.',
    discount:10,
  },
  {
    id: 3,
    category: 'Winter Collection',
    name: 'Thermal Gloves',
    price: 25,
    image: '/p3.webp',
    description: 'Keep your hands warm with these thermal gloves.',
    discount:15,
  },

  // Accessories
  {
    id: 4,
    category: 'Accessories',
    name: 'Leather Wallet',
    price: 30,
    image: '/p4.webp',
    description: 'A premium leather wallet for daily use.',
    discount:3,
  },
  {
    id: 5,
    category: 'Accessories',
    name: 'Sunglasses',
    price: 50,
    image: '/p5.jpg',
    description: 'Stylish sunglasses with UV protection.',
    discount:5,
  },
  {
    id: 6,
    category: 'Accessories',
    name: 'Wrist Watch',
    price: 150,
    image: '/p6.webp',
    description: 'A classic wrist watch with a modern touch.',
    discount:8,
  },

  // Footwear
  {
    id: 7,
    category: 'Footwear',
    name: 'Running Shoes',
    price: 80,
    image: '/p7.avif',
    description: 'Lightweight and comfortable running shoes.',
    discount:2,
  },
  {
    id: 8,
    category: 'Footwear',
    name: 'Formal Shoes',
    price: 100,
    image: '/p8.jpg',
    description: 'Elegant formal shoes for office wear.',
    discount:1,
  },
  {
    id: 9,
    category: 'Footwear',
    name: 'Sneakers',
    price: 70,
    image: '/p9.webp',
    description: 'Trendy sneakers for everyday casual wear.',
    discount:3,
  },

  // Summer Collection
  {
    id: 10,
    category: 'Summer Collection',
    name: 'Cotton T-Shirt',
    price: 20,
    image: '/p10.jpg',
    description: 'Breathable cotton t-shirt for summer days.',
    discount:20,
  },
  {
    id: 11,
    category: 'Summer Collection',
    name: 'Shorts',
    price: 25,
    image: '/p11.jpeg',
    description: 'Comfortable shorts perfect for hot weather.',
    discount:2,
  },
  {
    id: 12,
    category: 'Summer Collection',
    name: 'Floral Dress',
    price: 60,
    image: '/p12.jpg',
    description: 'A lightweight floral dress for summer vibes.',
    discount:2,
  },

];


return NextResponse.json(products);
}


