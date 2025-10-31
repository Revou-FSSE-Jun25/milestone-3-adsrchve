import { useCart } from '@/store/cartStore';
import CartItem from './CartItem';
import { useCallback, useMemo } from 'react';

export default function CartPage() {
  const cart = useCart((state) => state.cart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const clearCart = useCart((state) => state.clearCart);

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const handleRemove = useCallback((id) => removeFromCart(id),
    [removeFromCart]
  );

  if (cart.length === 0) return <p>Your cart is empty</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={handleRemove} />
      ))}

      <hr className="my-4" />
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>${totalPrice}</span>
      </div>

      <button onClick={() => alert("Checkout Success!")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Checkout</button>
      <button onClick={clearCart} className="mt-2 ml-2 bg-gray-600 text-white px-4 py-2 rounded">Clear Cart</button>
    </div>
  );
}