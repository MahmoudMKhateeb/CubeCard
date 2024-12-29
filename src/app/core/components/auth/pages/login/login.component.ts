import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { OtpVerificationComponent } from '../../otp/components/otp-verification.component';
import { LoginRequest } from '../../../../models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, OtpVerificationComponent]
})
export class LoginComponent {
  credentials: LoginRequest = {
    username: '',
    password: ''
  };

  error = '';
  isLoading = false;
  showOtpVerification = false;
  phoneNumber = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.error = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.status === 'success' && response.data) {
          this.phoneNumber = response.data.user.phone || response.data.user.mobile_number || '';
          this.showOtpVerification = response.data.requires_otp;
        } else {
          this.error = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error.error?.message || 'حدث خطأ أثناء تسجيل الدخول';
      }
    });
  }

  onOtpVerified(): void {
    this.authService.completeAuthentication();
  }
}