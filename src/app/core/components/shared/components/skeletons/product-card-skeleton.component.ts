import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-cyber-card rounded-lg p-3 sm:p-4 animate-pulse">
      <div class="aspect-square mb-2 bg-cyber-surface rounded-lg"></div>
      <div class="h-4 bg-cyber-surface rounded w-3/4 mx-auto mb-4"></div>
      <div class="grid grid-cols-3 gap-1">
        <div *ngFor="let i of [1,2,3]" class="h-6 bg-cyber-surface rounded"></div>
      </div>
    </div>
  `
})
export class ProductCardSkeletonComponent {}