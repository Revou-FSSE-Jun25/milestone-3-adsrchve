'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchProductById, updateProduct } from "@/lib/api";

export default function EditProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const data = await fetchProductById(id);
    setProduct(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await updateProduct(id, {
      title: formData.get("title"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      categoryId: formData.get("categoryId"),
      images: [formData.get("image") || product.images?.[0]],
    });
    alert("✅ Product updated!");
    router.push("/admin");
  };

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#1e2a47] flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg w-full max-w-xl text-black space-y-4">
        <h1 className="text-2xl font-bold">Edit Product</h1>

        <input name="title" defaultValue={product.title} required className="w-full p-2 border rounded" />
        <textarea name="description" defaultValue={product.description} required className="w-full p-2 border rounded" />
        <input name="price" type="number" step="0.01" defaultValue={product.price} required className="w-full p-2 border rounded" />
        <input name="image" placeholder="Image URL" defaultValue={product.images?.[0]} className="w-full p-2 border rounded" />
        <select name="categoryId" defaultValue={product.category?.id} required className="w-full p-2 border rounded">
          <option value="1">Clothes</option>
          <option value="2">Electronics</option>
          <option value="3">Furniture</option>
          <option value="4">Shoes</option>
          <option value="5">Others</option>
        </select>

        <button type="submit" className="w-full bg-[#1e2a47] hover:bg-[#162033] text-white py-2 rounded">
          Update Product
        </button>
      </form>
    </div>
  );
}
