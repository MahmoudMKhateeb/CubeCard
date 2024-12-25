import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User, UpdateProfileRequest } from '../../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  user: User | null = null;
  updateData: UpdateProfileRequest = {
    first_name: '',
    last_name: '',
    email: '',
    current_password: '',
    password: '',
    password_confirmation: ''
  };
  loading = true;
  updating = false;
  error = '';
  updateSuccess = false;
  errors: { [key: string]: string } = {};

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.error = '';

    this.userService.getUserProfile().subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.user = response.data;
          this.updateData.first_name = response.data.first_name;
          this.updateData.last_name = response.data.last_name;
          this.updateData.email = response.data.email;
        } else {
          this.error = response.message || 'حدث خطأ أثناء تحميل البيانات';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'حدث خطأ أثناء تحميل البيانات';
        this.loading = false;
      }
    });
  }

  updateProfile(): void {
    if (this.updating) return;

    this.updating = true;
    this.error = '';
    this.updateSuccess = false;
    this.errors = {};

    // Only include password fields if a new password is being set
    const updateData: UpdateProfileRequest = {
      first_name: this.updateData.first_name,
      last_name: this.updateData.last_name,
      email: this.updateData.email
    };

    if (this.updateData.password) {
      updateData.current_password = this.updateData.current_password;
      updateData.password = this.updateData.password;
      updateData.password_confirmation = this.updateData.password_confirmation;
    }

    this.userService.updateUserProfile(updateData).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.updateSuccess = true;
          this.user = response.data;
          
          // Reset password fields
          this.updateData.current_password = '';
          this.updateData.password = '';
          this.updateData.password_confirmation = '';
        } else {
          this.error = response.message || 'حدث خطأ أثناء تحديث البيانات';
        }
        this.updating = false;
      },
      error: (err) => {
        if (err.error?.errors) {
          this.errors = Object.keys(err.error.errors).reduce((acc, key) => {
            acc[key] = err.error.errors[key][0];
            return acc;
          }, {} as { [key: string]: string });
        } else {
          this.error = 'حدث خطأ أثناء تحديث البيانات';
        }
        this.updating = false;
      }
    });
  }
}