import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-box',
  template: `
    <div class="relative">
      <input
        type="search"
        placeholder="ابحث عن المنتجات..."
        class="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        [(ngModel)]="searchQuery"
        (input)="onSearch()"
      >
      <button
        *ngIf="searchQuery"
        (click)="clearSearch()"
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    </div>
  `,
  imports: [FormsModule, CommonModule],
  standalone: true
})
export class SearchBoxComponent {
  searchQuery = '';

  onSearch() {
    // Implement search logic
  }

  clearSearch() {
    this.searchQuery = '';
  }
}