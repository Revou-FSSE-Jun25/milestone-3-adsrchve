// src/components/CartPage.js
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, clearCart, totalPrice } = useCart();

  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-2">
          <div>
            {item.name} x {item.quantity}
          </div>
          <div>
            ${item.price * item.quantity}{' '}
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 ml-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <hr className="my-4" />
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>
      <button
        onClick={() => alert('Checkout success!')}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Checkout
      </button>
      <button
        onClick={clearCart}
        className="mt-2 ml-2 bg-gray-600 text-white px-4 py-2 rounded"
      >
        Clear Cart
      </button>
    </div>
  );
}