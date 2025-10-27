import ProductDetail from '@/components/ProductDetail';

export default async function ProductPage({ params }) {
    const res = await fetch(`https://api.escuelajs.co/api/v1/products/${params.id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch product');
    }

    const product = await res.json();

    return <ProductDetail product={product} />;
    }
