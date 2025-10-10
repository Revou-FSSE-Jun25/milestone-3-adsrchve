'use client';

import { createContext, useContext, useState } from "react";
import { preconnect } from "react-dom";

const cartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }
            else {
                return [...prevCart, {...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }

        setCart(prevCart => prevCart.map(item => item.id === product.id? { ...item, quantity }: item));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const value = {
        cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount
    };

    return (
        <cartContext.Provider value={value}>{children}</cartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(cartContext);
    if(!context) {
        throw new Error('useCart must be used within a CardProvider');
    }
    return context;
}