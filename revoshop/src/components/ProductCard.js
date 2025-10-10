'use client';

import Link from 'next/link';

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
            <Link href={`/products/${product.id}`}>
                <div className="relative h-64 bg-gray-200">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Product'}}/>

                    {product.stock < 10 && product.stock > 0 && (
                        <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                            Only {product.stock} left
                        </span>
                    )}

                    <span className="absolute top-2 left-2 bg-white/90 text-gray-700 text-xs px-2 py-1 rounded">{product.category}</span>
                </div>
            </Link>

            <div className="p-4 flex-grow flex flex-col">
                <Link href={`/products/${product.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">{product.name}</h3>
                </Link>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>

                <div className="mt-auto">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
                        <span className="text-xs text-gray-500">${product.stock > 0 ? 'In Stock' : 'Out'}</span>
                    </div>

                    <Link href={`/products/${product.id}`} className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">View Product</Link>
                </div>
            </div>
        </div>
    );
}