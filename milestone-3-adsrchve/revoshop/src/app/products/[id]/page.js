import ProductClient from './ProductClient';

export const revalidate = 60;

export async function getProduct(id) {
  try {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error('Failed to fetch product ' + id);
    return await res.json();
  } catch (error) {
      console.error(error);
      return null;
  }
}

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="text-center text-red-500 mt-10">Product not found or failed to load!</div>
    )
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.images[0] || 'https://via.placeholder.com/600x600'}
        alt={product.title || 'Product Image'}
        className="w-full h-full object-cover rounded mb-4"
      />
      <p className="text-white mb-2">{product.description}</p>
      <p className="text-xl font-semibold mb-4">Price: ${product.price}</p>

      <ProductClient product={product} />
    </main>
  );
}
