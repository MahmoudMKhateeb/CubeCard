import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
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
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: '',
    password: '',
    password_confirmation: '',
    country: 'USA'
  };

  errors: { [key: string]: string } = {
    first_name: '',
    last_name: '',
    mobile_number: '',
    email: '',
    password: '',
    password_confirmation: '',
    general: ''
  };

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.loading) return;

    // Reset errors
    Object.keys(this.errors).forEach(key => this.errors[key] = '');

    // Basic validation
    if (!this.validateForm()) return;

    this.loading = true;

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.router.navigate(['/login'], { 
            queryParams: { registered: 'true' }
          });
        } else {
          this.errors['general'] = response.message || 'حدث خطأ أثناء إنشاء الحساب';
        }
        this.loading = false;
      },
      error: (error) => {
        if (error.error?.errors) {
          Object.keys(error.error.errors).forEach(key => {
            this.errors[key] = error.error.errors[key][0];
          });
        } else {
          this.errors['general'] = 'حدث خطأ أثناء إنشاء الحساب';
        }
        this.loading = false;
      }
    });
  }

  private validateForm(): boolean {
    let isValid = true;

    if (!this.userData.first_name) {
      this.errors['first_name'] = 'الاسم الأول مطلوب';
      isValid = false;
    }
    if (!this.userData.last_name) {
      this.errors['last_name'] = 'الاسم الأخير مطلوب';
      isValid = false;
    }
    if (!this.userData.mobile_number) {
      this.errors['mobile_number'] = 'رقم الجوال مطلوب';
      isValid = false;
    }
    if (!this.userData.email) {
      this.errors['email'] = 'البريد الإلكتروني مطلوب';
      isValid = false;
    }
    if (!this.userData.password) {
      this.errors['password'] = 'كلمة المرور مطلوبة';
      isValid = false;
    }
    if (this.userData.password !== this.userData.password_confirmation) {
      this.errors['password_confirmation'] = 'كلمة المرور غير متطابقة';
      isValid = false;
    }

    return isValid;
  }
}