import { Cart, CartItem } from '../models/cart.types';

export const validateCart = (cart: Cart): boolean => {
  if (!cart.items || !Array.isArray(cart.items)) {
    return false;
  }

  return cart.items.every(validateCartItem);
};

export const validateCartItem = (item: CartItem): boolean => {
  return (
    typeof item.id === 'number' &&
    typeof item.quantity === 'number' &&
    item.quantity > 0 &&
    item.quantity <= 5 &&
    typeof item.price === 'number' &&
    item.price >= 0 &&
    typeof item.currency === 'string' &&
    item.currency.length === 3
  );
};