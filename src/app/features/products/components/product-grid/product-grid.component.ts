import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../shared/models/product.interface';
import {ProductMainService} from "../../services/product.service";

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(private productService: ProductMainService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
}