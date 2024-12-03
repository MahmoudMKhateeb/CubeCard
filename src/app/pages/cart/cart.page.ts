import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.interface';

@Component({
  selector: 'app-cart-page',
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Breadcrumb -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-4">
            <li>
              <a routerLink="/" class="text-cyber-text-secondary hover:text-cyber-accent-primary">الرئيسية</a>
            </li>
            <li>
              <span class="mx-2 text-cyber-border">/</span>
              <span class="text-cyber-text-primary">سلة المشتريات</span>
            </li>
          </ol>
        </nav>

        <ng-container *ngIf="cart$ | async as cart">
          <!-- Empty Cart -->
          <div *ngIf="cart.items.length === 0" class="text-center py-12">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-cyber-text-secondary mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 class="text-xl font-semibold mb-2 text-cyber-text-primary">سلة المشتريات فارغة</h2>
            <p class="text-cyber-text-secondary mb-4">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
            <a routerLink="/" class="inline-block bg-cyber-accent-primary text-white px-6 py-2 rounded-lg hover:bg-cyber-hover-primary transition-colors">
              تصفح المنتجات
            </a>
          </div>

          <!-- Cart Items -->
          <div *ngIf="cart.items.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Cart Items List -->
            <div class="lg:col-span-2">
              <div class="bg-cyber-card rounded-lg shadow-card">
                <div class="p-6">
                  <h2 class="text-xl font-semibold mb-6 text-cyber-text-primary">سلة المشتريات</h2>
                  
                  <!-- Cart Items -->
                  <div class="space-y-6">
                    <div *ngFor="let item of cart.items" class="flex gap-4 pb-6 border-b border-cyber-border last:border-0">
                      <!-- Product Image -->
                      <div class="w-24 h-24">
                        <img [src]="item.image" 
                             [alt]="item.name"
                             class="w-full h-full object-contain">
                      </div>

                      <!-- Product Info -->
                      <div class="flex-grow">
                        <h3 class="font-medium text-cyber-text-primary mb-2">{{item.name}}</h3>
                        <div class="text-sm text-cyber-text-secondary mb-4">
                          {{item.price.amount}} {{item.price.currency}}
                        </div>

                        <!-- Quantity Controls -->
                        <div class="flex items-center gap-4">
                          <div class="flex items-center border border-cyber-border rounded-lg">
                            <button (click)="updateQuantity(item, item.quantity - 1)"
                                    class="px-3 py-1 text-cyber-text-secondary hover:text-cyber-text-primary">
                              -
                            </button>
                            <span class="px-3 py-1 border-x border-cyber-border text-cyber-text-primary">{{item.quantity}}</span>
                            <button (click)="updateQuantity(item, item.quantity + 1)"
                                    class="px-3 py-1 text-cyber-text-secondary hover:text-cyber-text-primary">
                              +
                            </button>
                          </div>
                          <button (click)="removeFromCart(item.id)"
                                  class="text-red-500 hover:text-red-600">
                            حذف
                          </button>
                        </div>
                      </div>

                      <!-- Price -->
                      <div class="text-left">
                        <div class="font-semibold text-cyber-text-primary">
                          {{calculateItemTotal(item)}} {{item.price.currency}}
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
                    <span>{{cart.total}} ر.س</span>
                  </div>
                  <div class="flex justify-between text-cyber-text-primary">
                    <span>الضريبة (15%)</span>
                    <span>{{calculateTax(cart.total)}} ر.س</span>
                  </div>
                  <div class="border-t border-cyber-border pt-4">
                    <div class="flex justify-between font-semibold text-cyber-text-primary">
                      <span>الإجمالي</span>
                      <span>{{calculateTotal(cart.total)}} ر.س</span>
                    </div>
                  </div>
                </div>

                <button (click)="proceedToCheckout()" 
                        class="w-full bg-cyber-accent-primary text-white py-3 rounded-lg mt-6 hover:bg-cyber-hover-primary transition-colors">
                  إتمام الشراء
                </button>
              </div>
            </div>
          </div>
        </ng-container>
      </div>
    </div>
  `
})
export class CartPage {
  cart$ = this.cartService.cart$;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  updateQuantity(item: CartItem, quantity: number): void {
    this.cartService.updateQuantity(item.id, quantity);
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId);
  }

  calculateItemTotal(item: CartItem): number {
    return parseFloat(item.price.amount) * item.quantity;
  }

  calculateTax(total: number): number {
    return total * 0.15;
  }

  calculateTotal(subtotal: number): number {
    return subtotal * 1.15;
  }

  proceedToCheckout(): void {
    this.router.navigate(['/payment']);
  }
}