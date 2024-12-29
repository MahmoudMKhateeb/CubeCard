import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { OtpApiService } from './otp-api.service';
import { AuthService } from '../auth.service';
import { OtpVerificationResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private verifiedPhones = new BehaviorSubject<Set<string>>(new Set());

  constructor(
    private otpApi: OtpApiService,
    private authService: AuthService
  ) {}

  verifyOtp(otp: string): Observable<OtpVerificationResponse> {
    const user = this.authService.getCurrentUser();
    const phoneNumber = user?.mobile_number || user?.phone;
    
    if (!phoneNumber) {
      return throwError(() => new Error('رقم الجوال غير متوفر'));
    }

    return this.otpApi.verifyOtp(otp, phoneNumber).pipe(
      tap(response => {
        if ((response.success || response.status === 'success') && response.data?.is_phone_verified) {
          const phones = this.verifiedPhones.value;
          phones.add(phoneNumber);
          this.verifiedPhones.next(phones);
          this.authService.updateOtpVerificationState(true);
        }
      }),
      catchError(error => {
        console.error('OTP verification error:', error);
        return throwError(() => error);
      })
    );
  }

  sendOtp(): Observable<OtpVerificationResponse> {
    return this.otpApi.sendOtp().pipe(
      catchError(error => {
        console.error('Send OTP error:', error);
        return throwError(() => error);
      })
    );
  }

  isPhoneVerified(): boolean {
    const user = this.authService.getCurrentUser();
    const phoneNumber = user?.mobile_number || user?.phone;
    return phoneNumber ? this.verifiedPhones.value.has(phoneNumber) : false;
  }
}