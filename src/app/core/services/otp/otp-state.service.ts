import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OtpState } from '../../models/otp.model';

@Injectable({
  providedIn: 'root'
})
export class OtpStateService {
  private readonly MAX_ATTEMPTS = 3;
  private readonly VERIFICATION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

  private state = new BehaviorSubject<OtpState>({
    isVerified: false,
    attemptsRemaining: this.MAX_ATTEMPTS
  });

  getState(): Observable<OtpState> {
    return this.state.asObservable();
  }

  setVerified(verified: boolean): void {
    this.state.next({
      ...this.state.value,
      isVerified: verified,
      lastVerifiedAt: verified ? new Date() : undefined
    });
  }

  decrementAttempts(): number {
    const newState = {
      ...this.state.value,
      attemptsRemaining: Math.max(0, this.state.value.attemptsRemaining - 1)
    };
    this.state.next(newState);
    return newState.attemptsRemaining;
  }

  resetAttempts(): void {
    this.state.next({
      ...this.state.value,
      attemptsRemaining: this.MAX_ATTEMPTS
    });
  }

  needsVerification(): boolean {
    const { isVerified, lastVerifiedAt } = this.state.value;
    if (!isVerified) return true;
    if (!lastVerifiedAt) return true;
    
    const timeSinceVerification = Date.now() - lastVerifiedAt.getTime();
    return timeSinceVerification >= this.VERIFICATION_DURATION;
  }
}