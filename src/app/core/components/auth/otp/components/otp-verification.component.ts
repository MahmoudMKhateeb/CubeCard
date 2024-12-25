import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from '../../../shared/otp/otp-input/otp-input.component';
import { OtpTimerComponent } from './otp-timer.component';
import { OtpService } from '../../../../services/otp/otp.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, OtpInputComponent, OtpTimerComponent],
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-xl font-semibold text-cyber-text-primary mb-2">تأكيد رقم الجوال</h2>
        <p class="text-cyber-text-secondary">
          تم إرسال رمز التحقق إلى {{ mobileNumber }}
        </p>
      </div>

      <app-otp-input
        #otpInput
        [error]="errorMessage"
        (otpComplete)="onOtpComplete($event)">
      </app-otp-input>

      <div class="flex justify-center">
        <app-otp-timer
          [isLoading]="isLoading"
          (resend)="resendOtp()">
        </app-otp-timer>
      </div>

      <button
        (click)="verifyOtp()"
        [disabled]="!otp || isLoading"
        class="w-full bg-cyber-accent-primary text-white py-3 rounded-lg hover:bg-cyber-hover-primary transition-colors disabled:opacity-50"
      >
        <span *ngIf="!isLoading">تأكيد</span>
        <span *ngIf="isLoading">جاري التحقق...</span>
      </button>
    </div>
  `
})
export class OtpVerificationComponent {
  @Input() mobileNumber = '';
  @Output() verified = new EventEmitter<void>();
  @ViewChild('otpInput') otpInput!: OtpInputComponent;

  errorMessage = '';
  isLoading = false;
  otp: string | null = null;

  constructor(private otpService: OtpService) {}

  onOtpComplete(otp: string): void {
    this.otp = otp;
    this.errorMessage = '';
  }

  verifyOtp(): void {
    if (!this.otp || this.isLoading || !this.mobileNumber) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.otpService.verifyOtp(this.mobileNumber, this.otp).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data?.is_phone_verified) {
          this.verified.emit();
        } else {
          this.errorMessage = response.data?.message || 'رمز التحقق غير صحيح';
          this.otpInput.clear();
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.otpInput.clear();
        this.isLoading = false;
      }
    });
  }

  resendOtp(): void {
    if (this.isLoading || !this.mobileNumber) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    this.otpService.sendOtp(this.mobileNumber).subscribe({
      next: (response) => {
        if (response.status === 'error') {
          this.errorMessage = response.message || '';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }
}