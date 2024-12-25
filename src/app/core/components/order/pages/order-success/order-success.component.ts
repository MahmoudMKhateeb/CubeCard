import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatusService } from '../../services/order-status.service';
import { OrderOtpService } from '../../services/order-otp.service';
import { Order } from '../../models/order.types';
import { Subscription } from 'rxjs';
import { OrderOtpDialogComponent } from '../../components/order-otp-dialog/order-otp-dialog.component';
import { CartService } from "../../../../../services/cart.service";

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderOtpDialogComponent],
  templateUrl: 'order-success.component.html',
  styleUrls: ['order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  order: Order | null = null;
  showOtpDialog = false;
  selectedItem: any = null;
  private statusSubscription?: Subscription;
  private intervalId?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderStatusService: OrderStatusService,
    private orderOtpService: OrderOtpService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('id');
    if (uuid) {
      this.getOrderData(uuid);
      this.startStatusPolling(uuid);
    }
  }

  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private getOrderData(uuid: string): void {
    this.orderStatusService.getOrderStatus(uuid).subscribe({
      next: (order) => {
        this.order = order;
        if (order.status === 'failed') {
          this.router.navigate(['/order/failed', uuid]);
        }
      },
      error: () => {
        this.router.navigate(['/order/failed']);
      }
    });
  }

  private startStatusPolling(uuid: string): void {
    this.intervalId = window.setInterval(() => {
      this.getOrderData(uuid);
      if (this.order?.status === 'success') {
        clearInterval(this.intervalId);
      }
    }, 5000);
  }

  viewSerial(item: any): void {
    if (!this.orderOtpService.isOrderVerified(this.order?.uuid || '')) {
      this.showOtpDialog = true;
      this.selectedItem = item;
      this.orderOtpService.sendOrderOtp(this.order?.uuid || '').subscribe();
    } else {
      this.selectedItem = this.selectedItem === item ? null : item;
    }
  }

  onOtpVerified(): void {
    this.showOtpDialog = false;
  }

  onOtpCancelled(): void {
    this.showOtpDialog = false;
    this.selectedItem = null;
  }

  // ... rest of the component code remains the same
}