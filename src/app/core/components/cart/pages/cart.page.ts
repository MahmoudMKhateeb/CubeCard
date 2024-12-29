import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../services/cart/cart.service';
import { validateQuantity } from '../../../utils/cart.utils';
import { Cart } from '../../../models/cart.types';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Loading State -->
        <div *ngIf="cartService.loading$ | async" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-cyber-accent-primary border-t-transparent"></div>
        </div>

        <!-- Empty Cart -->
        <div *ngIf="!(cartService.loading$ | async) && (cartService.cart$ | async) as cart">
          <ng-container *ngIf="cart.items.length === 0">
            <div class="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-cyber-text-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <h2 class="text-xl font-semibold mb-2 text-cyber-text-primary">سلة المشتريات فارغة</h2>
              <p class="text-cyber-text-secondary mb-4">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
              <a routerLink="/" class="inline-block bg-cyber-accent-primary text-white px-6 py-2 rounded-lg hover:bg-cyber-hover-primary transition-colors">
                تصفح المنتجات
              </a>
            </div>
          </ng-container>

          <!-- Cart Items -->
          <ng-container *ngIf="cart.items.length > 0">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Cart Items List -->
              <div class="lg:col-span-2">
                <div class="bg-cyber-card rounded-lg shadow-card">
                  <div class="p-6">
                    <h2 class="text-xl font-semibold mb-6 text-cyber-text-primary">سلة المشتريات</h2>
                    
                    <!-- Cart Items -->
                    <div class="space-y-6">
                      <div *ngFor="let item of cart.items" 
                           class="flex gap-4 pb-6 border-b border-cyber-border last:border-0">
                        <!-- Product Image -->
                        <div class="w-24 h-24 bg-cyber-surface rounded-lg p-2 flex items-center justify-center">
                          <img [src]="item.product_image"
                               [alt]="item.product_name"
                               class="w-full h-full object-contain"
                               (error)="handleImageError($event)">
                        </div>

                        <!-- Product Info -->
                        <div class="flex-grow">
                          <h3 class="font-medium text-cyber-text-primary mb-2">{{item.product_name}}</h3>
                          <div class="text-sm text-cyber-text-secondary mb-4">
                            {{item.price}} {{item.currency}}
                          </div>

                          <!-- Quantity Controls -->
                          <div class="flex items-center gap-4">
                            <div class="flex items-center border border-cyber-border rounded-lg">
                              <button (click)="updateQuantity(item.id, item.quantity - 1)"
                                      [disabled]="!validateQuantity(item.quantity - 1)"
                                      class="px-3 py-1 text-cyber-text-secondary hover:text-cyber-text-primary disabled:opacity-50">
                                -
                              </button>
                              <span class="px-3 py-1 border-x border-cyber-border text-cyber-text-primary">
                                {{item.quantity}}
                              </span>
                              <button (click)="updateQuantity(item.id, item.quantity + 1)"
                                      [disabled]="!validateQuantity(item.quantity + 1)"
                                      class="px-3 py-1 text-cyber-text-secondary hover:text-cyber-text-primary disabled:opacity-50">
                                +
                              </button>
                            </div>
                            <button (click)="removeItem(item.id)"
                                    class="text-red-500 hover:text-red-600">
                              حذف
                            </button>
                          </div>
                        </div>

                        <!-- Price -->
                        <div class="text-left">
                          <div class="font-semibold text-cyber-text-primary">
                            {{item.subtotal}} {{item.currency}}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="lg:col-span-1">
                <div class="bg-cyber-card rounded-lg shadow-card p-6">
                  <h2 class="text-xl font-semibold mb-6 text-cyber-text-primary">ملخص الطلب</h2>
                  
                  <div class="space-y-4">
                    <div class="flex justify-between text-cyber-text-primary">
                      <span>المجموع</span>
                      <span>{{cart.total_amount}} {{getCartCurrency(cart)}}</span>
                    </div>
                    <div class="flex justify-between text-cyber-text-primary">
                      <span>الضريبة (15%)</span>
                      <span>{{cart.total_amount * 0.15}} {{getCartCurrency(cart)}}</span>
                    </div>
                    <div class="border-t border-cyber-border pt-4">
                      <div class="flex justify-between font-semibold text-cyber-text-primary">
                        <span>الإجمالي</span>
                        <span>{{cart.total_amount * 1.15}} {{getCartCurrency(cart)}}</span>
                      </div>
                    </div>
                  </div>

                  <button routerLink="/payment" 
                          class="w-full bg-cyber-accent-primary text-white py-3 rounded-lg mt-6 hover:bg-cyber-hover-primary transition-colors">
                    إتمام الشراء
                  </button>
                </div>
              </div>
            </div>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class CartPage {
  validateQuantity = validateQuantity;
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(public cartService: CartService) {}

  updateQuantity(itemId: number, quantity: number): void {
    if (this.validateQuantity(quantity)) {
      this.cartService.updateQuantity(itemId, quantity).subscribe();
    }
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe();
  }

  getCartCurrency(cart: Cart): string {
    return cart.currency || (cart.items[0]?.currency || 'SAR');
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
}