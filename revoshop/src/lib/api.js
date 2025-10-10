// API Base URL
export const API_BASE_URL = 'https://api.escuelajs.co/api/v1'

// API Endpoints
export const ENDPOINTS = {
    products: `${API_BASE_URL}/products`,
    categories: `${API_BASE_URL}/categories`,
    users: `${API_BASE_URL}/users`,
};

// Fetch all products
export async function fetchProducts(limit = 50, offset = 0) {
    try {
        const response = await fetch(
            `${ENDPOINTS.products}?limit=${limit}&offset=${offset}`
        );

        if(!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        // Transform API data to match our component structure
        return data.map(product => ({
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.images[0] || 'https://placehold.co/600x400',
            images: product.images,
            category: product.category.name,
            categoryId: product.category.id,
            slug: product.slug,
            stock: Math.flooe(Math.random() * 100) + 1,
            createdAt: product.creationAt || new Date().toISOString()
        }));
    }   catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}


// Fetch single product by ID
export async function fetchProductById(id) {
    try {
        const response = await fetch(`${ENDPOINTS.products}/${id}`);

        if (!response.ok) {
            return null;
        }

        const product = await response.json();

        // Transform API data
        return {
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.images[0] || 'https://placehold.co/600x400',
            images: product.images,
            category: product.category.name,
            categoryId: product.category.id,
            slug: product.slug,
            stock: Math.flooe(Math.random() * 100) + 1,
            createdAt: product.creationAt || new Date().toISOString()
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

// Create new product
export async function createProduct(productData) {
    try {
        const response = await fetch(`${ENDPOINTS.products}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: productData.name,
                price: parseFloat(productData.price),
                description: productData.description,
                categoryId: parseInt(productData.categoryId) || 1,
                images: productData.images || ['https://placehold.co/600x400']
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create product');
        }

        const product = await response.json();

        return {
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.images[0],
            images: product.images,
            category: product.category.name,
            categoryId: product.category.id,
            slug: product.slug,
            stock: Math.flooe(Math.random() * 100) + 1,
            createdAt: product.creationAt
        };
    }   catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
}

// Update product
export async function updateProduct(id, productData) {
    try {
        const updateData = {};

        if (productData.name) updateData.name = productData.name;
        if (productData.price) updateData.price = parseFloat(productData.price);
        if (productData.description) updateData.description = productData.description;
        if (productData.categoryId) updateData.categoryId = parseInt(productData.categoryId);
        if (productData.images) updateData.images = productData.images;

        const response = await fetch(`${ENDPOINTS.products}/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateData)
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const product = await response.json();

        return {
            id: product.id.toString(),
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.images[0],
            images: product.images,
            category: product.category.name,
            categoryId: product.category.id,
            slug: product.slug,
            stock: Math.flooe(Math.random() * 100) + 1,
            createdAt: product.creationAt  
        };
    }   catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
}

// Delete product
export async function deleteProduct(id) {
    try {
        const response = await fetch(`${ENDPOINTS.products}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error deleting product:', error);
        };

        return await response.json();
    }   catch (error) {
        console.error('Error deleting product:', error);
        return false;
    }
}

// Fetch categories
export async function fetchCategories() {
    try {
        const response = await fetch(`${ENDPOINTS.categories}`);

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }

        return await response.json();
    }   catch (error) {
        console.error('Error fetching categories:', error);
        return[];
    }
}