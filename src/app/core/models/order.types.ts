export type OrderStatus = 'pending' | 'inProgress' | 'success' | 'failed' | 'onHold' | 'contactSupport';

export interface Order {
  uuid: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  status: OrderStatus;
  payment_status: 'pending' | 'succeeded' | 'failed';
  total_amount: number;
  payment_method: string;
  order_notes?: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_uuid: string;
  product_name: string;
  product_image: string;
  quantity: number;
  price: number;
  region: string;
  currency: string;
  serial_keys?: string[];
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order_uuid: string;
  checkout_session_id: string;
}

export interface OrderResponse {
  status: string;
  message: string;
  data: Order;
}