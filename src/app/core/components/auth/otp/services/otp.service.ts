import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConstants } from '../../../../constants/app.constants';
import { OTPResponse } from '../models/otp.types';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private readonly apiUrl = AppConstants.apiUrl;
  private verificationState = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  verifyOtp(mobileNumber: string, otp: string): Observable<OTPResponse> {
    return this.http.post<OTPResponse>(`${this.apiUrl}otp/verify`, {
      mobile_number: mobileNumber,
      otp
    }).pipe(
      tap(response => {
        if (response.status === 'success') {
          this.verificationState.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  sendOtp(mobileNumber: string): Observable<OTPResponse> {
    return this.http.post<OTPResponse>(`${this.apiUrl}otp/send`, {
      mobile_number: mobileNumber
    }).pipe(
      catchError(this.handleError)
    );
  }

  isVerified(): Observable<boolean> {
    return this.verificationState.asObservable();
  }

  resetVerification(): void {
    this.verificationState.next(false);
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