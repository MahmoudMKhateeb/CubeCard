import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, interval, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppConstants } from '../../../../app.constants';
import { Order, OrderStatusResponse } from '../models/order.types';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private currentOrder = new BehaviorSubject<OrderStatusResponse | null>(null);
  private pollingSubscription?: Subscription;

  constructor(private http: HttpClient) {}

  getOrderStatus(uuid: string): Observable<OrderStatusResponse> {
    return this.http.get<OrderStatusResponse>(`${AppConstants.apiUrl}orders/${uuid}/status`);
  }

  getCurrentOrder(): Observable<OrderStatusResponse | null> {
    return this.currentOrder.asObservable();
  }

  startStatusPolling(uuid: string): void {
    // Stop any existing polling
    this.stopStatusPolling();

    // Start polling every 5 seconds
    this.pollingSubscription = interval(5000).pipe(
      switchMap(() => this.getOrderStatus(uuid))
    ).subscribe({
      next: (response) => {
        this.currentOrder.next(response);
        
        // Stop polling if order is in a final state
        if (response.data.status === 'success' || response.data.status === 'failed' || response.data.status === 'contactSupport') {
          this.stopStatusPolling();
        }
      },
      error: (error) => {
        console.error('Error polling order status:', error);
        this.stopStatusPolling();
      }
    });
  }

  stopStatusPolling(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
      this.pollingSubscription = undefined;
    }
  }
}