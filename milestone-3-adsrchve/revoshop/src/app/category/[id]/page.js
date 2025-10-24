import Link from "next/link";

export const revalidate = 60;

async function getCategoryProducts(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products for category " + id);
  return res.json();
}

export default async function CategoryPage({ params }) {
  const products = await getCategoryProducts(params.id);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg bg-white">
              <img
                src={product.images[0] || "https://via.placeholder.com/600x400"}
                alt={product.title || "Product Image"}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-black font-semibold mb-1">
                {product.title || "No Name"}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {product.description
                  ? product.description.substring(0, 60) + "..."
                  : "No description available"}
              </p>
              <p className="text-gray-700 font-medium">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
