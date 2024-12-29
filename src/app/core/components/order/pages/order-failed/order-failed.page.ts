import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatusService } from '../../services/order-status.service';
import { Order, OrderStatusResponse } from '../../models/order.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-failed',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <div class="bg-cyber-card rounded-lg p-8 text-center max-w-2xl mx-auto">
          <!-- Loading State -->
          <div *ngIf="loading" class="flex justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-4 border-cyber-accent-primary border-t-transparent"></div>
          </div>

          <ng-container *ngIf="!loading">
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

            <!-- Error Details -->
            <div *ngIf="order" class="bg-cyber-surface rounded-lg p-4 mb-6 text-right">
              <h2 class="text-lg font-semibold text-cyber-text-primary mb-2">تفاصيل الطلب</h2>
              <div class="space-y-2">
                <p class="text-cyber-text-secondary text-sm">
                  رقم الطلب: {{order.uuid}}
                </p>
                <p class="text-cyber-text-secondary text-sm">
                  تاريخ الطلب: {{order.created_at | date:'medium'}}
                </p>
                <p class="text-cyber-text-secondary text-sm">
                  المبلغ: {{order.total_amount}} ر.س
                </p>
                <p class="text-cyber-text-secondary text-sm">
                  حالة الطلب: 
                  <span [ngClass]="{
                    'text-yellow-500': orderStatus === 'pending' || orderStatus === 'inProgress',
                    'text-red-500': orderStatus === 'failed' || orderStatus === 'contactSupport',
                    'text-green-500': orderStatus === 'success'
                  }">
                    {{getStatusText(orderStatus)}}
                  </span>
                </p>
              </div>
            </div>

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
              <button (click)="contactSupport()"
                      class="px-6 py-2 border border-cyber-border text-cyber-text-primary rounded-lg hover:bg-cyber-surface transition-colors">
                تواصل مع الدعم
              </button>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class OrderFailedPage implements OnInit, OnDestroy {
  order: Order | null = null;
  loading = true;
  error: string | null = null;
  orderStatus: string | null = null;
  private statusSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderStatusService: OrderStatusService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('id');
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (!uuid) {
      this.loading = false;
      return;
    }

    // Get order status
    this.orderStatusService.getOrderStatus(uuid).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.order = response.data.order;
          this.orderStatus = response.data.status;

          // If order is not in a failed state, check status
          if (response.data.status !== 'failed' && response.data.status !== 'contactSupport') {
            this.startPolling(uuid);
          }
        } else {
          this.error = response.message;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading order:', error);
        this.error = 'حدث خطأ أثناء تحميل تفاصيل الطلب';
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    this.orderStatusService.stopStatusPolling();
  }

  getErrorMessage(): string {
    if (this.orderStatus === 'contactSupport') {
      return 'يرجى التواصل مع خدمة العملاء للمساعدة في إتمام طلبك.';
    }
    return 'حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى أو التواصل مع خدمة العملاء.';
  }

  getStatusText(status: string | null): string {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'inProgress':
        return 'قيد المعالجة';
      case 'success':
        return 'مكتمل';
      case 'failed':
        return 'فشل';
      case 'contactSupport':
        return 'يرجى التواصل مع الدعم';
      case 'onHold':
        return 'معلق';
      default:
        return 'غير معروف';
    }
  }

  retryPayment(): void {
    if (this.order) {
      this.router.navigate(['/payment'], {
        queryParams: { retry: this.order.uuid }
      });
    } else {
      this.router.navigate(['/cart']);
    }
  }

  contactSupport(): void {
    window.location.href = 'mailto:support@cubecard.net';
  }

  private startPolling(uuid: string): void {
    this.statusSubscription = this.orderStatusService.getCurrentOrder().subscribe(response => {
      if (response?.status === 'success') {
        this.order = response.data.order;
        this.orderStatus = response.data.status;
        if (response.data.status === 'failed' || response.data.status === 'contactSupport') {
          this.orderStatusService.stopStatusPolling();
        }
      }
    });
    this.orderStatusService.startStatusPolling(uuid);
  }
}