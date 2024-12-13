import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { switchMap, takeWhile, catchError } from 'rxjs/operators';
import { OrderApiService } from './order-api.service';
import {CreateOrderResponse, Order, OrderStatus} from '../models/order.types';
import {CartService} from "../../../../services/cart.service";

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private currentOrder = new BehaviorSubject<Order | null>(null);
  private statusCheckSubscription?: Subscription;
  private readonly POLLING_INTERVAL = 5000; // 5 seconds
  stripe: any; // This will hold the Stripe object

  constructor(
    private orderApi: OrderApiService,
    private router: Router
  ) {
    this.injectStripeScript();
  }

  createOrder(orderData: any): void {
    this.orderApi.createOrder(orderData).subscribe({
      next: (response:CreateOrderResponse) => {
        if (response.success) {
          //this.currentOrder.next(order);
          
          // Immediate navigation based on initial status
          if (response.success) {
            this.redirectToCheckout(response.checkout_session_id);
            //this.router.navigate(['/order/success', order.uuid]);
          } else {
            // For inProgress or onHold, navigate to success page and start polling
            this.router.navigate(['/order/failed', response.order_uuid]);
            this.startStatusPolling(response.order_uuid);
          }
        } else {
          this.router.navigate(['/order/failed']);
        }
      },
      error: () => {
        this.router.navigate(['/order/failed']);
      }
    });
  }

  private startStatusPolling(orderUuid: string): void {
    // Clean up any existing subscription
    this.stopStatusPolling();

    this.statusCheckSubscription = interval(this.POLLING_INTERVAL).pipe(
      switchMap(() => this.orderApi.getOrderStatus(orderUuid)),
      takeWhile(order => order.status === 'inProgress' || order.status === 'onHold', true),
      catchError(error => {
        console.error('Error polling order status:', error);
        this.router.navigate(['/order/failed']);
        throw error;
      })
    ).subscribe(order => {
      this.currentOrder.next(order);
      this.navigateBasedOnStatus(order.status);
    });
  }

  private stopStatusPolling(): void {
    if (this.statusCheckSubscription) {
      this.statusCheckSubscription.unsubscribe();
    }
  }

  private navigateBasedOnStatus(status: OrderStatus): void {
    const order = this.currentOrder.getValue();
    if (!order) return;

    switch (status) {
      case 'success':
        this.router.navigate(['/order/success', order.uuid]);
        this.stopStatusPolling();
        break;
      case 'failed':
      case 'contactSupport':
        this.router.navigate(['/order/failed', order.uuid]);
        this.stopStatusPolling();
        break;
    }
  }

  getCurrentOrder(): Observable<Order | null> {
    return this.currentOrder.asObservable();
  }

  getOrderStatus(uuid: string): Observable<Order> {
    return this.orderApi.getOrderStatus(uuid);
  }

  injectStripeScript(): void {
    if (!document.getElementById('stripe-script')) {
      const script = document.createElement('script');
      script.id = 'stripe-script';
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        this.stripe = (window as any).Stripe('pk_test_51OT1WnFVQKl8ccWfT1mzxKFA7xilfqxOcNjui1qwROWODAcYymHKBpZgDj3HZRhlaG5E2FjZQisOcV47gdA1KSrF00ZxHTMzEc');
      };
      document.body.appendChild(script);
    }
  }

  async redirectToCheckout(sessionId: string): Promise<void> {

    try {
      // Request a Checkout Session from the backend
      if (!this.stripe) {
        console.error('Stripe is not initialized.');
        return;
      }

      // Redirect to Stripe Checkout
      const result = await this.stripe.redirectToCheckout({ sessionId: sessionId });
      if (result.error) {
        console.error('Error redirecting to Checkout:', result.error.message);
        alert('حدث خطأ أثناء معالجة الدفع.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('حدث خطأ أثناء معالجة الدفع.');
    } finally {
    }
  }

  ngOnDestroy(): void {
    this.stopStatusPolling();
  }

}