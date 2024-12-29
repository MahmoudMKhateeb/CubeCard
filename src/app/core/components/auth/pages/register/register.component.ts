import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { RegisterRequest } from '../../../../models/auth.models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class RegisterComponent {
  userData: RegisterRequest = {
    name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: ''
  };

  error = '';
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.validateForm()) {
      this.loading = true;
      this.error = '';

      this.authService.register(this.userData).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            this.router.navigate(['/login'], {
              queryParams: { registered: 'true' }
            });
          } else {
            this.error = response.message || 'حدث خطأ أثناء إنشاء الحساب';
          }
          this.loading = false;
        },
        error: (error) => {
          this.error = error.error?.message || 'حدث خطأ أثناء إنشاء الحساب';
          this.loading = false;
        }
      });
    }
  }

  private validateForm(): boolean {
    if (!this.userData.name) {
      this.error = 'يرجى إدخال الاسم';
      return false;
    }

    if (!this.userData.email) {
      this.error = 'يرجى إدخال البريد الإلكتروني';
      return false;
    }

    if (!this.userData.phone) {
      this.error = 'يرجى إدخال رقم الجوال';
      return false;
    }

    if (!this.userData.password) {
      this.error = 'يرجى إدخال كلمة المرور';
      return false;
    }

    if (this.userData.password !== this.userData.password_confirmation) {
      this.error = 'كلمة المرور غير متطابقة';
      return false;
    }

    return true;
  }
}