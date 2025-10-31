'use client';
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container">
                <h1
            </div>
        )
    }
}