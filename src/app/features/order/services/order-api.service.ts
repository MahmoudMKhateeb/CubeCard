import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../../app.constants';
import { CreateOrderResponse, Order } from '../models/order.types';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  private apiUrl = AppConstants.apiUrl;

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<CreateOrderResponse> {
    return this.http.post<CreateOrderResponse>(`${this.apiUrl}orders`, orderData);
  }

  getOrderStatus(uuid: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}orders/${uuid}`);
  }
}