import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  template: `
    <section class="bg-gray-50">
      <div class="container-content py-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ng-container *ngIf="!loading && !error">
            <app-product-card 
              *ngFor="let product of products" 
              [product]="product">
            </app-product-card>
          </ng-container>

          <ng-container *ngIf="loading">
            <div *ngFor="let i of [1,2,3,4]" class="animate-pulse">
              <div class="bg-white rounded-lg p-4">
                <div class="w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4"></div>
                <div class="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                <div class="grid grid-cols-3 gap-2 mb-4">
                  <div *ngFor="let j of [1,2,3]" class="h-8 bg-gray-200 rounded"></div>
                </div>
                <div class="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
              </div>
            </div>
          </ng-container>
        </div>

        <div *ngIf="error" class="text-red-600 text-center py-8">
          {{error}}
        </div>
      </div>
    </section>
  `
})
export class ProductListComponent implements OnInit {
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