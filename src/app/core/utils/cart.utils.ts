export const validateQuantity = (quantity: number): boolean => {
  return quantity > 0 && quantity <= 5; // Maximum 5 items per product
};

export const calculateSubtotal = (price: number, quantity: number): number => {
  return price * quantity;
};

export const formatPrice = (amount: number, currency: string): string => {
  return `${amount.toFixed(2)} ${currency}`;
};