import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from './otp-input.component';
import { OtpService } from '../../../services/otp/otp.service';

@Component({
  selector: 'app-otp-verification-dialog',
  standalone: true,
  imports: [CommonModule, OtpInputComponent],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold mb-4">التحقق من رقم الجوال</h2>
        <p class="text-gray-600 mb-6">
          تم إرسال رمز التحقق إلى {{mobileNumber}}
        </p>

        <app-otp-input
          [error]="error"
          (otpComplete)="verifyOtp($event)">
        </app-otp-input>

        <div class="mt-6 flex justify-between items-center">
          <button
            (click)="resendOtp()"
            [disabled]="resendDisabled"
            class="text-blue-600 hover:text-blue-800 disabled:opacity-50">
            إعادة إرسال الرمز {{countdown > 0 ? '(' + countdown + ')' : ''}}
          </button>
          <button
            (click)="onCancel.emit()"
            class="text-gray-600 hover:text-gray-800">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  `
})
export class OtpVerificationDialogComponent {
  @Input() mobileNumber: string = '';
  @Output() verified = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();

  error = '';
  countdown = 300; // 5 minutes
  resendDisabled = true;
  private countdownInterval?: number;

  constructor(private otpService: OtpService) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  verifyOtp(otp: string): void {
    this.otpService.verifyOtp(this.mobileNumber, otp).subscribe({
      next: () => this.verified.emit(),
      error: (err) => this.error = err.error?.message || 'حدث خطأ أثناء التحقق'
    });
  }

  resendOtp(): void {
    if (!this.resendDisabled) {
      this.otpService.resendOtp(this.mobileNumber).subscribe({
        next: () => {
          this.countdown = 300;
          this.resendDisabled = true;
          this.startCountdown();
        },
        error: (err) => this.error = err.error?.message || 'حدث خطأ أثناء إعادة الإرسال'
      });
    }
  }

  private startCountdown(): void {
    this.countdownInterval = window.setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.resendDisabled = false;
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }
}