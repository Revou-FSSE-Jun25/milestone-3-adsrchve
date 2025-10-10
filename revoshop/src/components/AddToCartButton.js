'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function AddToCartButton({ product }) {
    const { addToCart } = useCart();
    const [addCart, setAddCart] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setAddCart(true);
        setTimeout(() => setAddCart(false), 2000);
    };

    return (
        <button onClick={handleAddToCart} disabled={product.stock === 0 || addCart}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition ${product.stock === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : addCart ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
            {product.stock === 0 ? 'Out of Stock' : addCart ? 'Added to Cart!' : 'Add to Cart'}
        </button>
    );
}