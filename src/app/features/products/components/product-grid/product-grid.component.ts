import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-grid',
  template: `
    <section class="bg-cyber-surface py-4">
      <div class="container-content">
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <ng-container *ngIf="!loading && !error">
            <a *ngFor="let product of products"
               [routerLink]="['/product', product.id]"
               class="group bg-cyber-card rounded-lg p-4 transition-all hover:shadow-card-hover relative">
              <!-- Region Flags -->
              <div class="absolute top-2 left-2 flex gap-1 z-10">
                <img *ngFor="let region of product.regions"
                     [src]="region.flag"
                     [alt]="region.name"
                     class="w-6 h-6 rounded-full border-2 border-cyber-border shadow-sm"
                     loading="lazy">
              </div>

              <!-- Product Image -->
              <div class="aspect-square mb-2 flex items-center justify-center">
                <img [src]="product.image" 
                     [alt]="product.name"
                     (error)="handleImageError($event)"
                     class="w-full h-full object-contain">
              </div>
              
              <!-- Product Name -->
              <h3 class="text-sm font-medium text-cyber-text-primary text-center line-clamp-2 mb-2">
                {{product.name}}
              </h3>

              <!-- Prices Grid -->
              <div class="grid grid-cols-3 gap-1">
                <div *ngFor="let price of product.prices.slice(0, 3)" 
                     class="text-xs border border-cyber-border rounded px-2 py-1 text-center hover:border-cyber-accent-primary transition-colors text-cyber-text-secondary">
                  {{price.amount}}
                </div>
              </div>

              <!-- Additional Prices -->
              <div *ngIf="product.additionalPrices?.length" class="grid grid-cols-2 gap-1 mt-1">
                <div *ngFor="let price of product.additionalPrices" 
                     class="text-xs border border-cyber-border rounded px-2 py-1 text-center hover:border-cyber-accent-primary transition-colors text-cyber-text-secondary">
                  {{price.amount}}
                </div>
              </div>
            </a>
          </ng-container>
        </div>
      </div>
    </section>
  `
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
}