import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Header -->
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-2xl font-bold text-cyber-text-primary">إتمام الطلب</h1>
          <div class="flex items-center gap-2">
            <span class="text-sm text-cyber-text-secondary">لديك سؤال؟</span>
            <a href="#" class="text-sm text-cyber-accent-primary hover:text-cyber-hover-primary">تواصل معنا</a>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Right Column - Personal Info & Payment -->
          <div class="space-y-6">
            <!-- Personal Information -->
            <div class="bg-cyber-card rounded-lg p-6 shadow-card">
              <h2 class="text-xl font-semibold mb-6 text-cyber-text-primary">البيانات الشخصية</h2>
              
              <div class="space-y-4">
                <!-- Phone Number -->
                <div>
                  <label class="block text-sm font-medium text-cyber-text-primary mb-1">
                    رقم الجوال
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="flex">
                    <select class="rounded-r-lg border border-cyber-border px-3 py-2 bg-cyber-surface text-cyber-text-primary">
                      <option value="+966">+966</option>
                    </select>
                    <input 
                      type="tel" 
                      placeholder="5xxxxxxxx"
                      class="flex-1 rounded-l-lg border border-r-0 border-cyber-border px-4 py-2 bg-cyber-surface text-cyber-text-primary focus:outline-none focus:ring-2 focus:ring-cyber-accent-primary"
                    >
                  </div>
                </div>

                <!-- Name Fields -->
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-cyber-text-primary mb-1">
                      الاسم الأول
                      <span class="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="مثال: أحمد"
                      class="w-full rounded-lg border border-cyber-border px-4 py-2 bg-cyber-surface text-cyber-text-primary focus:outline-none focus:ring-2 focus:ring-cyber-accent-primary"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-cyber-text-primary mb-1">
                      الاسم الأخير
                      <span class="text-red-500">*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="مثال: العائلة"
                      class="w-full rounded-lg border border-cyber-border px-4 py-2 bg-cyber-surface text-cyber-text-primary focus:outline-none focus:ring-2 focus:ring-cyber-accent-primary"
                    >
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-cyber-text-primary mb-1">
                    البريد الإلكتروني
                    <span class="text-red-500">*</span>
                  </label>
                  <input 
                    type="email"
                    placeholder="example@email.com"
                    class="w-full rounded-lg border border-cyber-border px-4 py-2 bg-cyber-surface text-cyber-text-primary focus:outline-none focus:ring-2 focus:ring-cyber-accent-primary"
                  >
                </div>
              </div>
            </div>

            <!-- Payment Methods -->
            <div class="bg-cyber-card rounded-lg p-6 shadow-card">
              <h2 class="text-xl font-semibold mb-6 text-cyber-text-primary">وسائل الدفع</h2>
              
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <button class="payment-method-button">
                  <img src="https://app.rasseed.com/files/visadc8ffe.png" alt="URPAY" class="h-8">
                  <span class="text-cyber-text-primary">URPAY</span>
                </button>

                <button class="payment-method-button">
                  <img src="https://app.rasseed.com/files/visadc8ffe.png" alt="مدى" class="h-8">
                  <span class="text-cyber-text-primary">مدى</span>
                </button>

                <button class="payment-method-button">
                  <img src="https://app.rasseed.com/files/visadc8ffe.png" alt="Visa" class="h-8">
                  <span class="text-cyber-text-primary">Visa</span>
                </button>

                <button class="payment-method-button selected">
                  <img src="https://app.rasseed.com/files/visadc8ffe.png" alt="Apple Pay" class="h-8">
                  <span class="text-cyber-text-primary">Apple Pay</span>
                </button>

                <button class="payment-method-button">
                  <img src="https://app.rasseed.com/files/visadc8ffe.png" alt="STC Pay" class="h-8">
                  <span class="text-cyber-text-primary">STC Pay</span>
                </button>

                <button class="payment-method-button">
                  <img src="https://app.rasseed.com/files/visadc8ffe.png" alt="Master Card" class="h-8">
                  <span class="text-cyber-text-primary">Master Card</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Left Column - Order Summary -->
          <div class="bg-cyber-card rounded-lg p-6 shadow-card h-fit">
            <h2 class="text-xl font-semibold mb-6 text-cyber-text-primary">ملخص طلبك</h2>

            <!-- Order Items -->
            <div class="space-y-4 mb-6">
              <div *ngFor="let item of cartService.getCartItems() | async" class="flex gap-4 items-start">
                <img 
                  [src]="item.product.image" 
                  [alt]="item.product.name"
                  class="w-16 h-16 object-contain rounded-lg bg-cyber-surface p-2"
                  (error)="handleImageError($event)"
                >
                <div class="flex-1">
                  <h3 class="font-medium text-cyber-text-primary">{{item.product.name}}</h3>
                  <div class="text-cyber-text-secondary">السعر: {{item.selectedPrice.amount}} {{item.selectedPrice.currency}}</div>
                  <div class="text-cyber-text-secondary">الكمية: {{item.quantity}}</div>
                </div>
              </div>
            </div>

            <!-- Discount Code -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-cyber-text-primary mb-2">كود الخصم</label>
              <div class="flex gap-2">
                <input 
                  type="text"
                  placeholder="xxxxx"
                  class="flex-1 rounded-lg border border-cyber-border px-4 py-2 bg-cyber-surface text-cyber-text-primary focus:outline-none focus:ring-2 focus:ring-cyber-accent-primary"
                >
                <button class="bg-cyber-accent-primary text-white px-6 py-2 rounded-lg hover:bg-cyber-hover-primary transition-colors">
                  فحص الكود
                </button>
              </div>
            </div>

            <!-- Total -->
            <div class="border-t border-cyber-border pt-4">
              <div class="flex justify-between items-center mb-2">
                <span class="text-cyber-text-secondary">المجموع الكلي</span>
                <span class="font-semibold text-cyber-text-primary">{{cartService.getTotal() * 1.15}} ر.س</span>
              </div>
              <div class="text-sm text-cyber-text-secondary text-left">شامل ضريبة القيمة المضافة</div>
            </div>

            <!-- Checkout Button -->
            <button class="w-full bg-cyber-accent-primary text-white py-3 rounded-lg mt-6 hover:bg-cyber-hover-primary transition-colors">
              الانتقال للدفع
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-method-button {
      @apply flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-cyber-border 
             bg-cyber-surface hover:border-cyber-accent-primary transition-colors text-center;
    }

    .payment-method-button.selected {
      @apply border-cyber-accent-primary bg-cyber-accent-primary bg-opacity-10;
    }

    @media (prefers-reduced-motion: reduce) {
      .transition-colors {
        transition: none;
      }
    }
  `]
})
export class PaymentPage {
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
}