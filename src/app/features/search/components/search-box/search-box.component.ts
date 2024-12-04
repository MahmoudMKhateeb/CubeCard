import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../shared/models/product.interface';
import { getFormattedPrice } from '../../../../shared/utils/price.utils';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true
})
export class SearchBoxComponent implements OnDestroy {
  searchQuery = '';
  searchResults: Product[] = [];
  showResults = false;
  isLoading = false;
  getFormattedPrice = getFormattedPrice;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private productService: ProductService) {
    this.setupSearchSubscription();
  }

  private setupSearchSubscription(): void {
    this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
    ).subscribe(query => {
      if (query.trim()) {
        this.performSearch(query);
      } else {
        this.clearResults();
      }
    });
  }

  onSearch(): void {
    this.searchSubject.next(this.searchQuery);
  }

  onFocus(): void {
    if (this.searchResults.length > 0) {
      this.showResults = true;
    }
  }

  onBlur(): void {
    // Delay hiding results to allow for result selection
    setTimeout(() => {
      this.showResults = false;
    }, 200);
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.clearResults();
  }

  private performSearch(query: string): void {
    this.isLoading = true;
    this.productService.searchProducts(query).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.showResults = true;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.isLoading = false;
      }
    });
  }

  private clearResults(): void {
    this.searchResults = [];
    this.showResults = false;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}