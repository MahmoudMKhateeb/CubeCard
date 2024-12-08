import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../services/cart.service';
import { ProductMainService } from '../../services/product.service';
import { ProductDetailsSkeletonComponent } from '../../../../shared/components/skeletons/product-details-skeleton.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProductDetailsSkeletonComponent
  ]
})
export class ProductDetailsComponent implements OnInit {
  product?: any;
  regions: any[] = [];
  selectedRegionIndex: number = 0;
  selectedPrice?: { amount: string; currency: string };
  quantity = 1;
  addedToCart = false;
  loading = true;
  defaultImage = 'https://app.rasseed.com/files/itunes.jpg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductMainService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('id');
    if (uuid) {
      this.loading = true;
      this.productService.getProductById(uuid).subscribe({
        next: (data) => {
          if (data) {
            this.product = data.product;
            this.regions = data.regions;
            if (this.regions.length > 0 && this.regions[0].prices.length > 0) {
              this.selectPrice(this.regions[0].prices[0]);
            }
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  selectRegion(index: number): void {
    this.selectedRegionIndex = index;
    if (this.regions[index].prices.length > 0) {
      this.selectPrice(this.regions[index].prices[0]);
    } else {
      this.selectedPrice = undefined;
    }
  }

  selectPrice(price: { amount: string; currency: string }): void {
    this.selectedPrice = price;
  }

  addToCart(): void {
    if (this.product && this.selectedPrice) {
      this.cartService.addToCart(this.product, this.selectedPrice, this.quantity);
      this.addedToCart = true;
      setTimeout(() => {
        this.router.navigate(['/cart']);
      }, 1000);
    }
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
}