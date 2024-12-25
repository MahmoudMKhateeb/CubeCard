import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../constants/app.constants';
import { OrdersListResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<any> {
    return this.http.get(`${AppConstants.apiUrl}user`);
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.put(`${AppConstants.apiUrl}user`, userData);
  }

  getUserOrders(): Observable<OrdersListResponse> {
    return this.http.get<OrdersListResponse>(`${AppConstants.apiUrl}orders`);
  }
}