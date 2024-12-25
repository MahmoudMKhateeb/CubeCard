import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { OrderStatusService } from '../../order/services/order-status.service';
import { PaymentOtpService } from '../services/payment-otp.service';
import { UserProfileService } from '../../../services/user-profile.service';
import { PhoneInputComponent } from '../components/phone-input/phone-input.component';
import { PhoneVerificationDialogComponent } from '../components/phone-verification-dialog/phone-verification-dialog.component';
import { PaymentForm, PaymentErrors, PaymentTouched } from '../models/payment.types';
import { PaymentValidator } from '../utils/payment-validator';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PhoneInputComponent,
    PhoneVerificationDialogComponent
  ]
})
export class PaymentComponent implements OnInit {
  form: PaymentForm = {
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    paymentMethod: ''
  };

  errors: PaymentErrors = {
    phone: null,
    firstName: null,
    lastName: null,
    email: null,
    paymentMethod: null,
    general: null
  };

  touched: PaymentTouched = {
    phone: false,
    firstName: false,
    lastName: false,
    email: false,
    paymentMethod: false
  };

  showVerificationDialog = false;
  isProcessing = false;

  constructor(
    public cartService: CartService,
    public paymentOtpService: PaymentOtpService,
    private userProfileService: UserProfileService,
    private orderStatusService: OrderStatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    this.userProfileService.getCurrentUserProfile().subscribe(profile => {
      this.form.firstName = profile.first_name;
      this.form.lastName = profile.last_name;
      this.form.email = profile.email;
      this.form.phone = profile.mobile_number;
    });
  }

  onFieldBlur(field: keyof PaymentTouched): void {
    this.touched[field] = true;
    this.validateField(field);
  }

  validateField(field: keyof PaymentForm): void {
    switch (field) {
      case 'phone':
        this.errors.phone = PaymentValidator.validatePhone(this.form.phone);
        break;
      case 'firstName':
        this.errors.firstName = PaymentValidator.validateName(this.form.firstName, 'الاسم الأول');
        break;
      case 'lastName':
        this.errors.lastName = PaymentValidator.validateName(this.form.lastName, 'الاسم الأخير');
        break;
      case 'email':
        this.errors.email = PaymentValidator.validateEmail(this.form.email);
        break;
      case 'paymentMethod':
        this.errors.paymentMethod = PaymentValidator.validatePaymentMethod(this.form.paymentMethod);
        break;
    }
  }

  startVerification(): void {
    this.showVerificationDialog = true;
    this.paymentOtpService.sendPaymentOtp(this.form.phone).subscribe();
  }

  onPhoneVerified(): void {
    this.showVerificationDialog = false;
  }

  async processPayment(): Promise<void> {
    if (this.isProcessing || !this.isFormValid()) return;

    this.validateAllFields();
    
    if (!this.paymentOtpService.isPhoneVerified(this.form.phone)) {
      this.startVerification();
      return;
    }

    this.isProcessing = true;

    try {
      const cartItems = await this.cartService.getCartItems().toPromise();
      if (!cartItems) throw new Error('Cart is empty');

      const orderData = {
        customer_phone: this.form.phone,
        customer_name: `${this.form.firstName} ${this.form.lastName}`,
        customer_email: this.form.email,
        cart_items: cartItems.map(item => ({
          product_uuid: item.product.uuid,
          quantity: item.quantity,
          price: parseFloat(item.selectedPrice.amount),
          region: "KSA",
          currency: item.selectedPrice.currency
        })),
        total_amount: this.cartService.getTotal(),
        payment_method: this.form.paymentMethod,
        order_notes: ''
      };

      this.orderStatusService.createOrder(orderData);
    } catch (error) {
      console.error('Error processing payment:', error);
      this.router.navigate(['/order/failed']);
    }
  }

  private validateAllFields(): void {
    (Object.keys(this.form) as Array<keyof PaymentForm>).forEach(field => {
      this.touched[field] = true;
      this.validateField(field);
    });
  }

  // Changed from private to public so it can be accessed in the template
  isFormValid(): boolean {
    return !Object.values(this.errors).some(error => error !== null) &&
           this.paymentOtpService.isPhoneVerified(this.form.phone);
  }
}
