import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-payment',
  standalone: true,
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <span class="text-cyber-text-secondary whitespace-nowrap">وسائل الدفع</span>
      <div class="flex flex-wrap gap-3">
        <img src="/assets/images/payment/visa.png" alt="Visa" class="h-8 w-auto">
        <img src="/assets/images/payment/mastercard.png" alt="Mastercard" class="h-8 w-auto">
        <img src="/assets/images/payment/mada.png" alt="Mada" class="h-8 w-auto">
        <img src="/assets/images/payment/stc-pay.png" alt="STC Pay" class="h-8 w-auto">
      </div>
    </div>
  `
})
export class FooterPaymentComponent {}