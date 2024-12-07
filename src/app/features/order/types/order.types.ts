export type OrderStatusType = 'pending' | 'processing' | 'completed' | 'failed';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  serials?: CardSerial[];
}

export interface CardSerial {
  code: string;
  pin?: string;
  expiresAt: string;
}

export interface OrderStatus {
  orderId: string;
  status: OrderStatusType;
  paymentMethod: string;
  amount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}