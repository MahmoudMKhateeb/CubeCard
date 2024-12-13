import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-card-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="category-button w-full sm:w-[120px] h-[90px] sm:h-[120px] animate-pulse">
      <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyber-surface mx-auto mb-1 sm:mb-2"></div>
      <div class="h-3 bg-cyber-surface rounded w-2/3 mx-auto"></div>
    </div>
  `
})
export class CategoryCardSkeletonComponent {}