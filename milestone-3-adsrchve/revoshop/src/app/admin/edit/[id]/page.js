'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchProductById, updateProduct } from "@/lib/api";

export default function EditProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);``
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await fetchProductById(id);

      if (!data || data.statusCode === 404) {
        console.error("Product not found");
        setProduct(null);
      } else {
        setProduct(data);
      }
    } catch (err) {
      console.error("Error fetching product:", err);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updatedProduct = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      categoryId: formData.get("categoryId"),
      images: [formData.get("image") || product.images?.[0]],
    };

    try {
      await updateProduct(id, updatedProduct);
      alert("✅ Product updated!");
      router.push("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to update product. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-white text-center py-20">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-red-500 text-center py-20">
        Product not found or failed to load.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e2a47] flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg w-full max-w-xl text-black space-y-4"
      >
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            name="title"
            defaultValue={product.title || product.name}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={product.description}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product.price}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            name="image"
            placeholder="Image URL"
            defaultValue={product.images?.[0]}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="categoryId"
            defaultValue={product.category?.id || 1}
            required
            className="w-full p-2 border rounded"
          >
            <option value="1">Clothes</option>
            <option value="2">Electronics</option>
            <option value="3">Furniture</option>
            <option value="4">Shoes</option>
            <option value="5">Others</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1e2a47] hover:bg-[#162033] text-white py-2 rounded font-semibold"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
