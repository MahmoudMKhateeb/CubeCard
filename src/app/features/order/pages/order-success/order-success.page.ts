import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatusService } from '../../services/order-status.service';
import { OrderStatus } from '../../types/order.types';
import { Subscription } from 'rxjs';
import { OtpDialogComponent } from '../../components/otp-dialog/otp-dialog.component';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule, OtpDialogComponent],
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Success Message -->
        <div class="bg-cyber-card rounded-lg p-8 mb-8 text-center">
          <div class="w-16 h-16 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-cyber-text-primary mb-2">شكراً لك!</h1>
          <p class="text-cyber-text-secondary mb-4">تم استلام طلبك بنجاح</p>
          
          <!-- Order Status -->
          <div class="flex items-center justify-center gap-2 mb-6">
            <span class="text-sm text-cyber-text-secondary">حالة الطلب:</span>
            <span [class]="getStatusClass()">{{getStatusText()}}</span>
          </div>
        </div>

        <!-- Order Details -->
        <div class="bg-cyber-card rounded-lg p-8" *ngIf="orderStatus">
          <div class="border-b border-cyber-border pb-6 mb-6">
            <h2 class="text-xl font-semibold text-cyber-text-primary mb-4">تفاصيل الطلب</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <span class="text-cyber-text-secondary">رقم الطلب:</span>
                <span class="text-cyber-text-primary mr-2">{{orderStatus.orderId}}</span>
              </div>
              <div>
                <span class="text-cyber-text-secondary">تاريخ الطلب:</span>
                <span class="text-cyber-text-primary mr-2">{{orderStatus.createdAt | date:'medium'}}</span>
              </div>
              <div>
                <span class="text-cyber-text-secondary">طريقة الدفع:</span>
                <span class="text-cyber-text-primary mr-2">{{orderStatus.paymentMethod}}</span>
              </div>
              <div>
                <span class="text-cyber-text-secondary">المبلغ الإجمالي:</span>
                <span class="text-cyber-text-primary mr-2">{{orderStatus.amount}} ر.س</span>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <h3 class="text-lg font-semibold text-cyber-text-primary mb-4">المنتجات</h3>
          <div class="space-y-6">
            <div *ngFor="let item of orderStatus.items" class="border-b border-cyber-border last:border-0 pb-6 last:pb-0">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <span class="text-cyber-text-primary">{{item.name}}</span>
                  <span class="text-cyber-text-secondary text-sm mr-2">x{{item.quantity}}</span>
                </div>
                <span class="text-cyber-text-primary">{{item.price}} ر.س</span>
              </div>

              <!-- View Serial Button (Only shown when order is completed) -->
              <div *ngIf="orderStatus.status === 'completed' && item.serials?.length"
                   class="mt-4">
                <button (click)="viewSerial(item)"
                        class="w-full bg-cyber-surface hover:bg-cyber-card transition-colors rounded-lg p-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-cyber-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span class="text-cyber-text-primary">عرض بيانات البطاقة</span>
                  </div>
                </button>

                <!-- Serial Info (Only shown after OTP verification) -->
                <div *ngIf="isOtpVerified && selectedItem === item"
                     class="bg-cyber-surface rounded-lg p-4 mt-4 animate-fade-in">
                  <h4 class="text-sm font-medium text-cyber-text-primary mb-3">بيانات البطاقات:</h4>
                  <div class="space-y-3">
                    <div *ngFor="let serial of item.serials"
                         class="flex flex-col gap-2 text-sm">
                      <div class="flex justify-between items-center">
                        <span class="text-cyber-text-secondary">رقم البطاقة:</span>
                        <code class="font-mono text-cyber-accent-primary">{{serial.code}}</code>
                      </div>
                      <div *ngIf="serial.pin" class="flex justify-between items-center">
                        <span class="text-cyber-text-secondary">رقم التفعيل:</span>
                        <code class="font-mono text-cyber-accent-primary">{{serial.pin}}</code>
                      </div>
                      <div class="flex justify-between items-center">
                        <span class="text-cyber-text-secondary">تاريخ الانتهاء:</span>
                        <span class="text-cyber-text-primary">{{serial.expiresAt | date:'shortDate'}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-center gap-4 mt-8">
          <a routerLink="/" class="px-6 py-2 bg-cyber-accent-primary text-white rounded-lg hover:bg-cyber-hover-primary transition-colors">
            العودة للرئيسية
          </a>
          <button (click)="downloadInvoice()" class="px-6 py-2 bg-cyber-surface text-cyber-text-primary rounded-lg hover:bg-cyber-card transition-colors">
            تحميل الفاتورة
          </button>
        </div>
      </div>

      <!-- OTP Dialog -->
      <app-otp-dialog
        *ngIf="showOtpDialog"
        (verified)="onOtpVerified()"
        (cancelled)="onOtpCancelled()"
      ></app-otp-dialog>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-fade-in {
        animation: none;
      }
    }
  `]
})
export class OrderSuccessPage implements OnInit, OnDestroy {
  orderStatus: OrderStatus | null = null;
  isOtpVerified = false;
  showOtpDialog = false;
  selectedItem: any = null;
  private statusSubscription?: Subscription;
  private otpSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderStatusService: OrderStatusService
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log(orderId);
    if (orderId) {
      this.statusSubscription = this.orderStatusService.getOrderStatus(orderId)
        .subscribe({
          next: (status) => {
            this.orderStatus = status;
            if (status.status === 'failed') {
              this.router.navigate(['/order/failed', orderId]);
            }
          },
          error: (error) => {
            console.error('Error fetching order status:', error);
            this.router.navigate(['/order/failed']);
          }
        });

      this.otpSubscription = this.orderStatusService.isOtpVerified()
        .subscribe(verified => {
          this.isOtpVerified = verified;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    if (this.otpSubscription) {
      this.otpSubscription.unsubscribe();
    }
  }

  viewSerial(item: any): void {
    if (!this.isOtpVerified) {
      this.showOtpDialog = true;
      this.selectedItem = item;
    } else {
      this.selectedItem = this.selectedItem === item ? null : item;
    }
  }

  onOtpVerified(): void {
    this.showOtpDialog = false;
    this.isOtpVerified = true;
  }

  onOtpCancelled(): void {
    this.showOtpDialog = false;
    this.selectedItem = null;
  }

  getStatusClass(): string {
    const baseClasses = 'text-sm font-medium px-2 py-1 rounded-full';
    switch (this.orderStatus?.status) {
      case 'completed':
        return `${baseClasses} bg-green-500 bg-opacity-10 text-green-500`;
      case 'processing':
        return `${baseClasses} bg-yellow-500 bg-opacity-10 text-yellow-500`;
      case 'pending':
        return `${baseClasses} bg-blue-500 bg-opacity-10 text-blue-500`;
      default:
        return `${baseClasses} bg-gray-500 bg-opacity-10 text-gray-500`;
    }
  }

  getStatusText(): string {
    switch (this.orderStatus?.status) {
      case 'completed':
        return 'مكتمل';
      case 'processing':
        return 'قيد المعالجة';
      case 'pending':
        return 'قيد الانتظار';
      default:
        return 'غير معروف';
    }
  }

  downloadInvoice(): void {
    if (this.orderStatus) {
      console.log(`Downloading invoice for order ${this.orderStatus.orderId}`);
    }
  }
}