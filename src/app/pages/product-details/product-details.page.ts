import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-details',
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
              <a routerLink="/products" class="text-cyber-text-secondary hover:text-cyber-accent-primary">المنتجات</a>
            </li>
            <li>
              <span class="mx-2 text-cyber-border">/</span>
              <span class="text-cyber-text-primary">{{product?.name || 'تحميل...'}}</span>
            </li>
          </ol>
        </nav>

        <ng-container *ngIf="!loading && !error && product">
          <div class="bg-cyber-card rounded-lg shadow-card p-6">
            <!-- Product Header -->
            <div class="mb-8">
              <h1 class="text-2xl font-bold text-cyber-text-primary">{{product.name}}</h1>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Product Image -->
              <div class="aspect-square bg-cyber-surface rounded-lg p-4 flex items-center justify-center">
                <img [src]="product.image"
                     [alt]="product.name"
                     class="w-full h-full object-contain">
              </div>

              <!-- Product Info -->
              <div>
                <!-- Package Types -->
                <div class="mb-6">
                  <h2 class="text-lg font-semibold mb-4 text-cyber-text-primary">قيمة البطاقة</h2>
                  <div class="grid grid-cols-3 gap-3">
                    <button *ngFor="let price of product.prices"
                            (click)="selectPrice(price)"
                            [class.border-cyber-accent-primary]="selectedPrice === price"
                            class="px-4 py-2 border border-cyber-border rounded-lg hover:border-cyber-accent-primary transition-colors text-center text-cyber-text-primary bg-cyber-surface">
                      {{price.amount}}
                    </button>
                  </div>
                </div>

                <!-- Additional Prices -->
                <div *ngIf="product.additionalPrices?.length" class="mb-6">
                  <div class="grid grid-cols-2 gap-3">
                    <button *ngFor="let price of product.additionalPrices"
                            (click)="selectPrice(price)"
                            [class.border-cyber-accent-primary]="selectedPrice === price"
                            class="px-4 py-2 border border-cyber-border rounded-lg hover:border-cyber-accent-primary transition-colors text-center text-cyber-text-primary bg-cyber-surface">
                      {{price.amount}}
                    </button>
                  </div>
                </div>

                <!-- Quantity -->
                <div class="mb-6">
                  <h2 class="text-lg font-semibold mb-2 text-cyber-text-primary">الكمية</h2>
                  <div class="flex items-center gap-4">
                    <div class="flex items-center border border-cyber-border rounded-lg bg-cyber-surface">
                      <button (click)="decrementQuantity()"
                              class="px-3 py-1 text-cyber-text-secondary hover:text-cyber-text-primary">
                        -
                      </button>
                      <span class="px-3 py-1 border-x border-cyber-border text-cyber-text-primary">{{quantity}}</span>
                      <button (click)="incrementQuantity()"
                              class="px-3 py-1 text-cyber-text-secondary hover:text-cyber-text-primary">
                        +
                      </button>
                    </div>
                    <span class="text-sm text-cyber-text-secondary">
                      يمكنك طلب لغاية (1) بطاقات من هذا النوع
                    </span>
                  </div>
                </div>

                <!-- Price -->
                <div class="mb-6">
                  <h2 class="text-lg font-semibold mb-2 text-cyber-text-primary">السعر</h2>
                  <div class="flex items-baseline gap-2">
                    <span class="text-2xl font-bold text-cyber-accent-primary">
                      {{selectedPrice?.amount || '-'}} {{selectedPrice?.currency}}
                    </span>
                    <span class="text-sm text-cyber-text-secondary">شامل قيمة الضريبة المضافة 15%</span>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-4">
                  <button (click)="addToCart()"
                          [disabled]="!selectedPrice"
                          class="px-8 py-3 bg-cyber-accent-primary text-white rounded-lg hover:bg-cyber-hover-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    أضف إلى السلة
                  </button>
                  <a routerLink="/cart"
                     class="px-8 py-3 border border-cyber-accent-primary text-cyber-accent-primary rounded-lg hover:bg-cyber-surface transition-colors">
                    الذهاب للسلة
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ng-container>

        <!-- Loading State -->
        <div *ngIf="loading" class="animate-pulse">
          <div class="bg-cyber-card rounded-lg p-6">
            <div class="h-8 bg-cyber-surface rounded w-1/3 mb-8"></div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div class="aspect-square bg-cyber-surface rounded-lg"></div>
              <div class="space-y-6">
                <div class="h-32 bg-cyber-surface rounded"></div>
                <div class="h-24 bg-cyber-surface rounded"></div>
                <div class="h-16 bg-cyber-surface rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div *ngIf="error" 
             class="bg-red-500 bg-opacity-10 border border-red-200 text-red-500 rounded-lg p-4 text-center">
          {{error}}
          <button (click)="retryLoading()" 
                  class="underline hover:text-red-600 mr-2">
            إعادة المحاولة
          </button>
        </div>
      </div>
    </div>
  `
})
export class ProductDetailsPage implements OnInit {
  product?: Product;
  loading = true;
  error = '';
  private currentId?: number;
  selectedPrice?: { amount: string; currency: string };
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      if (id) {
        this.currentId = id;
        this.loadProduct(id);
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  selectPrice(price: { amount: string; currency: string }): void {
    this.selectedPrice = price;
  }

  incrementQuantity(): void {
    if (this.quantity < 1) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product && this.selectedPrice) {
      this.cartService.addToCart(this.product, this.selectedPrice, this.quantity);
      this.router.navigate(['/cart']);
    }
  }

  retryLoading(): void {
    if (this.currentId) {
      this.loadProduct(this.currentId);
    }
  }

  private loadProduct(id: number): void {
    this.loading = true;
    this.error = '';
    this.product = undefined;

    this.productService.getProductById(id).subscribe({
      next: (product) => {
        if (product) {
          this.product = product;
          if (product.prices.length > 0) {
            this.selectedPrice = product.prices[0];
          }
        } else {
          this.error = 'المنتج غير موجود';
          this.router.navigate(['/']);
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'حدث خطأ أثناء تحميل المنتج';
        this.loading = false;
        console.error('Error loading product:', err);
      }
    });
  }
}