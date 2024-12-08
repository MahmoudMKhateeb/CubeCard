import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category, CategoryService } from "../../category.service";
import { ProductMainService } from "../../../products/services/product.service";
import { NgEventBus } from "ng-event-bus";
import { ErrorMessageComponent } from '../../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ErrorMessageComponent]
})
export class CategoryGridComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  error = '';
  selectedCategory: number = 0; // Initialize with 0 for "كل التصنيفات"

  constructor(
      private categoryService: CategoryService,
      private productService: ProductMainService,
      private _eventBus: NgEventBus
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
    // Emit initial selection
    this._eventBus.cast('Category:selection', 0);
  }

  selectCategory(categoryID: number): void {
    this.selectedCategory = categoryID;
    this._eventBus.cast('Category:selection', categoryID);
  }

  fetchCategories(): void {
    this.loading = true;
    this.error = '';

    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'حدث خطأ أثناء تحميل التصنيفات. يرجى المحاولة مرة أخرى.';
        console.error('Error fetching categories:', err);
        this.loading = false;
      },
    });
  }
}