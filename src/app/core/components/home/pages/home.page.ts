import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from '../../products/components/product-grid/product-grid.component';

@Component({
  selector: 'app-home',
  template: `
    <div class="min-h-screen bg-cyber-surface">
      <div class="container-content py-8">
        <app-product-grid></app-product-grid>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ProductGridComponent]
})
export class HomePage {}