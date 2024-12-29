import { Injectable } from '@angular/core';
import { StripeService } from './stripe.service';
import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(
    private stripeService: StripeService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  async processPayment(paymentMethod: string): Promise<void> {
    try {
      // Create order and get checkout session
      const checkoutData = await firstValueFrom(
        this.cartService.checkout(paymentMethod)
      );

      if (!checkoutData.success) {
        throw new Error(checkoutData.message || 'حدث خطأ أثناء إنشاء الطلب');
      }

      // Start polling order status
      this.orderService.startOrderStatusPolling(checkoutData.order_uuid);

      // Redirect to Stripe checkout
      await this.stripeService.redirectToCheckout(checkoutData.checkout_session_id);
    } catch (error: any) {
      console.error('Payment error:', error);
      throw new Error(error.message || 'حدث خطأ أثناء معالجة الدفع');
    }
  }
}
