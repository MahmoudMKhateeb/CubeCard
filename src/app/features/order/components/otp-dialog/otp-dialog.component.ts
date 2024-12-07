import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderStatusService } from '../../services/order-status.service';

@Component({
  selector: 'app-otp-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-cyber-card rounded-lg p-6 max-w-md w-full mx-4">
        <h2 class="text-xl font-semibold text-cyber-text-primary mb-4">تأكيد الهوية</h2>
        <p class="text-cyber-text-secondary mb-6">
          تم إرسال رمز التحقق إلى رقم جوالك. يرجى إدخال الرمز المكون من 4 أرقام.
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
            (click)="cancel()"
            class="flex-1 bg-cyber-surface text-cyber-text-primary py-2 rounded-lg hover:bg-cyber-card transition-colors"
            [disabled]="loading"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  `
})
export class OtpDialogComponent {
  @Output() verified = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  otpCode = '';
  error = '';
  loading = false;

  constructor(private orderStatusService: OrderStatusService) {}

  verifyOtp(): void {
    if (this.otpCode.length !== 4) {
      this.error = 'يرجى إدخال رمز التحقق المكون من 4 أرقام';
      return;
    }

    this.loading = true;
    this.error = '';

    this.orderStatusService.verifyOtp(this.otpCode).subscribe({
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

  cancel(): void {
    this.cancelled.emit();
  }
}