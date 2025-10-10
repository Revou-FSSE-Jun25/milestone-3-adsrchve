'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/api';

export default function AddProductPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    await createProduct({
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      categoryId: formData.get('categoryId'),
      images: ['https://placehold.co/600x400']
    });

    alert('Product added!');
    router.push('/admin');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-6">
        <div>
          <label className="block font-medium mb-2">Product Name *</label>
          <input name="name" required className="w-full border px-4 py-2 rounded-lg" />
        </div>

        <div>
          <label className="block font-medium mb-2">Description *</label>
          <textarea name="description" required rows="4" className="w-full border px-4 py-2 rounded-lg" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Price *</label>
            <input name="price" type="number" step="0.01" required className="w-full border px-4 py-2 rounded-lg" />
          </div>

          <div>
            <label className="block font-medium mb-2">Category *</label>
            <select name="categoryId" required className="w-full border px-4 py-2 rounded-lg">
              <option value="1">Clothes</option>
              <option value="2">Electronics</option>
              <option value="3">Furniture</option>
              <option value="4">Shoes</option>
              <option value="5">Others</option>
            </select>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}