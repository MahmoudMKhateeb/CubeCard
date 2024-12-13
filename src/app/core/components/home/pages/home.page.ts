import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="container mx-auto px-4 py-8">
      <app-product-grid></app-product-grid>
    </div>
  `
})
export class HomePage {}