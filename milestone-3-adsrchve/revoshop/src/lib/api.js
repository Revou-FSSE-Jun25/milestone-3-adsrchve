// API Base URL
export const API_BASE_URL = 'https://api.escuelajs.co/api/v1';

// API Endpoints
export const ENDPOINTS = {
    products: `${API_BASE_URL}/products`,
    categories: `${API_BASE_URL}/categories`,
    users: `${API_BASE_URL}/users`,
};

// Transform product to consistent shape
function normalizeProduct(product) {
    return {
        id: product.id?.toString() || '',
        name: product.name || 'Unnamed Product',
        description: product.description || 'No description available',
        price: Number(product.price) || 0,
        image: product.images?.[0] || 'https://placehold.co/600x400',
        images: product.images || ['https://placehold.co/600x400'],
        category: product.category?.name || 'Uncategorized',
        categoryId: product.category?.id || null,
        slug: product.slug || product.name?.toLowerCase().replace(/\s+/g, '-') || 'product',
        stock: Math.floor(Math.random() * 100) + 1,
        createdAt: product.creationAt || new Date().toISOString(),
    };
}

// Fetch all products
export async function fetchProducts(limit = 50, offset = 0) {
    try {
        const response = await fetch(`${ENDPOINTS.products}?limit=${limit}&offset=${offset}`);
        if (!response.ok) throw new Error('Failed to fetch products');

        const data = await response.json();
        return data.map(normalizeProduct);
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Fetch single product by ID
export async function fetchProductById(id) {
    try {
        const response = await fetch(`${ENDPOINTS.products}/${id}`);
        if (!response.ok) return null;

        const product = await response.json();
        return normalizeProduct(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Create new product
export async function createProduct(productData) {
    try {
        const response = await fetch(ENDPOINTS.products, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: productData.name,
            price: Number(productData.price),
            description: productData.description,
            categoryId: Number(productData.categoryId) || 1,
            images: productData.images || ['https://placehold.co/600x400'],
        }),
        });

        if (!response.ok) throw new Error('Failed to create product');

        const product = await response.json();
        return normalizeProduct(product);
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

// Update product
export async function updateProduct(id, productData) {
    try {
        const response = await fetch(`${ENDPOINTS.products}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: productData.name,
            price: Number(productData.price),
            description: productData.description,
            categoryId: Number(productData.categoryId),
            images: productData.images,
        }),
        });

        if (!response.ok) throw new Error('Failed to update product');

        const product = await response.json();
        return normalizeProduct(product);
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

// Delete product
export async function deleteProduct(id) {
    try {
        const response = await fetch(`${ENDPOINTS.products}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete product');
        return true;
    } catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
}

// Fetch categories
export async function fetchCategories() {
    try {
        const response = await fetch(ENDPOINTS.categories);
        if (!response.ok) throw new Error('Failed to fetch categories');
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}
