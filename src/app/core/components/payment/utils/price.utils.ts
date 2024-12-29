export const parseAmount = (amount: string): number => {
  return parseFloat(amount.replace(/[^\d.-]/g, ''));
};

export const formatAmount = (amount: number, currency: string = 'SAR'): string => {
  return `${amount.toFixed(2)} ${currency}`;
};

export const calculateItemTotal = (quantity: number, price: string): number => {
  return quantity * parseAmount(price);
};

export const calculateVAT = (amount: number, rate: number = 0.15): number => {
  return amount * rate;
};

export const calculateTotal = (subtotal: number, vatRate: number = 0.15): number => {
  return subtotal * (1 + vatRate);
};