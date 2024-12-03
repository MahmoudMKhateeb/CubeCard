import { Component, OnInit } from '@angular/core';
import { ProductDetails } from '../../models/product-details.interface';
import { ProductDetailsService } from '../../services/product-details.service';

@Component({
  selector: 'app-product-details-list',
  templateUrl: './product-details-list.component.html',
  styleUrls: ['./product-details-list.component.css']
})
export class ProductDetailsListComponent implements OnInit {
  products: ProductDetails[] = [];
  loading = true;
  error = '';

  constructor(private productDetailsService: ProductDetailsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productDetailsService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again.';
        this.loading = false;
        console.error('Error loading products:', err);
      }
    });
  }
}