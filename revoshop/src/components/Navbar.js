'use client';

import Link from "next/link";
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

export default function Navbar() {
    const { getCartCount } = useCart();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartCount = getCartCount();

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex-items-center space-x-2">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                            <svg href="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            REVOSHOP
                        </span>
                    </Link>

                    <div className="hidden md:flex items:center space-x-4">
                        <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                            Admin
                        </Link>
                            <Link href="/cart" className="relative text-gray-700 hover:text-blue-600 font-medium flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Cart
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                                {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="md:hidden pb-4">
                        <Link href="/" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                        <Link href="/admin" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
                        <Link href="/cart" className="block py-2" onClick={() => setMobileMenuOpen(false)}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};