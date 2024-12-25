import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConstants } from '../../../constants/app.constants';

export interface PaymentOtpResponse {
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
export class PaymentOtpService {
  private readonly apiUrl = AppConstants.apiUrl;
  private verifiedPhones = new BehaviorSubject<Set<string>>(new Set());

  constructor(private http: HttpClient) {}

  verifyPaymentOtp(phone: string, otp: string): Observable<PaymentOtpResponse> {
    return this.http.post<PaymentOtpResponse>(`${this.apiUrl}payment/verify-otp`, {
      mobile_number: phone,
      otp
    }).pipe(
      tap(response => {
        if (response.status === 'success' && response.data?.is_verified) {
          const phones = this.verifiedPhones.value;
          phones.add(phone);
          this.verifiedPhones.next(phones);
        }
      }),
      catchError(this.handleError)
    );
  }

  sendPaymentOtp(phone: string): Observable<PaymentOtpResponse> {
    return this.http.post<PaymentOtpResponse>(`${this.apiUrl}payment/send-otp`, {
      mobile_number: phone
    }).pipe(
      catchError(this.handleError)
    );
  }

  isPhoneVerified(phone: string): boolean {
    return this.verifiedPhones.value.has(phone);
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
