export interface CartItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  price: {
    amount: string;
    currency: string;
  };
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}