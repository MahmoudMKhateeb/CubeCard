import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-navigation',
  template: `
    <nav class="bg-cyber-background border-b border-cyber-border">
      <div class="container-content">
        <div class="flex justify-between items-center py-3">
          <div class="flex items-center gap-8">
            <a routerLink="/" class="flex items-center">
              <img src="/assets/images/logo.png" alt="Cubecard" class="h-12">
            </a>
            <div class="flex items-center gap-6">
              <a routerLink="/" class="text-cyber-text-primary hover:text-cyber-accent-primary">الرئيسية</a>
              
              <div class="relative group">
                <button 
                  class="flex items-center gap-1 text-cyber-text-primary hover:text-cyber-accent-primary"
                  (mouseenter)="loadCategories()"
                >
                  التصنيفات
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div class="absolute top-full right-0 w-64 bg-cyber-card border border-cyber-border shadow-card rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div *ngIf="loading" class="p-4">
                    <div class="animate-pulse space-y-2">
                      <div class="h-4 bg-cyber-surface rounded"></div>
                      <div class="h-4 bg-cyber-surface rounded"></div>
                      <div class="h-4 bg-cyber-surface rounded"></div>
                    </div>
                  </div>

                  <ng-container *ngIf="!loading && !error">
                    <a *ngFor="let category of categories"
                       [routerLink]="['/categories']"
                       [queryParams]="{ category: category.slug }"
                       class="flex items-center gap-3 px-4 py-2 hover:bg-cyber-surface">
                      <img [src]="category.icon" 
                           [alt]="category.nameAr"
                           class="w-6 h-6">
                      <span class="text-cyber-text-primary">{{category.nameAr}}</span>
                    </a>
                    <div class="border-t border-cyber-border mt-2 pt-2">
                      <a routerLink="/categories"
                         class="flex items-center gap-3 px-4 py-2 hover:bg-cyber-surface text-cyber-accent-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                        </svg>
                        <span>كل التصنيفات</span>
                      </a>
                    </div>
                  </ng-container>

                  <div *ngIf="error" class="p-4 text-red-500 text-sm">
                    {{error}}
                  </div>
                </div>
              </div>

              <a routerLink="/about" class="text-cyber-text-primary hover:text-cyber-accent-primary">عن كيوب كارد</a>
            </div>
          </div>

          <div class="flex-1 max-w-xl mx-8">
            <app-search-box></app-search-box>
          </div>

          <div class="flex items-center gap-4">
            <a routerLink="/cart" class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyber-text-primary hover:text-cyber-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span *ngIf="(cartItemCount$ | async) as count" 
                    class="absolute -top-1 -right-1 bg-cyber-accent-primary text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {{count}}
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
    }

    @media (prefers-reduced-motion: reduce) {
      .transition-all {
        transition: none;
      }
    }
  `]
})
export class NavigationComponent {
  categories: Category[] = [];
  loading = false;
  error = '';
  selectedCategory = '';
  cartItemCount$ = this.cartService.getCartItemCount();
  private categoriesLoaded = false;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private dataService: DataService,
    private cartService: CartService,
    private productService: ProductService
  ) {}

  loadCategories(): void {
    if (this.categoriesLoaded) return;
    
    this.loading = true;
    this.error = '';
    
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
        this.categoriesLoaded = true;
      },
      error: (err) => {
        this.error = 'فشل تحميل التصنيفات';
        this.loading = false;
        console.error('Error loading categories:', err);
      }
    });
  }
}