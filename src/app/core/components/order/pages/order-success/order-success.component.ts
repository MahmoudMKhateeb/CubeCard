import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStatusService } from '../../services/order-status.service';
import { OtpService } from '../../services/otp.service';
import { Order } from '../../models/order.types';
import { Subscription } from 'rxjs';
import { OtpDialogComponent } from '../../components/otp-dialog/otp-dialog.component';
import {CartService} from "../../../../../services/cart.service";

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule, OtpDialogComponent],
  templateUrl: 'order-success.component.html',
  styleUrls: ['order-success.component.css'],
})
export class OrderSuccessComponent implements OnInit, OnDestroy {
  order: Order | null = null;
  isOtpVerified = false;
  showOtpDialog = false;
  selectedItem: any = null;
  private statusSubscription?: Subscription;
  private otpSubscription?: Subscription;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private orderStatusService: OrderStatusService,
      private otpService: OtpService,
      private cartService: CartService
  ) {}

  intervalId: any; // Declare intervalId as a class property

  ngOnInit(): void {
    const uuid = this.route.snapshot.paramMap.get('id');
    if (uuid) {
      this.getOrderData(uuid);
      this.intervalId = setInterval(() => {
        this.getOrderData(uuid);

        // Clear interval if order status is "success"
        if (this.order?.status === "success") {
          clearInterval(this.intervalId);
          console.log('Interval cleared');
        }
      }, 5000);
    }
  }


  private getOrderData(uuid: string) {
    this.statusSubscription = this.orderStatusService.getOrderStatus(uuid)
        .subscribe({
          next: (order) => {
            this.order = order;
            if (order.status === 'failed') {
              this.router.navigate(['/order/failed', uuid]);
            }
          },
          error: (error) => {
            console.error('Error fetching order status:', error);
            this.router.navigate(['/order/failed']);
          }
        });

    this.otpSubscription = this.otpService.isOtpVerified()
        .subscribe(verified => {
          this.isOtpVerified = verified;
        });
    this.cartService.clearCart();
  }
  ngOnDestroy(): void {
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
    if (this.otpSubscription) {
      this.otpSubscription.unsubscribe();
    }
    clearInterval(this.intervalId);
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
    console.log("Otp Verified");
    this.showOtpDialog = false;
    this.isOtpVerified = true;
  }

  onOtpCancelled(): void {
    this.showOtpDialog = false;
    this.selectedItem = null;
  }

  getStatusClass(): string {
    const baseClasses = 'text-sm font-medium px-2 py-1 rounded-full';
    switch (this.order?.status) {
      case 'success':
        return `${baseClasses} bg-green-500 bg-opacity-10 text-green-500`;
      case 'inProgress':
        return `${baseClasses} bg-yellow-500 bg-opacity-10 text-yellow-500`;
      case 'pending':
        return `${baseClasses} bg-yellow-500 bg-opacity-10 text-yellow-500`;
      case 'onHold':
        return `${baseClasses} bg-blue-500 bg-opacity-10 text-blue-500`;
      default:
        return `${baseClasses} bg-gray-500 bg-opacity-10 text-gray-500`;
    }
  }

  getStatusText(): string {
    switch (this.order?.status) {
      case 'success':
        return 'مكتمل';
      case 'inProgress':
        return 'قيد المعالجة';
      case 'onHold':
        return 'تحت المراجعة';
      case 'pending':
        return 'بانتظار الدفع';
      default:
        return 'غير معروف';
    }
  }

  downloadInvoice(): void {
    if (this.order) {
      console.log(`Downloading invoice for order ${this.order.uuid}`);
    }
  }

  decryptSerial(serial:any) {
    return "123123";
  }
}