import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { PaymentService } from '../../../services/payment/payment.service';
import { PaymentForm } from '../models/payment.types';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class PaymentComponent implements OnInit {
  form: PaymentForm = {
    paymentMethod: 'card'
  };

  error = '';
  isProcessing = false;
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(
    public cartService: CartService,
    private paymentService: PaymentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.loadCart();
    // Initialize form with user data
    const user = this.authService.getCurrentUser();
    if (user) {
      this.form = {
        ...this.form,
        firstName: user.name?.split(' ')[0] || '',
        lastName: user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email || '',
        phone: user.phone || ''
      };
    }
  }

  isFormValid(): boolean {
    return !!this.form.paymentMethod && 
           !!this.form.firstName && 
           !!this.form.lastName && 
           !!this.form.email && 
           !!this.form.phone && 
           !this.isProcessing;
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }

  async initiatePayment(): Promise<void> {
    if (!this.isFormValid()) {
      this.error = 'يرجى ملء جميع الحقول المطلوبة';
      return;
    }

    this.isProcessing = true;
    this.error = '';

    try {
      await this.paymentService.processPayment(this.form.paymentMethod);
    } catch (error: any) {
      this.error = error.message || 'حدث خطأ أثناء معالجة الدفع';
      this.isProcessing = false;
    }
  }
}