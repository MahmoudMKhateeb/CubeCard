import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { OrderStatusService } from '../../services/order-status.service';
import { CartService } from '../../../../services/cart/cart.service';
import { Order } from '../../models/order.types';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Loading State -->
        <div *ngIf="loading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-cyber-accent-primary border-t-transparent"></div>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-lg text-center mb-6">
          {{ error }}
        </div>

        <ng-container *ngIf="order">
          <!-- Success Message -->
          <div class="bg-cyber-card rounded-lg p-8 text-center max-w-2xl mx-auto mb-8">
            <div class="w-16 h-16 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 class="text-2xl font-bold text-cyber-text-primary mb-2">تم الطلب بنجاح!</h1>
            <p class="text-cyber-text-secondary mb-4">شكراً لك! تم استلام طلبك وسيتم معالجته قريباً.</p>
            <p class="text-cyber-text-primary">رقم الطلب: {{order.uuid}}</p>
            <p class="text-cyber-text-secondary mt-2">
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

          <!-- Order Details -->
          <div class="bg-cyber-card rounded-lg p-8 max-w-2xl mx-auto">
            <h2 class="text-xl font-semibold text-cyber-text-primary mb-6">تفاصيل الطلب</h2>
            
            <!-- Order Items -->
            <div class="space-y-6">
              <div *ngFor="let item of order.items" class="flex gap-4 pb-6 border-b border-cyber-border last:border-0">
                <div class="w-16 h-16 bg-cyber-surface rounded-lg p-2 flex items-center justify-center overflow-hidden">
                  <img *ngIf="item.product_image" [src]="item.product_image" [alt]="item.product_name" 
                       class="w-full h-full object-contain">
                  <span *ngIf="!item.product_image" class="text-2xl">🎮</span>
                </div>
                <div class="flex-grow">
                  <h3 class="font-medium text-cyber-text-primary">{{item.product_name}}</h3>
                  <p class="text-sm text-cyber-text-secondary">الكمية: {{item.quantity}}</p>
                  <p class="text-sm text-cyber-text-secondary">
                    السعر: {{item.display_price}} {{item.display_currency}}
                    <span *ngIf="item.display_currency !== 'SAR'" class="text-xs text-cyber-text-secondary mr-2">
                      ({{item.sar_price}} ر.س)
                    </span>
                  </p>
                  
                  <!-- Serial Keys -->
                  <div *ngIf="item.serial_keys?.length" class="mt-4">
                    <div *ngFor="let key of item.serial_keys" class="text-sm">
                      <span class="text-cyber-text-secondary">رقم البطاقة:</span>
                      <code class="ml-2 font-mono text-cyber-accent-primary">{{key}}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="mt-6 pt-6 border-t border-cyber-border">
              <div class="flex justify-between text-xl font-bold text-cyber-text-primary">
                <span>الإجمالي</span>
                <span>{{order.total_amount}} ر.س</span>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  order: Order | null = null;
  loading = true;
  error: string | null = null;
  orderStatus: string | null = null;
  private statusSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderStatusService: OrderStatusService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('id');
    const sessionId = this.route.snapshot.queryParamMap.get('session_id');

    if (!uuid) {
      this.error = 'رقم الطلب غير صالح';
      this.loading = false;
      return;
    }

    // Get order status
    this.orderStatusService.getOrderStatus(uuid).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.order = response.data.order;
          this.orderStatus = response.data.status;
          
          // If order is successful, clear cart
          if (response.data.status === 'success') {
            this.cartService.clearCart();
          }
          // If order is not in a success state, check status
          else if (response.data.status !== 'failed' && response.data.status !== 'contactSupport') {
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

  private startPolling(uuid: string): void {
    this.statusSubscription = this.orderStatusService.getCurrentOrder().subscribe(response => {
      if (response?.status === 'success') {
        this.order = response.data.order;
        this.orderStatus = response.data.status;
        if (response.data.status === 'success') {
          this.cartService.clearCart();
          this.orderStatusService.stopStatusPolling();
        }
      }
    });
    this.orderStatusService.startStatusPolling(uuid);
  }
}