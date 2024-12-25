import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConstants } from '../../../constants/app.constants';

export interface OrderOtpResponse {
  status: string;
  message: string | null;
  data: {
    message: string;
    is_verified: boolean;
  };
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderOtpService {
  private readonly apiUrl = AppConstants.apiUrl;
  private verifiedOrders = new BehaviorSubject<Set<string>>(new Set());

  constructor(private http: HttpClient) {}

  verifyOrderOtp(orderId: string, otp: string): Observable<OrderOtpResponse> {
    return this.http.post<OrderOtpResponse>(`${this.apiUrl}orders/${orderId}/verify-otp`, {
      otp
    }).pipe(
      tap(response => {
        if (response.status === 'success' && response.data?.is_verified) {
          const orders = this.verifiedOrders.value;
          orders.add(orderId);
          this.verifiedOrders.next(orders);
        }
      }),
      catchError(this.handleError)
    );
  }

  sendOrderOtp(orderId: string): Observable<OrderOtpResponse> {
    return this.http.post<OrderOtpResponse>(`${this.apiUrl}orders/${orderId}/send-otp`, {}).pipe(
      catchError(this.handleError)
    );
  }

  isOrderVerified(orderId: string): boolean {
    return this.verifiedOrders.value.has(orderId);
  }

  private handleError(error: any) {
    let errorMessage = 'حدث خطأ غير متوقع';
    
    if (error.error?.message) {
      errorMessage = error.error.message;
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = 'خطأ في الاتصال بالخادم';
    }

    return throwError(() => new Error(errorMessage));
  }
}