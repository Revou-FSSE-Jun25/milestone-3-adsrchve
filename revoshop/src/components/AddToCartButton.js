'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title || product.name,
      price: product.price,
      image: product.images?.[0] || product.image,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const isOutOfStock = product?.stock === 0; // tetap support kalo ada field stock

  return (
    <button
      onClick={handleAddToCart}
      disabled={isOutOfStock || added}
      className={`w-full py-3 mt-4 rounded-lg font-semibold text-lg transition duration-200
        ${isOutOfStock
          ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
          : added
          ? 'bg-green-600 text-white'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'}
      `}
    >
      {isOutOfStock
        ? 'Out of Stock'
        : added
        ? 'Added to Cart!'
        : 'Add to Cart'}
    </button>
  );
}
