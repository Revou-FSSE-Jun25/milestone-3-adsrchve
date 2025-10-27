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

    try {
      const formData = new FormData(e.target);
      await createProduct({
        name: formData.get('name'),
        description: formData.get('description'),
        price: parseFloat(formData.get('price')),
        categoryId: formData.get('categoryId'),
        images: ['https://placehold.co/600x400'],
      });

      alert('✅ Product successfully added!');
      router.push('/admin');
    } catch (error) {
      console.error(error);
      alert('❌ Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2a47] flex items-center justify-center px-4 py-12">
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-black text-center">
          Add New Product
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 text-black">
          <div>
            <label className="block font-medium mb-2 text-black">
              Product Name *
            </label>
            <input
              name="name"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#1e2a47] focus:outline-none text-black"
            />
          </div>

          <div>
            <label className="block font-medium mb-2 text-black">
              Description *
            </label>
            <textarea
              name="description"
              required
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#1e2a47] focus:outline-none text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2 text-black">
                Price *
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#1e2a47] focus:outline-none text-black"
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-black">
                Category *
              </label>
              <select
                name="categoryId"
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#1e2a47] focus:outline-none text-black"
              >
                <option value="">-- Select Category --</option>
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
            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#1e2a47] hover:bg-[#162033]'
            }`}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
}
