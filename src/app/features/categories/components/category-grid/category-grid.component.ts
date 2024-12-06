import { Component, OnInit } from '@angular/core';
import {Category, CategoryService} from "../../category.service";
import {Router} from "@angular/router";
import {ProductMainService} from "../../../products/services/product.service";

@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css'],
})
export class CategoryGridComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  error = '';

  constructor(private categoryService: CategoryService , private productService: ProductMainService) {}

  ngOnInit(): void {
    this.fetchCategories();
  }
  selectedCategory: number | null = null;

  selectCategory(categoryID: number): void {
    console.log(categoryID);
    this.selectedCategory = categoryID;
    this.productService.getProducts();
  }
  fetchCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error fetching categories. Please try again later.';
        console.error(err);
        this.loading = false;
      },
    });
  }
}
