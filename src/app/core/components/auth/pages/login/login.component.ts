import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { OtpVerificationComponent } from '../../otp/components/otp-verification.component';
import { LoginRequest } from '../../../../models/auth.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, OtpVerificationComponent]
})
export class LoginComponent {
  credentials: LoginRequest = {
    username: '',
    password: ''
  };
  
  error = '';
  loading = false;
  showOtpVerification = false;
  mobileNumber = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.credentials.username || !this.credentials.password) {
      this.error = 'يرجى تعبئة جميع الحقول';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          if (response.data?.requires_otp) {
            this.mobileNumber = response.data.user.mobile_number;
            this.showOtpVerification = true;
          } else {
            this.authService.completeAuthentication();
          }
        } else {
          this.error = response.message || 'حدث خطأ أثناء تسجيل الدخول';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'اسم المستخدم أو كلمة المرور غير صحيحة';
        this.loading = false;
      }
    });
  }

  onOtpVerified(): void {
    this.authService.completeAuthentication();
  }
}