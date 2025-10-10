import { fetchProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

// SSG
export default async function HomePage() {
  const products = await fetchProducts(24, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to Revoshop</h1>
          <p className="text-xl mb-8">Discover amazing product here.</p>
          <Link href="#products" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">Shop Now</Link>
          <p className="text-sm mt-4 text-blue-200">This page use SSG</p>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}