import Link from "next/link";

export const revalidate = 60;

async function getCategory(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch category " + id);
  return res.json();
}

async function getCategoryProducts(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}/products`, {
    next: { revalidate: 60 },
  });
  if(!res.ok) throw new Error("Failed to fetch products for category " + id);
  return res.json();
}

export default async function CategoryPage({ params }) {
  const { id } = params;

  const [category, products] = await Promise.all([
    getCategory(id),
    getCategoryProducts(id),
  ]);

  return (
    <main className="p-8 mt-4 mb-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <h2 className="text-xl font:semi-bold text-white mb-6">Category: {category.name}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="border rounded-lg p-4 bg-white flex flex-col justify-between h-full transition-transform duration-300
                            hover:-translate-y-2 hover:shadow-xl relative group">
              <img
                src={product.images[0] || "https://via.placeholder.com/600x400"}
                alt={product.title || "Product Image"}
                className="w-full h-full object-cover rounded mb-2"
              />
              <h2 className="text-black font-semibold mb-1">
                {product.title || "No Name"}
              </h2>
              <p className="text-gray-600 flex-grow mb-2">
                {product.description
                  ? product.description.substring(0, 60) + "..."
                  : "No description available"}
              </p>
              <p className="text-left text-black font-medium">Price: ${product.price}</p>

              <span className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-gray-700"> ➜ </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
