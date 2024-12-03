import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @ViewChild('searchContainer') searchContainer!: ElementRef;
  
  searchQuery = '';
  results: Product[] = [];
  loading = false;
  showResults = false;
  selectedIndex = -1;
  private searchSubject = new Subject<string>();

  constructor(private productService: ProductService) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.searchContainer.nativeElement.contains(event.target)) {
      this.showResults = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    this.showResults = false;
  }

  onSearch(): void {
    this.showResults = true;
    this.searchSubject.next(this.searchQuery);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.results = [];
    this.showResults = false;
    this.selectedIndex = -1;
  }

  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
        this.scrollToSelected();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        this.scrollToSelected();
        break;
      case 'Enter':
        if (this.selectedIndex >= 0 && this.results[this.selectedIndex]) {
          // Navigate to product
          const product = this.results[this.selectedIndex];
          // Router navigation will be handled by the template's routerLink
        }
        break;
    }
  }

  private performSearch(query: string): void {
    if (!query.trim()) {
      this.results = [];
      this.loading = false;
      return;
    }

    this.loading = true;
    this.productService.searchProducts(query).subscribe({
      next: (products) => {
        this.results = products.slice(0, 8); // Limit to 8 results
        this.selectedIndex = -1;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching products:', err);
        this.loading = false;
      }
    });
  }

  private scrollToSelected(): void {
    if (this.selectedIndex >= 0) {
      const elements = document.querySelectorAll('.search-result-item');
      const element = elements[this.selectedIndex] as HTMLElement;
      if (element) {
        element.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  highlightMatch(text: string): string {
    if (!this.searchQuery) return text;
    
    const regex = new RegExp(this.searchQuery, 'gi');
    return text.replace(regex, match => `<span class="highlight">${match}</span>`);
  }
}