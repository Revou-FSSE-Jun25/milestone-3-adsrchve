'use client';

import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

export default function ProductClient({ product }) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const inCart = cart.find(item => item.id === product.id);
    setAdded(!!inCart);
  }, [cart, product.id]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      quantity: 1,
      image: product.images[0] || 'https://via.placeholder.com/600x400',
    });
    setAdded(true);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`py-2 px-4 rounded font-semibold ${
        added ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {added ? 'Added to Cart!' : 'Add to Cart'}
    </button>
  );
}
