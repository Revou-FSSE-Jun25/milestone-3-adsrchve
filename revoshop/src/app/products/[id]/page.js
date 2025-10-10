import { fetchProductById } from "@/lib/api";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";

// SSR
export const dynamic = 'force-dynamic';

export default async function ProductDetailPage({ params }) {
    const product = await fetchProductById(params.id);

    if (!product) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block"> ← Back to Products </Link>

            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                🔄 This page uses SSR - Data fetched on every request
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg" onError={(e) => {e.target.src = 'https://placehold.co/600x400'}}/>
                </div>

                <div>
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                    <p className="text-3xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>
                    
                    <div className="mb-6">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">{product.category}</span>
                    </div>

                    <p className="text-gray-700 mb-6">{product.description}</p>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <h3 className="font-bold mb-2">Product Details</h3>
                        <ul className="space-y-2 text-sm">
                            <li>ID: {product.id}</li>
                            <li>Category: {product.category}</li>
                            <li>Stock: {product.stock} units</li>
                        </ul>
                    </div>

                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
}