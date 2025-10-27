import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Revoshop',
  description: 'Your online store for everything you love',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 flex flex-col min-h-screen`}
      >
        <CartProvider>
          {/* Wrapper utama */}
          <div className="flex flex-col min-h-screen">
            {/* Navbar */}
            <header className="sticky top-0 z-50 bg-white shadow-sm">
              <Navbar />
            </header>

            {/* Konten utama */}
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>

            {/* Footer */}
            <footer className="mt-auto bg-gray-100 border-t">
              <Footer />
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
