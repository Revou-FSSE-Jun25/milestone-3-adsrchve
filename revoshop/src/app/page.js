import Link from "next/link";

export const revalidate = 60;

async function getProducts() {
  const res = await fetch("https://api.escuelajs.co/api/v1/products", {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <div className="border rounded-lg p-4 hover:shadow-lg">
              <img src={product.images[0]} alt={product.title} />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
