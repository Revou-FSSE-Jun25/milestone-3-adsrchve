import { updateProduct } from "@/lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCart = create(
    persist(
        (set, get) => ({
            cart: [],
            totalPrice: 0,

            addToCart: (item) => {
                const existingItem = get().cart.find((i) => i.id === item.id);
                let updatedCart;
                
                if (existingItem) {
                    updatedCart = get().cart.map((i) =>
                        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    );
                }
                else {
                    updatedCart = [...get().cart, { ...item, quantity: 1 }];
                }

                set({
                    cart: updatedCart,
                    totalPrice: updatedCart.reduce(
                        (sum, i) => sum + i.price * i.quantity,
                        0
                    ),
                });
            },

            decreaseQuantity: (productId) => {
                const currentItem = get().cart.find((item) => item.id === productId);
                if(!currentItem) return;

                if(currentItem.quantity === 1) {
                    const confirmDelete = window.confirm(
                        "Mengurangi hingga 0 akan menghapus item. Apakah Anda yakin?"
                    );
                    if(!confirmDelete) return;
                }

                const updatedCart = get().cart
                    .map((item) => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
                    .filter((item) => item.quantity > 0);

                set({
                    cart: updatedCart,
                    totalPrice: updatedCart.reduce(
                        (sum, i) => sum + i.price * i.quantity,
                        0
                    ),
                });
            },

            removeFromCart: (id) => {
                const confirmDelete = window.confirm(
                    "Apakah Anda yakin ingin menghapus item dari keranjang?"
                );
                if(!confirmDelete) return;

                const updatedCart = get().cart.filter((item) => item.id !== id);

                set({
                    cart: updatedCart,
                    totalPrice: updatedCart.reduce((sum, i) => sum + i.price * i.quantity,
                        0
                    )
                });
            },

            updateQuantity: (id, quantity) => {
                const updatedCart = get().cart.map((i) =>
                    i.id === id ? { ...i, quantity } : i
                );
                set({
                    cart: updatedCart,
                    totalPrice: updatedCart.reduce(
                        (sum, i) => sum + i.price * i.quantity,
                        0
                    ),
                });
            },

            clearCart: () => set({ cart: [], totalPrice: 0 }),
            
            getCartCount: () => {
                return get().cart.reduce((sum, item) => sum + item.quantity, 0);
            },

            getCartTotal: () => {
                return get().cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
        }),
        { name: "cart-storage" }
    )
);