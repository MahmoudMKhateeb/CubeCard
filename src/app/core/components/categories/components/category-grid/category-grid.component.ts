import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category, CategoryService } from "../../category.service";
import { ProductMainService } from "../../../products/services/product.service";
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

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
  selectedCategory: number = 0;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductMainService
  ) {}

  ngOnInit(): void {
    this.fetchCategories();
  }

  selectCategory(categoryID: number): void {
    this.selectedCategory = categoryID;
    if (categoryID === 0) {
      this.loadProducts();
    } else {
      this.getProductsByCategory(categoryID);
    }
  }

  private fetchCategories(): void {
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

  private loadProducts(): void {
    this.productService.getProducts().subscribe();
  }

  private getProductsByCategory(categoryID: number): void {
    this.productService.getProductByCatId(categoryID).subscribe();
  }
}