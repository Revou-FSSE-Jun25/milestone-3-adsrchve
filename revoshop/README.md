# Revoshop - Next.js E-commerce Platform

A modern, fictional online store built with Next.js, showcasing fundamental concepts and data fetching strategies.

## 🎯 Project Overview

Revoshop is an educational e-commerce platform demonstrating Next.js fundamentals including:
- Server-Side Generation (SSG)
- Server-Side Rendering (SSR)
- API Routes
- Dynamic routing
- State management

## ✨ Features

### For Customers
- Browse products with a responsive grid layout
- View detailed product information
- Add products to shopping cart
- Interactive cart management
- Seamless checkout experience

### For Administrators
- Admin dashboard for product management
- Add new products
- Edit existing products
- Delete products
- Real-time product listing updates

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Language:** JavaScript/TypeScript
- **State Management:** React Context API
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/revoshop.git
cd revoshop
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
revoshop/
├── app/
│   ├── page.js                 # Home page (SSG)
│   ├── layout.js               # Root layout
│   ├── products/
│   │   └── [id]/
│   │       └── page.js         # Product detail (SSR)
│   ├── cart/
│   │   └── page.js             # Cart page
│   ├── admin/
│   │   ├── page.js             # Admin dashboard
│   │   └── add-product/
│   │       └── page.js         # Add product form
│   └── api/
│       └── products/
│           ├── route.js        # GET all, POST new
│           └── [id]/
│               └── route.js    # GET, PUT, DELETE by ID
├── components/
│   ├── ProductCard.js
│   ├── ProductGrid.js
│   ├── Navbar.js
│   ├── CartItem.js
│   └── AdminProductForm.js
├── context/
│   └── CartContext.js          # Global cart state
├── lib/
│   └── products.js             # Product data & utilities
└── public/
    └── images/                 # Product images
```

## 🔍 Key Implementation Details

### Data Fetching Strategies

#### Static Site Generation (SSG) - Home Page
The home page uses SSG to pre-render the product list at build time for optimal performance:
```javascript
// app/page.js
export default async function HomePage() {
  const products = await getProducts(); // Fetched at build time
  return <ProductGrid products={products} />;
}
```

#### Server-Side Rendering (SSR) - Product Detail
Product detail pages use SSR to fetch fresh data on each request:
```javascript
// app/products/[id]/page.js
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);
  return <ProductDetail product={product} />;
}
```

### API Routes

- `GET /api/products` - Fetch all products
- `POST /api/products` - Create new product (Admin)
- `GET /api/products/[id]` - Fetch single product
- `PUT /api/products/[id]` - Update product (Admin)
- `DELETE /api/products/[id]` - Delete product (Admin)

## 🎨 Features Breakdown

### Customer Features
1. **Product Browsing**: Grid layout with product cards
2. **Product Details**: Dedicated page with full information
3. **Cart Management**: Add/remove items, update quantities
4. **Responsive Design**: Mobile-friendly interface

### Admin Features
1. **Product Dashboard**: View all products
2. **Add Products**: Form to create new listings
3. **Edit Products**: Modify existing product details
4. **Delete Products**: Remove products from catalog

## 🌐 Deployment
### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://vercel.com)
3. Import your repository
4. Configure build settings (auto-detected for Next.js)
5. Deploy!

### Environment Variables

Create a `.env.local` file for local development:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

For production, set this in your Vercel dashboard.

## 👨‍💻 Author
Anindya Nitisara - [GitHub Profile](https://github.com/adsrchve)