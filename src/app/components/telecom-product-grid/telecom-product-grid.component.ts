import { Component, OnInit } from '@angular/core';
import { TelecomProduct } from '../../models/telecom-product.interface';
import { TelecomProductService } from '../../services/telecom-product.service';

@Component({
  selector: 'app-telecom-product-grid',
  template: `
    <section class="product-grid-section">
      <div class="container-content">
        <div class="product-grid">
          <ng-container *ngIf="!loading && !error">
            <app-telecom-product-card
              *ngFor="let product of products"
              [product]="product">
            </app-telecom-product-card>
          </ng-container>

          <ng-container *ngIf="loading">
            <div *ngFor="let i of [1,2,3,4]" class="skeleton-card">
              <div class="skeleton-content">
                <div class="skeleton-image"></div>
                <div class="skeleton-title"></div>
                <div class="skeleton-prices">
                  <div *ngFor="let j of [1,2,3]" class="skeleton-price"></div>
                </div>
                <div class="skeleton-button"></div>
              </div>
            </div>
          </ng-container>
        </div>

        <div *ngIf="error" class="error-message">
          {{error}}
        </div>
      </div>
    </section>
  `,
  styles: [`
    .product-grid-section {
      background-color: #f9fafb;
      padding: 2rem 0;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 1.25rem;
    }

    @media (min-width: 640px) {
      .product-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (min-width: 1024px) {
      .product-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .skeleton-card {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      height: 100%;
    }

    .skeleton-content {
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .skeleton-image {
      width: 8rem;
      height: 8rem;
      background-color: #e5e7eb;
      border-radius: 0.5rem;
      margin: 0 auto;
    }

    .skeleton-title {
      height: 1.5rem;
      background-color: #e5e7eb;
      border-radius: 0.375rem;
      width: 75%;
      margin: 0 auto;
    }

    .skeleton-prices {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.5rem;
    }

    .skeleton-price {
      height: 2rem;
      background-color: #e5e7eb;
      border-radius: 0.375rem;
    }

    .skeleton-button {
      height: 1rem;
      background-color: #e5e7eb;
      border-radius: 0.375rem;
      width: 25%;
      margin: 0 auto;
    }

    .error-message {
      text-align: center;
      color: #dc2626;
      padding: 2rem 0;
    }

    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }

    .skeleton-image,
    .skeleton-title,
    .skeleton-price,
    .skeleton-button {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    @media (prefers-reduced-motion: reduce) {
      .skeleton-image,
      .skeleton-title,
      .skeleton-price,
      .skeleton-button {
        animation: none;
      }
    }
  `]
})
export class TelecomProductGridComponent implements OnInit {
  products: TelecomProduct[] = [];
  loading = true;
  error = '';

  constructor(private telecomProductService: TelecomProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.telecomProductService.getProducts().subscribe({
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