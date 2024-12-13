import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  template: `
    <div class="bg-white rounded-lg shadow-sm p-4 text-center">
      <img [src]="icon" [alt]="name" class="w-16 h-16 mx-auto mb-2">
      <h3 class="font-medium">{{name}}</h3>
    </div>
  `
})
export class CategoryCardComponent {
  @Input() name!: string;
  @Input() icon!: string;
}