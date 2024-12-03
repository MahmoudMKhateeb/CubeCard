import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-categories-page',
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Breadcrumb -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-4">
            <li>
              <a routerLink="/" class="text-cyber-text-secondary hover:text-cyber-accent-primary">الرئيسية</a>
            </li>
            <li>
              <span class="mx-2 text-cyber-border">/</span>
              <span class="text-cyber-text-primary">التصنيفات</span>
            </li>
          </ol>
        </nav>

        <!-- Search -->
        <div class="mb-8">
          <div class="relative">
            <input
              type="search"
              [(ngModel)]="searchQuery"
              (input)="onSearch()"
              placeholder="ابحث عن التصنيفات..."
              class="w-full px-4 py-3 rounded-lg border border-cyber-border bg-cyber-card text-cyber-text-primary 
                     focus:outline-none focus:ring-2 focus:ring-cyber-accent-primary"
            >
            <svg 
              class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyber-text-secondary"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Categories Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ng-container *ngIf="!loading && !error">
            <a *ngFor="let category of categories"
               [routerLink]="['/', category.slug]"
               class="block bg-cyber-card rounded-lg p-6 text-center hover:shadow-card transition-all group">
              <!-- Category Icon -->
              <div class="mb-4">
                <img [src]="category.icon"
                     [alt]="category.nameAr"
                     class="w-16 h-16 mx-auto transition-transform group-hover:scale-110"
                     loading="lazy">
              </div>

              <!-- Category Name -->
              <h2 class="text-lg font-medium text-cyber-text-primary mb-1">
                {{category.nameAr}}
              </h2>
              <h3 class="text-sm text-cyber-text-secondary mb-2">
                {{category.nameEn}}
              </h3>

              <!-- Item Count -->
              <span class="text-sm text-cyber-accent-primary">
                {{category.itemCount}} منتج
              </span>
            </a>
          </ng-container>

          <!-- Loading State -->
          <ng-container *ngIf="loading">
            <div *ngFor="let i of [1,2,3,4,5,6,7,8]" class="animate-pulse">
              <div class="bg-cyber-card rounded-lg p-6">
                <div class="w-16 h-16 bg-cyber-surface rounded-lg mx-auto mb-4"></div>
                <div class="h-4 bg-cyber-surface rounded w-3/4 mx-auto mb-2"></div>
                <div class="h-3 bg-cyber-surface rounded w-1/2 mx-auto"></div>
              </div>
            </div>
          </ng-container>
        </div>

        <!-- Error State -->
        <div *ngIf="error" class="text-red-500 text-center py-8">
          {{error}}
        </div>

        <!-- No Results -->
        <div *ngIf="!loading && !error && categories.length === 0" 
             class="text-center py-8 text-cyber-text-secondary">
          لم يتم العثور على نتائج
        </div>
      </div>
    </div>
  `
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  loading = true;
  error = '';
  searchQuery = '';

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.loading = true;
      this.categoryService.searchCategories(this.searchQuery).subscribe({
        next: (categories) => {
          this.categories = categories;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'فشل البحث في التصنيفات';
          this.loading = false;
          console.error('Error searching categories:', err);
        }
      });
    } else {
      this.loadCategories();
    }
  }

  private loadCategories(): void {
    this.loading = true;
    this.error = '';
    
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'فشل تحميل التصنيفات';
        this.loading = false;
        console.error('Error loading categories:', err);
      }
    });
  }
}