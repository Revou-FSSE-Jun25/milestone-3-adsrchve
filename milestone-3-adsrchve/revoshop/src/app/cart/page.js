'use client';
import { useCart } from "@/store/cartStore";
import Link from 'next/link';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-black">
        <h1 className="text-3xl text-white font-bold mb-2">Your cart is empty!</h1>
        <p className="text-white mb-10">Let's continue shopping and put your items in the cart.</p>
        <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold text-white mt-4 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow mb-4">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />

              <div className="flex-grow">
                <h3 className="font-bold text-black">{item.name}</h3>
                <p className="text-gray-700">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-12 text-center text-black">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-bold text-black">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-600 text-sm mt-2 hover:underline"
                > Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow h-fit text-black">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (10%):</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mb-2 hover:bg-blue-700">
            Checkout
          </button>
          <button onClick={clearCart} className="w-full text-red-600 hover:underline">
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
