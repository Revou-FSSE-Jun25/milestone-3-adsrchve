export const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
export const loadCart = () => JSON.parse(localStorage.getItem('cart') || '[]');