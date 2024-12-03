import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-grid',
  template: `
    <section class="bg-gray-50">
      <div class="container-content py-8">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <ng-container *ngIf="!loading && !error">
            <div *ngFor="let product of products" 
                 class="product-card bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300">
              <!-- Product Image Container -->
              <div class="aspect-square p-6 flex items-center justify-center">
                <img [src]="product.image" 
                     [alt]="product.name"
                     class="w-full h-full object-contain transition-transform hover:scale-105">
              </div>
              
              <!-- Product Info -->
              <div class="p-4 text-center">
                <h3 class="text-lg font-semibold mb-4">{{product.name}}</h3>
                
                <!-- Price Buttons -->
                <div class="grid grid-cols-3 gap-2 mb-3">
                  <button *ngFor="let price of product.prices.slice(0, 3)" 
                          class="px-2 py-1.5 text-sm border border-gray-200 rounded-md hover:border-purple-300 transition-colors">
                    {{price.amount}}
                  </button>
                </div>
                
                <!-- Additional Prices -->
                <div *ngIf="product.additionalPrices?.length" 
                     class="grid grid-cols-2 gap-2 mb-3">
                  <button *ngFor="let price of product.additionalPrices" 
                          class="px-2 py-1.5 text-sm border border-gray-200 rounded-md hover:border-purple-300 transition-colors">
                    {{price.amount}}
                  </button>
                </div>
                
                <!-- Show More Button -->
                <button class="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
                  عرض المزيد +
                </button>
              </div>
            </div>
          </ng-container>

          <!-- Loading State -->
          <ng-container *ngIf="loading">
            <div *ngFor="let i of [1,2,3,4]" class="animate-pulse">
              <div class="bg-white rounded-lg p-6">
                <div class="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div class="grid grid-cols-3 gap-2 mb-4">
                  <div *ngFor="let j of [1,2,3]" class="h-8 bg-gray-200 rounded"></div>
                </div>
                <div class="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
              </div>
            </div>
          </ng-container>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="text-red-600 text-center py-8">
          {{error}}
        </div>
      </div>
    </section>
  `,
  styles: [`
    .product-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    @media (prefers-reduced-motion: reduce) {
      .product-card {
        transition: none;
      }
    }
  `]
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'فشل تحميل المنتجات. يرجى المحاولة مرة أخرى.';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }
}