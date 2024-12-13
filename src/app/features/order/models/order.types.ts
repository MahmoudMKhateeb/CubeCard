export type OrderStatus = 'inProgress' | 'success' | 'failed' | 'onHold' | 'contactSupport' | 'pending';

export interface SerialKey {
  id: number;
  order_item_id: number;
  key: string;
  is_used: number;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  product_name: string;
  order_id: number;
  product_uuid: string;
  quantity: number;
  price: string;
  region: string;
  currency: string;
  created_at: string;
  updated_at: string;
  serial_keys: SerialKey[];
}

export interface Order {
  id: number;
  uuid: string;
  customer_phone: string;
  customer_name: string;
  customer_email: string;
  status: OrderStatus;
  total_amount: string;
  payment_method: string;
  order_notes: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order_uuid: string;
  checkout_session_id: string;
}