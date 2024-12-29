import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../../../services/order/order.service';

@Component({
  selector: 'app-order-failed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <div class="bg-cyber-card rounded-lg p-8 text-center max-w-2xl mx-auto">
          <!-- Error Icon -->
          <div class="w-16 h-16 bg-red-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <!-- Error Message -->
          <h1 class="text-2xl font-bold text-cyber-text-primary mb-2">
            عذراً، فشلت عملية الدفع
          </h1>
          <p class="text-cyber-text-secondary mb-6">
            {{getErrorMessage()}}
          </p>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button (click)="retryPayment()"
                    class="px-6 py-2 bg-cyber-accent-primary text-white rounded-lg hover:bg-cyber-hover-primary transition-colors">
              إعادة المحاولة
            </button>
            <a routerLink="/cart"
               class="px-6 py-2 bg-cyber-surface text-cyber-text-primary rounded-lg hover:bg-cyber-card transition-colors">
              العودة لسلة المشتريات
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class OrderFailedComponent implements OnInit {
  constructor(
    public orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('id');
    if (uuid) {
      this.orderService.getOrder(uuid).subscribe();
    }
  }

  getErrorMessage(): string {
    const order = this.orderService.currentOrder$.getValue();
    if (order?.status === 'contactSupport') {
      return 'يرجى التواصل مع خدمة العملاء للمساعدة في إتمام طلبك.';
    }
    return 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.';
  }

  retryPayment(): void {
    this.router.navigate(['/cart']);
  }
}