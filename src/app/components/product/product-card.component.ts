import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card',
  template: `
    <a [routerLink]="['/product', product.id]"
       class="product-card bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all duration-300"
       [attr.aria-label]="'عرض تفاصيل ' + product.name"
       role="article">
      <!-- Product Image -->
      <div class="relative aspect-square p-4">
        <app-lazy-image
          [src]="product.image"
          [alt]="product.name"
          className="w-full h-full object-contain transition-transform group-hover:scale-105"
        ></app-lazy-image>
      </div>
      
      <!-- Product Info -->
      <div class="p-4 text-center">
        <h3 class="text-lg font-semibold mb-4 text-gray-900 line-clamp-2">{{product.name}}</h3>
        
        <!-- Primary Prices -->
        <div class="grid grid-cols-3 gap-2 mb-3">
          <div *ngFor="let price of product.prices.slice(0, 3)" 
               class="price-button"
               role="text"
               [attr.aria-label]="price.amount + ' ' + price.currency">
            <span class="block font-medium">{{price.amount}}</span>
            <span class="block text-xs text-gray-500">{{price.currency}}</span>
          </div>
        </div>
        
        <!-- Additional Prices -->
        <div *ngIf="product.additionalPrices?.length" 
             class="grid grid-cols-2 gap-2 mb-3">
          <div *ngFor="let price of product.additionalPrices" 
               class="price-button"
               role="text"
               [attr.aria-label]="price.amount + ' ' + price.currency">
            <span class="block font-medium">{{price.amount}}</span>
            <span class="block text-xs text-gray-500">{{price.currency}}</span>
          </div>
        </div>

        <!-- Region Flags -->
        <div *ngIf="product.regions?.length" 
             class="flex justify-center gap-2 mt-3"
             role="group"
             aria-label="Available Regions">
          <img *ngFor="let region of product.regions"
               [src]="region.flag"
               [alt]="'Available in ' + region.name"
               class="w-6 h-6 rounded-full shadow-sm"
               loading="lazy">
        </div>
        
        <!-- Show More Button -->
        <span class="mt-3 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors inline-block">
          عرض المزيد +
        </span>
      </div>
    </a>
  `,
  styles: [`
    :host {
      display: block;
    }

    .product-card {
      display: block;
      height: 100%;
      text-decoration: none;
      color: inherit;
      outline: none;
    }

    .product-card:focus-visible {
      outline: 2px solid #7c3aed;
      outline-offset: 2px;
    }

    .price-button {
      @apply px-2 py-1.5 text-sm border border-gray-200 rounded-md 
             transition-colors text-center;
    }

    .product-card:hover .price-button {
      @apply border-purple-300;
    }

    @media (prefers-reduced-motion: reduce) {
      .product-card,
      .price-button {
        transition: none;
      }
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
}