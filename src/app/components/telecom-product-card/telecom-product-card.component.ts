import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TelecomProduct } from '../../models/telecom-product.interface';

@Component({
  selector: 'app-telecom-product-card',
  template: `
    <div class="product-card" (click)="navigateToDetails()">
      <div class="product-content">
        <!-- Product Image -->
        <div class="product-image-container">
          <img [src]="product.image" [alt]="product.name" class="product-image">
        </div>
        
        <!-- Product Name -->
        <h3 class="product-title">{{product.name}}</h3>
        
        <!-- Primary Prices -->
        <div class="price-grid primary-prices">
          <button *ngFor="let price of product.prices"
            class="price-button">
            {{price.amount}}
          </button>
        </div>

        <!-- Additional Prices -->
        <div *ngIf="product.additionalPrices" class="price-grid additional-prices">
          <button *ngFor="let price of product.additionalPrices"
            class="price-button">
            {{price.amount}}
          </button>
        </div>

        <!-- Show More Button -->
        <button class="show-more-button">
          عرض المزيد +
        </button>

        <!-- Product Logos -->
        <div *ngIf="product.logos" class="product-logos">
          <img *ngFor="let logo of product.logos" 
               [src]="logo" 
               class="logo-image"
               [alt]="product.name + ' logo'">
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Previous styles remain the same */
    .product-card {
      cursor: pointer;
    }
  `]
})
export class TelecomProductCardComponent {
  @Input() product!: TelecomProduct;

  constructor(private router: Router) {}

  navigateToDetails(): void {
    this.router.navigate(['/product', this.product.id]);
  }
}