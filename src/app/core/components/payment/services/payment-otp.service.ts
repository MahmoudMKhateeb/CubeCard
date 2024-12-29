import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConstants } from '../../../constants/app.constants';
import { AuthService } from '../../../services/auth.service';

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
  private verifiedPayments = new BehaviorSubject<Set<string>>(new Set());

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  verifyPaymentOtp(otp: string): Observable<PaymentOtpResponse> {
    const user = this.authService.getCurrentUser();
    if (!user?.mobile_number) {
      return throwError(() => new Error('رقم الجوال غير متوفر'));
    }

    return this.http.post<PaymentOtpResponse>(`${this.apiUrl}payment/verify-otp`, {
      mobile_number: user.mobile_number,
      otp
    }).pipe(
      tap(response => {
        if (response.status === 'success' && response.data?.is_verified) {
          const payments = this.verifiedPayments.value;
          payments.add(user.mobile_number);
          this.verifiedPayments.next(payments);
        }
      }),
      catchError(this.handleError)
    );
  }

  sendPaymentOtp(): Observable<PaymentOtpResponse> {
    const user = this.authService.getCurrentUser();
    if (!user?.mobile_number) {
      return throwError(() => new Error('رقم الجوال غير متوفر'));
    }

    return this.http.post<PaymentOtpResponse>(`${this.apiUrl}payment/send-otp`, {
      mobile_number: user.mobile_number
    }).pipe(
      catchError(this.handleError)
    );
  }

  isPaymentVerified(): boolean {
    const user = this.authService.getCurrentUser();
    return user?.mobile_number ? this.verifiedPayments.value.has(user.mobile_number) : false;
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