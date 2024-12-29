export type OrderStatus = 'inProgress' | 'success' | 'failed' | 'onHold' | 'contactSupport' | 'pending';
export type PaymentStatus = 'processing' | 'completed' | 'failed';

export interface SerialKey {
  key: string;
}

export interface OrderItem {
  product_uuid: string;
  product_name: string;
  product_image?: string;
  quantity: number;
  price: string;
  region: string;
  currency: string;
  serial_keys?: string[];
  subtotal: number;
  display_price: string;
  display_currency: string;
  sar_price: string;
}

export interface Order {
  uuid: string;
  customer_phone: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  payment_method: string;
  order_notes: string;
  created_at: string;
  updated_at: string;
  items: OrderItem[];
}

export interface OrderStatusResponse {
  status: 'success' | 'error';
  message: string;
  data: {
    status: OrderStatus;
    payment_status: PaymentStatus;
    order: Order;
  };
  timestamp: string;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  order_uuid: string;
  checkout_session_id: string;
}