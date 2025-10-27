import AddToCartButton from '@/components/AddToCartButton';

export default function ProductDetail({ product }) {
  if (!product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  const imageUrl = product.image || product.images?.[0] || '/placeholder.png';

  return (
    <div className="max-w-xl mx-auto p-4">
        <img
            src={imageUrl}
            alt={product.title || 'No title'}
            className="rounded-lg w-full h-auto"
        />
        <h1 className="text-2xl font-bold mt-4">{product.title}</h1>
        <p className="text-lg mt-2">${product.price}</p>

        <div className="mt-4">
            <AddToCartButton product={product} />
        </div>
    </div>
  );
}
