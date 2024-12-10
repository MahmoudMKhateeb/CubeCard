import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhoneVerificationService {
  private verifiedPhones = new Set<string>();
  private phoneValidatedSubject = new Subject<string>();
  phoneValidated$ = this.phoneValidatedSubject.asObservable();

  validatePhone(phone: string): void {
    this.phoneValidatedSubject.next(phone);
  }

  sendOtp(phone: string): Observable<boolean> {
    // Simulate API call to send OTP
    console.log(`Sending OTP to ${phone}`);
    return of(true).pipe(delay(1000));
  }

  verifyOtp(phone: string, otp: string): Observable<boolean> {
    // Simulate OTP verification - accept only '1234'
    const isValid = otp === '1234';
    if (isValid) {
      this.verifiedPhones.add(phone);
    }
    return of(isValid).pipe(delay(1000));
  }

  isPhoneVerified(phone: string): boolean {
    return this.verifiedPhones.has(phone);
  }
}