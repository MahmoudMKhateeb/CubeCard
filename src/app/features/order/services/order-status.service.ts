import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, interval } from 'rxjs';
import { switchMap, takeWhile, catchError } from 'rxjs/operators';
import { OrderApiService } from './order-api.service';
import { Order, OrderStatus } from '../models/order.types';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private currentOrder = new BehaviorSubject<Order | null>(null);
  private statusCheckSubscription?: Subscription;
  private readonly POLLING_INTERVAL = 5000; // 5 seconds

  constructor(
    private orderApi: OrderApiService,
    private router: Router
  ) {}

  createOrder(orderData: any): void {
    this.orderApi.createOrder(orderData).subscribe({
      next: (response) => {
        if (response.success) {
          const order = response.order;
          this.currentOrder.next(order);
          
          // Immediate navigation based on initial status
          if (order.status === 'success') {
            this.router.navigate(['/order/success', order.uuid]);
          } else if (order.status === 'failed' || order.status === 'contactSupport') {
            this.router.navigate(['/order/failed', order.uuid]);
          } else {
            // For inProgress or onHold, navigate to success page and start polling
            this.router.navigate(['/order/success', order.uuid]);
            this.startStatusPolling(order.uuid);
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

  ngOnDestroy(): void {
    this.stopStatusPolling();
  }
}