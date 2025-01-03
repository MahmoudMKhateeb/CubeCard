import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../../constants/app.constants';
import { CreateOrderResponse, Order } from '../models/order.types';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  private apiUrl = `${AppConstants.apiUrl}orders`;

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(this.apiUrl, orderData);
  }

  getOrderStatus(uuid: string, sessionId?: string): Observable<Order> {
    const url = sessionId 
      ? `${this.apiUrl}/${uuid}/status?session_id=${sessionId}`
      : `${this.apiUrl}/${uuid}/status`;
    return this.http.get<Order>(url);
  }

  getOrder(uuid: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${uuid}`);
  }
}