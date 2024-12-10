import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { delay, map, startWith, switchMap, takeWhile } from 'rxjs/operators';
import { mockOrders } from '../data/mock-orders';
import { OrderStatus, OrderStatusType } from '../types/order.types';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConstants} from "../../../app.constants";

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
  private orderStatusSubject = new BehaviorSubject<OrderStatus | null>(null);
  private otpVerifiedSubject = new BehaviorSubject<boolean>(false);

  private statusProgression: Record<OrderStatusType, OrderStatusType | null> = {
    'pending': 'processing',
    'processing': 'completed',
    'completed': null,
    'failed': null
  };

  constructor(private http: HttpClient) {}
  
  getOrderStatus(orderId: string): Observable<OrderStatus> {
    return interval(5000).pipe(
      startWith(0),
      switchMap(() => this.simulateOrderStatusFetch(orderId)),
      map(order => this.progressOrderStatus(order)),
      takeWhile(order => order.status !== 'completed' && order.status !== 'failed', true)
    );
  }

  getCurrentStatus(): Observable<OrderStatus | null> {
    return this.orderStatusSubject.asObservable();
  }

  isOtpVerified(): Observable<boolean> {
    return this.otpVerifiedSubject.asObservable();
  }

  verifyOtp(otp: string): Observable<boolean> {
    // Simulate OTP verification - accept any 4-digit number
    const isValid = /^\d{4}$/.test(otp);
    if (isValid) {
      this.otpVerifiedSubject.next(true);
    }
    return of(isValid).pipe(delay(1000)); // Simulate API call
  }

  private simulateOrderStatusFetch(orderId: string): Observable<OrderStatus> {
    const order = mockOrders[orderId];
    if (!order) {
      throw new Error('Order not found');
    }
    return of(order).pipe(delay(500)); // Simulate network delay
  }

  private progressOrderStatus(order: OrderStatus): OrderStatus {
    if (order.status === 'failed' || order.status === 'completed') {
      return order;
    }

    // 30% chance to progress to next status
    if (Math.random() < 0.3) {
      const nextStatus = this.statusProgression[order.status];
      if (nextStatus) {
        const updatedOrder: OrderStatus = {
          ...order,
          status: nextStatus,
          updatedAt: new Date().toISOString()
        };
        mockOrders[order.orderId] = updatedOrder;
        return updatedOrder;
      }
    }

    return { ...order };
  }

  updateOrderStatus(status: OrderStatus): void {
    this.orderStatusSubject.next(status);
  }
   apiUrl = AppConstants.apiUrl;
  orderData = {
    customer_phone: '123456789',
    customer_name: 'John Doe',
    customer_email: 'john@example.com',
    status: 'inProgress', // Default status
    cart_items: [
      {
        product_uuid: 'e2337887-e580-44bb-a1c1-d28f7a04ba05',
        quantity: 4,
        price: 100,
        region: 'KSA',
        currency: 'SAR',
      },
    ],
    total_amount: 200,
    payment_method: 'Visa',
    order_notes: 'Test order',
  };

  createOrder(orderData: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

     this.http.post(this.apiUrl+'orders', this.orderData, { headers }).subscribe(res =>{
      console.log(res);
    });
  }
}