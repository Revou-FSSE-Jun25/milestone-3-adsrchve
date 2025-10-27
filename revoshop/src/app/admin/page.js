'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchProducts, deleteProduct } from '@/lib/api';

export default function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const data = await fetchProducts(50, 0);
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await deleteProduct(id);
    setProducts(products.filter(p => p.id !== id));
  };

  if (loading)
    return (
      <div className="container mx-auto px-4 py-16 text-center text-white">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0b1d35] text-white py-10 px-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Link
          href="/admin/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#102742] rounded-lg shadow-lg overflow-x-auto border border-blue-800">
        <table className="w-full">
          <thead className="bg-[#1b3458] text-blue-100 uppercase text-sm">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Image</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr
                key={product.id}
                className="border-b border-blue-900 hover:bg-[#19345A] transition"
              >
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">
                  <img
                    src={product.images?.[0] || product.image}
                    alt={product.title || product.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-4">{product.title || product.name}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">
                  {product.category?.name || product.category}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-400 hover:text-red-600 font-semibold transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
