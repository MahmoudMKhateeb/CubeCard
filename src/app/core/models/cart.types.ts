export interface CartResponse {
  message: string;
  cart_uuid?: string;
  cart_total: number;
  item?: CartItem;
}

export interface Cart {
  uuid: string;
  items: CartItem[];
  total_amount: number;
  currency: string;
}

export interface CartItem {
  id: number;
  product_uuid: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  region: string;
  currency: string;
  subtotal: number;
}

export interface AddToCartRequest {
  product_uuid: string;
  quantity: number;
  region: string;
  currency: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
}