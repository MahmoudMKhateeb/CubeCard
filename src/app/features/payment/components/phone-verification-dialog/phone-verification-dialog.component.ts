import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhoneVerificationService } from '../../services/phone-verification.service';

@Component({
  selector: 'app-phone-verification-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-cyber-card rounded-lg p-6 max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-cyber-text-primary mb-4">تأكيد رقم الجوال</h2>
        <p class="text-cyber-text-secondary mb-6">
          تم إرسال رمز التحقق إلى رقم جوالك {{phone}}
        </p>

        <div class="mb-6">
          <input
            type="text"
            [(ngModel)]="otpCode"
            maxlength="4"
            placeholder="0000"
            class="w-full px-4 py-2 bg-cyber-surface border border-cyber-border rounded-lg text-center text-2xl tracking-wider text-cyber-text-primary focus:outline-none focus:border-cyber-accent-primary"
            [class.border-red-500]="error"
          />
          <p *ngIf="error" class="text-red-500 text-sm mt-2">{{error}}</p>
        </div>

        <div class="flex gap-4">
          <button
            (click)="verifyOtp()"
            class="flex-1 bg-cyber-accent-primary text-white py-2 rounded-lg hover:bg-cyber-hover-primary transition-colors"
            [disabled]="loading"
          >
            <span *ngIf="!loading">تأكيد</span>
            <span *ngIf="loading">جاري التحقق...</span>
          </button>
          <button
            (click)="resendOtp()"
            class="flex-1 bg-cyber-surface text-cyber-text-primary py-2 rounded-lg hover:bg-cyber-card transition-colors"
            [disabled]="loading"
          >
            إعادة الإرسال
          </button>
        </div>
      </div>
    </div>
  `
})
export class PhoneVerificationDialogComponent {
  @Input() phone: string = '';
  @Output() verified = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  otpCode = '';
  error = '';
  loading = false;

  constructor(private verificationService: PhoneVerificationService) {}

  verifyOtp(): void {
    if (this.otpCode.length !== 4) {
      this.error = 'يرجى إدخال رمز التحقق المكون من 4 أرقام';
      return;
    }

    this.loading = true;
    this.error = '';

    this.verificationService.verifyOtp(this.phone, this.otpCode).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.verified.emit();
        } else {
          this.error = 'رمز التحقق غير صحيح';
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'حدث خطأ أثناء التحقق من الرمز';
        this.loading = false;
      }
    });
  }

  resendOtp(): void {
    this.loading = true;
    this.verificationService.sendOtp(this.phone).subscribe({
      next: () => {
        this.loading = false;
        this.error = '';
      },
      error: () => {
        this.loading = false;
        this.error = 'حدث خطأ أثناء إعادة إرسال الرمز';
      }
    });
  }
}