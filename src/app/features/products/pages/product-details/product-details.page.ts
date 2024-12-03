import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { Product } from '../../../../shared/models/product.interface';

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
              <span class="text-cyber-text-primary">{{product?.name || 'تحميل...'}}</span>
            </li>
          </ol>
        </nav>

        <div *ngIf="product" class="bg-cyber-card rounded-lg shadow-card">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <!-- Product Image -->
            <div class="aspect-square bg-cyber-surface rounded-lg p-4 flex items-center justify-center">
              <img [src]="product.image" 
                   [alt]="product.name"
                   class="w-full h-full object-contain"
                   (error)="handleImageError($event)">
            </div>

            <!-- Product Info -->
            <div>
              <h1 class="text-2xl font-bold mb-4 text-cyber-text-primary">{{product.name}}</h1>
              <p class="text-cyber-text-secondary mb-6">{{product.description}}</p>

              <!-- Features -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold mb-3 text-cyber-text-primary">المميزات</h2>
                <ul class="space-y-2">
                  <li *ngFor="let feature of product.features" 
                      class="flex items-center gap-2 text-cyber-text-secondary">
                    <svg class="w-5 h-5 text-cyber-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {{feature}}
                  </li>
                </ul>
              </div>

              <!-- Prices -->
              <div class="mb-6">
                <h2 class="text-lg font-semibold mb-3 text-cyber-text-primary">السعر</h2>
                <div class="grid grid-cols-3 gap-3">
                  <button *ngFor="let price of product.prices"
                          (click)="selectPrice(price)"
                          [class.selected-price]="selectedPrice?.amount === price.amount"
                          class="price-button">
                    {{price.amount}} {{price.currency}}
                  </button>
                </div>
              </div>

              <!-- Additional Prices -->
              <div *ngIf="product.additionalPrices?.length" class="mb-6">
                <div class="grid grid-cols-2 gap-3">
                  <button *ngFor="let price of product.additionalPrices"
                          (click)="selectPrice(price)"
                          [class.selected-price]="selectedPrice?.amount === price.amount"
                          class="price-button">
                    {{price.amount}} {{price.currency}}
                  </button>
                </div>
              </div>

              <!-- Add to Cart -->
              <div class="space-y-4">
                <div class="flex items-center gap-4">
                  <div class="flex items-center border border-cyber-border rounded-lg">
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
                    يمكنك طلب لغاية (5) بطاقات من هذا النوع
                  </span>
                </div>

                <button (click)="addToCart()"
                        [disabled]="!selectedPrice"
                        class="w-full bg-cyber-accent-primary text-white py-3 rounded-lg hover:bg-cyber-hover-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  إضافة إلى السلة
                </button>

                <div *ngIf="addedToCart" class="text-center text-cyber-accent-primary">
                  تمت إضافة المنتج إلى السلة
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div *ngIf="!product" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-4 border-cyber-accent-primary border-t-transparent"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .price-button {
      @apply px-4 py-2 border border-cyber-border rounded-lg transition-all text-center text-cyber-text-primary bg-cyber-surface hover:border-cyber-accent-primary;
    }

    .selected-price {
      @apply bg-cyber-accent-primary text-white border-cyber-accent-primary;
    }

    @media (prefers-reduced-motion: reduce) {
      .transition-all {
        transition: none;
      }
    }
  `]
})
export class ProductDetailsPage implements OnInit {
  product?: Product;
  selectedPrice?: { amount: string; currency: string };
  quantity = 1;
  addedToCart = false;
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe(product => {
        if (product) {
          this.product = product;
          if (product.prices.length) {
            this.selectPrice(product.prices[0]);
          }
        }
      });
    }
  }

  selectPrice(price: { amount: string; currency: string }): void {
    this.selectedPrice = price;
  }

  incrementQuantity(): void {
    if (this.quantity < 5) {
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
      this.addedToCart = true;
      setTimeout(() => {
        this.router.navigate(['/cart']);
      }, 1000);
    }
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
}