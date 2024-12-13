import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product.interface';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="bg-white rounded-lg shadow-sm p-4">
      <!-- Region Flags -->
      <div class="absolute top-2 left-2 flex gap-1">
        <img *ngFor="let region of product.regions"
             [src]="region.flag"
             [alt]="region.name"
             class="w-6 h-6 rounded-full border-2 border-white"
        >
      </div>

      <!-- Product Image -->
      <img [src]="product.image" 
           [alt]="product.name"
           class="w-full h-48 object-contain mb-4">
      
      <!-- Product Info -->
      <h3 class="text-lg font-semibold mb-4">{{product.name}}</h3>
      
      <!-- Prices -->
      <div class="grid grid-cols-3 gap-2 mb-4">
        <div *ngFor="let price of product.prices" 
             class="text-center p-2 border border-gray-200 rounded-lg hover:border-purple-300">
          {{price.amount}} {{price.currency}}
        </div>
      </div>

      <!-- Additional Prices -->
      <div *ngIf="product.additionalPrices?.length" class="grid grid-cols-2 gap-2 mb-4">
        <div *ngFor="let price of product.additionalPrices" 
             class="text-center p-2 border border-gray-200 rounded-lg hover:border-purple-300">
          {{price.amount}} {{price.currency}}
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
}