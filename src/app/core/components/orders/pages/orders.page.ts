import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class OrdersPage implements OnInit {
  orders: Order[] = [];
  loading = true;
  error = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading = true;
    this.error = '';

    this.orderService.getUserOrders().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.orders = response.data;
        } else {
          this.error = response.message || 'حدث خطأ أثناء تحميل الطلبات';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'حدث خطأ أثناء تحميل الطلبات';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
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

  getStatusText(status: string): string {
    switch (status) {
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
}