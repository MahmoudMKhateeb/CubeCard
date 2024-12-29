import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constants/app.constants';
import { CreateOrderResponse, Order, OrderResponse } from '../../models/order.types';

@Injectable({ providedIn: 'root' })
export class OrderApiService {
  private readonly apiUrl = `${AppConstants.apiUrl}orders`;

  constructor(private http: HttpClient) {}

  getOrder(uuid: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${uuid}`);
  }

  getOrderStatus(uuid: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${uuid}/status`);
  }

  getUserOrders(): Observable<{ data: Order[] }> {
    return this.http.get<{ data: Order[] }>(this.apiUrl);
  }
}