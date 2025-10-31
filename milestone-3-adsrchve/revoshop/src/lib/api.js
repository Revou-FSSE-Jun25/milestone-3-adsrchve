// src/lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
const LOCAL_API = `${API_BASE_URL}/api/products`;
const LOCAL_CATEGORY_API = `${API_BASE_URL}/api/categories`;

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
    categoryId: product.category?.id || product.categoryId || null,
    slug:
      product.slug ||
      product.name?.toLowerCase().replace(/\s+/g, '-') ||
      'product',
    stock: Math.floor(Math.random() * 100) + 1,
    createdAt: product.creationAt || new Date().toISOString(),
  };
}

// 🔹 Fetch all products (local route)
export async function fetchProducts() {
  try {
    const res = await fetch(LOCAL_API);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data = await res.json();
    return data.map(normalizeProduct);
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// 🔹 Fetch single product
export async function fetchProductById(id) {
  try {
    const res = await fetch(`${LOCAL_API}/${id}`);
    if (!res.ok) return null;
    const product = await res.json();
    return normalizeProduct(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// 🔹 Create new product
export async function createProduct(productData) {
  try {
    const res = await fetch(LOCAL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: productData.name,
        price: Number(productData.price),
        description: productData.description,
        categoryId: Number(productData.categoryId) || 1,
        images:
          typeof productData.images === 'string'
            ? productData.images.split(',').map((i) => i.trim())
            : productData.images || ['https://placehold.co/600x400'],
      }),
    });

    if (!res.ok) throw new Error('Failed to create product');
    const product = await res.json();
    return normalizeProduct(product);
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// 🔹 Update product
export async function updateProduct(id, productData) {
  try {
    const res = await fetch(`${LOCAL_API}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: productData.name,
        price: Number(productData.price),
        description: productData.description,
        categoryId: Number(productData.categoryId),
        images:
          typeof productData.images === 'string'
            ? productData.images.split(',').map((i) => i.trim())
            : productData.images,
      }),
    });

    if (!res.ok) throw new Error('Failed to update product');
    const product = await res.json();
    return normalizeProduct(product);
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
}

// 🔹 Delete product
export async function deleteProduct(id) {
  try {
    const res = await fetch(`${LOCAL_API}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete product');
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
}

// 🔹 Fetch categories
export async function fetchCategories() {
  try {
    const res = await fetch(LOCAL_CATEGORY_API);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return await res.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
