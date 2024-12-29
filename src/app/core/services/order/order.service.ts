import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { OrderApiService } from './order-api.service';
import { Order, OrderResponse } from '../../models/order.types';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private currentOrder = new BehaviorSubject<Order | null>(null);
  private loading = new BehaviorSubject<boolean>(false);
  private pollingInterval?: number;

  currentOrder$ = this.currentOrder.asObservable();
  loading$ = this.loading.asObservable();

  constructor(
    private orderApi: OrderApiService,
    private router: Router
  ) {}

  getOrder(uuid: string): Observable<OrderResponse> {
    this.loading.next(true);
    return this.orderApi.getOrder(uuid).pipe(
      tap({
        next: (response) => {
          this.currentOrder.next(response.data);
          this.loading.next(false);
        },
        error: () => this.loading.next(false)
      })
    );
  }

  startOrderStatusPolling(uuid: string): void {
    this.stopOrderStatusPolling();

    this.pollingInterval = window.setInterval(() => {
      this.orderApi.getOrderStatus(uuid).subscribe({
        next: (response) => {
          const order = response.data;
          this.currentOrder.next(order);

          if (this.isOrderComplete(order.status)) {
            this.stopOrderStatusPolling();
            this.handleOrderCompletion(order);
          }
        }
      });
    }, 5000); // Poll every 5 seconds
  }

  stopOrderStatusPolling(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }

  private isOrderComplete(status: string): boolean {
    return ['success', 'failed', 'contactSupport'].includes(status);
  }

  private handleOrderCompletion(order: Order): void {
    switch (order.status) {
      case 'success':
        this.router.navigate(['/order/success', order.uuid]);
        break;
      case 'failed':
      case 'contactSupport':
        this.router.navigate(['/order/failed', order.uuid]);
        break;
    }
  }

  ngOnDestroy(): void {
    this.stopOrderStatusPolling();
  }
}