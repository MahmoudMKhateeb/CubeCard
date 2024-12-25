import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../models/order.models';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Loading State -->
        <div *ngIf="loading" class="flex justify-center items-center min-h-[400px]">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-cyber-accent-primary border-t-transparent"></div>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-lg text-center mb-6">
          {{ error }}
        </div>

        <!-- Order Details -->
        <ng-container *ngIf="!loading && !error && order">
          <!-- Breadcrumb -->
          <nav class="mb-8" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-4">
              <li>
                <a routerLink="/orders" class="text-cyber-text-secondary hover:text-cyber-accent-primary">طلباتي</a>
              </li>
              <li>
                <span class="mx-2 text-cyber-border">/</span>
                <span class="text-cyber-text-primary">تفاصيل الطلب #{{order.uuid}}</span>
              </li>
            </ol>
          </nav>

          <!-- Order Summary -->
          <div class="bg-cyber-card rounded-lg p-6 mb-6">
            <div class="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div>
                <h1 class="text-2xl font-bold text-cyber-text-primary mb-2">تفاصيل الطلب #{{order.uuid}}</h1>
                <p class="text-cyber-text-secondary">{{order.timestamps.created_at | date:'medium'}}</p>
              </div>
              <div class="flex items-center gap-4">
                <span [class]="getStatusClass()">
                  {{getStatusText()}}
                </span>
                <span class="text-xl font-bold text-cyber-text-primary">
                  {{order.payment.total_amount}} {{order.payment.currency}}
                </span>
              </div>
            </div>

            <!-- Customer Info -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-cyber-border">
              <div>
                <h3 class="text-sm font-medium text-cyber-text-secondary mb-1">اسم العميل</h3>
                <p class="text-cyber-text-primary">{{order.customer.name}}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-cyber-text-secondary mb-1">البريد الإلكتروني</h3>
                <p class="text-cyber-text-primary">{{order.customer.email}}</p>
              </div>
              <div>
                <h3 class="text-sm font-medium text-cyber-text-secondary mb-1">رقم الجوال</h3>
                <p class="text-cyber-text-primary">{{order.customer.phone}}</p>
              </div>
            </div>

            <!-- Order Items -->
            <div class="space-y-6">
              <h2 class="text-xl font-semibold text-cyber-text-primary mb-4">المنتجات</h2>
              <div *ngFor="let item of order.items" class="flex gap-4 p-4 bg-cyber-surface rounded-lg">
                <!-- Product Image -->
                <img [src]="item.product.image" 
                     [alt]="item.product.name"
                     class="w-16 h-16 object-contain rounded-lg bg-cyber-card p-2"
                     (error)="handleImageError($event)">
                
                <!-- Product Details -->
                <div class="flex-grow">
                  <h3 class="font-medium text-cyber-text-primary mb-1">{{item.product.name}}</h3>
                  <div class="text-sm text-cyber-text-secondary">
                    الكمية: {{item.quantity}} × {{item.product.price}} {{item.product.currency}}
                  </div>
                  
                  <!-- Serial Keys -->
                  <div *ngIf="item.serial_keys?.length" class="mt-4">
                    <div *ngFor="let key of item.serial_keys" class="text-sm">
                      <span class="text-cyber-text-secondary">رقم البطاقة:</span>
                      <code class="ml-2 font-mono text-cyber-accent-primary">{{key.key}}</code>
                    </div>
                  </div>
                </div>

                <!-- Item Total -->
                <div class="text-right">
                  <span class="font-semibold text-cyber-text-primary">
                    {{item.total}} {{item.product.currency}}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `
})
export class OrderDetailsPage implements OnInit {
  order: Order | null = null;
  loading = true;
  error = '';
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      this.loadOrderDetails(uuid);
    } else {
      this.error = 'رقم الطلب غير صحيح';
      this.loading = false;
    }
  }

  private loadOrderDetails(uuid: string): void {
    this.orderService.getOrderDetails(uuid).subscribe({
      next: (response) => {
        if (response.status === 'success' && response.data) {
          this.order = response.data;
        } else {
          this.error = response.message || 'حدث خطأ أثناء تحميل تفاصيل الطلب';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'حدث خطأ أثناء تحميل تفاصيل الطلب';
        this.loading = false;
      }
    });
  }

  getStatusClass(): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (this.order?.status) {
      case 'success':
        return `${baseClasses} bg-green-500 bg-opacity-10 text-green-500`;
      case 'pending':
        return `${baseClasses} bg-yellow-500 bg-opacity-10 text-yellow-500`;
      case 'failed':
        return `${baseClasses} bg-red-500 bg-opacity-10 text-red-500`;
      case 'inProgress':
        return `${baseClasses} bg-blue-500 bg-opacity-10 text-blue-500`;
      case 'onHold':
        return `${baseClasses} bg-purple-500 bg-opacity-10 text-purple-500`;
      default:
        return `${baseClasses} bg-gray-500 bg-opacity-10 text-gray-500`;
    }
  }

  getStatusText(): string {
    switch (this.order?.status) {
      case 'success':
        return 'مكتمل';
      case 'pending':
        return 'قيد الانتظار';
      case 'failed':
        return 'فشل';
      case 'inProgress':
        return 'قيد التنفيذ';
      case 'onHold':
        return 'معلق';
      case 'contactSupport':
        return 'يرجى التواصل مع الدعم';
      default:
        return 'غير معروف';
    }
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
}