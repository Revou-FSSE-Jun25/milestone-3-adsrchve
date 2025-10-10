// app/products/[id]/page.jsx
async function getProduct(id) {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
    cache: "no-store", // penting: biar SSR
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function ProductDetail({ params }) {
  const product = await getProduct(params.id);

  return (
    <main className="p-8">
      <div className="grid md:grid-cols-2 gap-6">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full rounded-lg"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-500 mb-4">${product.price}</p>
          <p className="mb-6">{product.description}</p>
          <button className="bg-black text-white px-6 py-3 rounded-md">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}
