import { OrderStatus } from '../types/order.types';

export const mockOrders: Record<string, OrderStatus> = {
  'ORD-001': {
    orderId: 'ORD-001',
    status: 'pending',
    paymentMethod: 'Apple Pay',
    amount: 750.00,
    items: [
      {
        name: 'بطاقة ايتونز - فئة 500 ريال',
        quantity: 1,
        price: 500.00,
        serials: [
          {
            code: 'ITNS-1234-5678-9012',
            pin: '1234',
            expiresAt: '2025-12-31T23:59:59Z'
          }
        ]
      },
      {
        name: 'بطاقة ببجي - فئة 250 ريال',
        quantity: 1,
        price: 250.00,
        serials: [
          {
            code: 'PUBG-9876-5432-1098',
            expiresAt: '2025-12-31T23:59:59Z'
          }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  'ORD-002': {
    orderId: 'ORD-002',
    status: 'processing',
    paymentMethod: 'مدى',
    amount: 350.00,
    items: [
      {
        name: 'بطاقة بلايستيشن - فئة 350 ريال',
        quantity: 1,
        price: 350.00,
        serials: [
          {
            code: 'PSN-5678-1234-9012',
            expiresAt: '2025-12-31T23:59:59Z'
          }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  'ORD-003': {
    orderId: 'ORD-003',
    status: 'failed',
    paymentMethod: 'STC Pay',
    amount: 1000.00,
    items: [
      {
        name: 'بطاقة قوقل بلاي - فئة 500 ريال',
        quantity: 2,
        price: 500.00,
        serials: [
          {
            code: 'GPLAY-1111-2222-3333',
            expiresAt: '2025-12-31T23:59:59Z'
          },
          {
            code: 'GPLAY-4444-5555-6666',
            expiresAt: '2025-12-31T23:59:59Z'
          }
        ]
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};