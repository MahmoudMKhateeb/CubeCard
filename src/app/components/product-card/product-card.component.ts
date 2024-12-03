import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div class="flex flex-col items-center">
        <app-lazy-image
          [src]="product.image"
          [alt]="product.name"
          className="w-32 h-32 object-contain mb-4"
        ></app-lazy-image>
        
        <h3 class="text-lg font-semibold mb-4 text-center">{{product.name}}</h3>
        
        <div class="grid grid-cols-3 gap-2 w-full mb-4">
          <ng-container *ngFor="let price of product.prices">
            <button class="px-3 py-1.5 text-sm border border-gray-200 rounded hover:border-purple-300 transition-colors text-center">
              {{price.amount}} {{price.currency}}
            </button>
          </ng-container>
        </div>

        <div *ngIf="product.additionalPrices?.length" class="grid grid-cols-2 gap-2 w-full mb-4">
          <ng-container *ngFor="let price of product.additionalPrices">
            <button class="px-3 py-1.5 text-sm border border-gray-200 rounded hover:border-purple-300 transition-colors text-center">
              {{price.amount}} {{price.currency}}
            </button>
          </ng-container>
        </div>

        <button class="text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors">
          عرض المزيد +
        </button>

        <div *ngIf="product.regions" class="flex gap-2 mt-4">
          <img 
            *ngFor="let region of product.regions" 
            [src]="region.flag" 
            [alt]="region.name"
            class="w-6 h-6 rounded-full"
          >
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input() product!: Product;
}