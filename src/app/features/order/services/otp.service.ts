import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OtpService {
  private otpVerifiedSubject = new BehaviorSubject<boolean>(false);

  verifyOtp(otp: string): Observable<boolean> {
    // Simulate OTP verification - accept any 4-digit number
    const isValid = /^\d{4}$/.test(otp);
    if (isValid) {
      this.otpVerifiedSubject.next(true);
    }
    return of(isValid).pipe(delay(1000));
  }

  isOtpVerified(): Observable<boolean> {
    return this.otpVerifiedSubject.asObservable();
  }

  resetOtpVerification(): void {
    this.otpVerifiedSubject.next(false);
  }
}