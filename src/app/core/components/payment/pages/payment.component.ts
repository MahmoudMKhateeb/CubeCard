import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { PhoneVerificationService } from '../services/phone-verification.service';
import { PaymentFormValidator } from '../validators/payment-form.validator';
import { PaymentForm, ValidationErrors } from '../models/payment-form.model';
import { PhoneVerificationDialogComponent } from '../components/phone-verification-dialog/phone-verification-dialog.component';
import { PhoneInputComponent } from '../components/phone-input/phone-input.component';
import { OrderStatusService } from '../../order/services/order-status.service';
import { firstValueFrom } from 'rxjs';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PhoneVerificationDialogComponent,
    PhoneInputComponent
  ]
})
export class PaymentComponent implements OnInit{
  form: PaymentForm = {
    phone: '',
    firstName: '',
    lastName: '',
    email: '',
    paymentMethod: ''
  };

  errors: ValidationErrors = {
    phone: null,
    firstName: null,
    lastName: null,
    email: null,
    paymentMethod: null
  };

  touched: Record<string, boolean> = {
    phone: false,
    firstName: false,
    lastName: false,
    email: false,
    paymentMethod: false
  };

  showVerificationDialog = false;
  isProcessing = false;

  paymentMethods = [
    { id: 'visa', name: 'Visa', icon: 'https://app.rasseed.com/files/visadc8ffe.png' },
  ];

  constructor(
    public cartService: CartService,
    public verificationService: PhoneVerificationService,
    private orderStatusService: OrderStatusService,
    private router: Router
  ) {

  }
  ngOnInit() {
    this.cartService.getCartItems().subscribe(result => {
      result.length == 0 ? this.router.navigateByUrl('/cart') : console.log(result);
    })
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';
    }
  }

  selectPaymentMethod(methodId: string): void {
    this.form.paymentMethod = methodId;
    this.touched['paymentMethod'] = true;
    this.validateField('paymentMethod');
  }

  onFieldBlur(field: keyof PaymentForm): void {
    this.touched[field] = true;
    this.validateField(field);
  }

  validateField(field: keyof PaymentForm): void {
    switch (field) {
      case 'phone':
        this.errors['phone'] = PaymentFormValidator.validatePhone(this.form.phone);
        break;
      case 'firstName':
        this.errors['firstName'] = PaymentFormValidator.validateName(this.form.firstName, 'الاسم الأول');
        break;
      case 'lastName':
        this.errors['lastName'] = PaymentFormValidator.validateName(this.form.lastName, 'الاسم الأخير');
        break;
      case 'email':
        this.errors['email'] = PaymentFormValidator.validateEmail(this.form.email);
        break;
      case 'paymentMethod':
        this.errors['paymentMethod'] = PaymentFormValidator.validatePaymentMethod(this.form.paymentMethod);
        break;
    }
  }

  validateAllFields(): void {
    Object.keys(this.form).forEach(field => {
      this.touched[field as keyof PaymentForm] = true;
      this.validateField(field as keyof PaymentForm);
    });
  }

  startVerification(): void {
    if (!this.errors['phone'] && !this.verificationService.isPhoneVerified(this.form.phone)) {
      this.showVerificationDialog = true;
      this.verificationService.sendOtp(this.form.phone).subscribe();
    }
  }

  onPhoneVerified(): void {
    this.showVerificationDialog = false;
  }

  hasError(field: keyof PaymentForm): boolean {
    return !!this.errors[field];
  }

  isFormValid(): boolean {
    return !Object.values(this.errors).some(error => error !== null) &&
           this.verificationService.isPhoneVerified(this.form.phone);
  }

  async processPayment(): Promise<void> {
    if (this.isProcessing || !this.isFormValid()) return;

    this.validateAllFields();
    this.isProcessing = true;
    try {
      this.isProcessing = true;
      const cartItems = await firstValueFrom(this.cartService.getCartItems());
      const transformedCart = cartItems.map(item => ({
        product_uuid: item.product.uuid,
        quantity: item.quantity,
        price: parseFloat(item.selectedPrice.amount),
        region: "KSA",
        currency: item.selectedPrice.currency
      }));

      const orderData = {
        customer_phone: this.form.phone,
        customer_name: `${this.form.firstName} ${this.form.lastName}`,
        customer_email: this.form.email,
        status: 'pending',
        cart_items: transformedCart,
        total_amount: this.cartService.getTotal(),
        payment_method: this.form.paymentMethod,
        order_notes: 'Test order',
      };
      this.orderStatusService.createOrder(orderData);
      this.cartService.clearCart();
    } catch (error) {
      console.error('Error processing payment:', error);
      this.router.navigate(['/order/failed']);
    } finally {
      this.isProcessing = false;
    }
  }

}