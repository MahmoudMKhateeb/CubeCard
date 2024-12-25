import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpInputComponent } from '../../../shared/otp/otp-input/otp-input.component';
import { PaymentOtpService } from '../../services/payment-otp.service';

@Component({
  selector: 'app-payment-otp-dialog',
  standalone: true,
  imports: [CommonModule, OtpInputComponent],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-cyber-card rounded-lg p-6 max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-cyber-text-primary mb-4">تأكيد رقم الجوال</h2>
        <p class="text-cyber-text-secondary mb-6">
          تم إرسال رمز التحقق إلى رقم جوالك {{phone}}
        </p>

        <app-otp-input
          [error]="error"
          (otpComplete)="verifyOtp($event)">
        </app-otp-input>

        <div class="mt-6 flex justify-between items-center">
          <button
            (click)="resendOtp()"
            [disabled]="resendDisabled || loading"
            class="text-cyber-accent-primary hover:text-cyber-hover-primary transition-colors disabled:opacity-50">
            إعادة إرسال الرمز {{countdown > 0 ? '(' + countdown + ')' : ''}}
          </button>
          <button
            (click)="cancelled.emit()"
            [disabled]="loading"
            class="text-cyber-text-secondary hover:text-cyber-text-primary transition-colors">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  `
})
export class PaymentOtpDialogComponent {
  @Input() phone!: string;
  @Output() verified = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  error = '';
  loading = false;
  countdown = 60;
  resendDisabled = true;
  private countdownInterval?: number;

  constructor(private otpService: PaymentOtpService) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }

  verifyOtp(otp: string): void {
    if (this.loading) return;
    
    this.loading = true;
    this.error = '';

    this.otpService.verifyPaymentOtp(this.phone, otp).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data?.is_verified) {
          this.verified.emit();
        } else {
          this.error = response.message || 'رمز التحقق غير صحيح';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  resendOtp(): void {
    if (this.loading || this.resendDisabled) return;

    this.loading = true;
    this.error = '';

    this.otpService.sendPaymentOtp(this.phone).subscribe({
      next: () => {
        this.startCountdown();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message;
        this.loading = false;
      }
    });
  }

  private startCountdown(): void {
    this.countdown = 60;
    this.resendDisabled = true;
    
    this.countdownInterval = window.setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        this.resendDisabled = false;
        this.stopCountdown();
      }
    }, 1000);
  }

  private stopCountdown(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
