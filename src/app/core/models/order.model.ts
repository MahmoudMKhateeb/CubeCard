export interface OrderResponse {
  status: string;
  message: string | null;
  data: Order;
  timestamp: string;
}

export interface OrdersListResponse {
  status: string;
  message: string | null;
  data: Order[];
  timestamp: string;
}

export interface Order {
  id: number;
  uuid: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  status: OrderStatus;
  payment: {
    method: string;
    total_amount: string;
    currency: string;
  };
  items: OrderItem[];
  notes: string | null;
  timestamps: {
    created_at: string;
    updated_at: string;
  };
}

export interface OrderItem {
  id: number;
  product: {
    uuid: string;
    name: string;
    image: string;
    price: string;
    currency: string;
  };
  quantity: number;
  total: string;
  serial_keys?: SerialKey[];
}

export interface SerialKey {
  id: number;
  key: string;
  is_used: boolean;
  created_at: string;
  updated_at: string;
}

export type OrderStatus = 'pending' | 'success' | 'failed' | 'inProgress' | 'onHold' | 'contactSupport';