import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { delay, map, startWith, switchMap, takeWhile } from 'rxjs/operators';
import { OrderStatus, OrderStatusType } from '../types/order.types';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConstants} from "../../../app.constants";
import {Router} from "@angular/router";

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

  constructor(private http: HttpClient , private router: Router) {}
  
  getOrderStatus(orderId: string): Observable<OrderStatus> {
   return this.simulateOrderStatusFetch(orderId);
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

    private getOrderData(orderId: string): Observable<OrderStatus> {
       return this.http.get<OrderStatus>(AppConstants.apiUrl+'orders/'+orderId);
    }

  private simulateOrderStatusFetch(orderId: string): Observable<OrderStatus> {
    return  this.getOrderData(orderId);
  }



  updateOrderStatus(status: OrderStatus): void {
    this.orderStatusSubject.next(status);
  }
   apiUrl = AppConstants.apiUrl;


  createOrder(orderData: any) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });

     this.http.post(this.apiUrl+'orders', orderData, { headers }).subscribe((res:any) =>{
      console.log(res.order.uuid);
       setTimeout(() => {
         // Always navigate to success for the mock order
         const orderId = res.order.uuid;
         this.router.navigate(['/order/success', orderId]);
       }, 1500);
    });
  }
}