import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../shared/models/product.interface';
import { ProductMainService } from '../../services/product.service';
import { NgEventBus } from 'ng-event-bus';
import { ErrorMessageComponent } from '../../../shared/components/error-message/error-message.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ProductCardSkeletonComponent } from '../../../shared/components/skeletons/product-card-skeleton.component';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ErrorMessageComponent,
    LoadingSpinnerComponent,
    ProductCardSkeletonComponent
  ]
})
export class ProductGridComponent implements OnInit {
  products: Product[] = [];
  loading = false;
  error = '';
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(
    private productService: ProductMainService,
    private _eventBus: NgEventBus
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this._eventBus.on('Category:selection').subscribe((event) => {
      if (event.data === 0) {
        this.loadProducts();
      } else {
        this.getProductsByCategory(event.data as number);
      }
    });
  }

  getProductsByCategory(categoryID: number): void {
    this.loading = true;
    this.error = '';
    this.products = [];

    this.productService.getProductByCatId(categoryID).subscribe({
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