import { Component, OnInit } from '@angular/core';
import {Category, CategoryService} from "../../category.service";
import {Router} from "@angular/router";
import {ProductMainService} from "../../../products/services/product.service";
import {NgEventBus} from "ng-event-bus";

@Component({
  selector: 'app-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css'],
})
export class CategoryGridComponent implements OnInit {
  categories: Category[] = [];
  loading = true;
  error = '';

  constructor(private categoryService: CategoryService , private productService: ProductMainService, private _eventBus:NgEventBus) {}

  ngOnInit(): void {
    this.fetchCategories();
  }
  selectedCategory: number | null = null;

  selectCategory(categoryID: number): void {
    console.log(categoryID);
    this.selectedCategory = categoryID;
    this._eventBus.cast('Category:selection', categoryID);
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
