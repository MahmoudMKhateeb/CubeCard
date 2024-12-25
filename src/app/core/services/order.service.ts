import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/app.constants';
import { OrderResponse, OrdersListResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = AppConstants.apiUrl;

  constructor(private http: HttpClient) {}

  getOrderDetails(uuid: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}orders/${uuid}`);
  }

  getUserOrders(): Observable<OrdersListResponse> {
    return this.http.get<OrdersListResponse>(`${this.apiUrl}orders`);
  }
}