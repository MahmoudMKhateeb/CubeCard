import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductMainService } from '../../services/product.service';
import { CartService } from '../../../../services/cart/cart.service';
import { ProductDetailsSkeletonComponent } from '../../../shared/components/skeletons/product-details-skeleton.component';
import { ProductImageComponent } from '../../components/product-image/product-image.component';
import { ProductDetails, RegionWithPrices, RegionPrice, RegionInfo } from '../../../../models/product.types';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ProductDetailsSkeletonComponent,
    ProductImageComponent
  ]
})
export class ProductDetailsComponent implements OnInit {
  product?: ProductDetails;
  regions: RegionWithPrices[] = [];
  selectedRegionIndex = 0;
  selectedPrice?: RegionPrice;
  quantity = 1;
  loading = true;

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
        next: (response) => {
          console.log('API Response:', response);
          if (response.product) {
            this.product = response.product;
            this.regions = response.regions;
            if (this.regions.length > 0) {
              this.selectRegion(0);
            }
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching product:', error);
          this.loading = false;
        }
      });
    }
  }

  selectRegion(index: number): void {
    this.selectedRegionIndex = index;
    this.selectedPrice = undefined;
    
    const region = this.regions[index];
    console.log('Selected region:', region);
    if (region && region.prices.length > 0) {
      console.log('Region prices:', region.prices);
      this.selectPrice(region.prices[0]);
    }
  }

  selectPrice(price: RegionPrice): void {
    console.log('Selected price:', price);
    this.selectedPrice = price;
  }

  incrementQuantity(): void {
    if (this.quantity < 99) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  validateQuantity(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = parseInt(input.value);
    
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > 99) {
      value = 99;
    }
    
    this.quantity = value;
    input.value = value.toString();
  }

  getCurrentRegion(): RegionInfo | null {
    if (!this.regions[this.selectedRegionIndex]) return null;
    return this.regions[this.selectedRegionIndex].region;
  }

  addToCart(): void {
    if (this.product && this.selectedPrice && this.getCurrentRegion()) {
      const region = this.getCurrentRegion()!;
      this.cartService.addToCart(
        this.product.uuid,
        this.quantity,
        region.code,
        region.currency_code
      ).subscribe({
        next: () => {
          this.router.navigate(['/cart']);
        },
        error: (error) => {
          console.error('Error adding to cart:', error);
        }
      });
    }
  }

  buyNow(): void {
    this.addToCart();
  }
}