import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../shared/models/product.interface';
import { ProductMainService } from '../../services/product.service';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, ErrorMessageComponent]
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  error = '';
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(private productService: ProductMainService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.error = '';
    this.products = [];

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'حدث خطأ أثناء تحميل المنتجات. يرجى المحاولة مرة أخرى.';
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