import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OtpService } from '../../../../services/otp/otp.service';
import { OtpVerificationResponse } from '../../../../models/auth.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class OtpVerificationComponent {
  @Output() verified = new EventEmitter<void>();
  
  otp: string | null = null;
  errorMessage = '';
  isLoading = false;
  isResending = false;

  constructor(private otpService: OtpService) {}

  verifyOtp(): void {
    if (!this.otp) {
      this.errorMessage = 'يرجى إدخال رمز التحقق';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.otpService.verifyOtp(this.otp).subscribe({
      next: (response: OtpVerificationResponse) => {
        this.isLoading = false;
        if ((response.success || response.status === 'success') && response.data?.is_phone_verified) {
          this.verified.emit();
        } else {
          this.errorMessage = response.message || 'رمز التحقق غير صحيح';
          this.otp = null;
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'حدث خطأ أثناء التحقق من الرمز';
        this.otp = null;
      }
    });
  }

  resendOtp(): void {
    if (this.isResending) return;

    this.isResending = true;
    this.errorMessage = '';

    this.otpService.sendOtp().subscribe({
      next: (response: OtpVerificationResponse) => {
        this.isResending = false;
        if (!(response.success || response.status === 'success')) {
          this.errorMessage = response.message || '';
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isResending = false;
        this.errorMessage = error.error?.message || 'حدث خطأ أثناء إرسال الرمز';
      }
    });
  }
}