import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { Product } from '../../../../shared/models/product.interface';
import { ProductMainService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  selectedPrice?: { amount: string; currency: string };
  quantity = 1;
  addedToCart = false;
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  regions = [
    { name: 'SA', flag: 'https://flagcdn.com/sa.svg' },
    { name: 'UK', flag: 'https://flagcdn.com/gb.svg' },
    { name: 'USA', flag: 'https://flagcdn.com/us.svg' }
  ];

  selectedRegionIndex: number = 0;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private productService: ProductMainService,
      private cartService: CartService
  ) {}

  ngOnInit() {
    const uuid = this.route.snapshot.paramMap.get('id');
    if (uuid) {
      this.productService.getProductById(uuid).subscribe(product => {
        if (product) {
          this.product = product;
          if (product.prices.length) {
            this.selectPrice(product.prices[0]);
          }
        }
      });
    }
  }

  selectRegion(index: number): void {
    this.selectedRegionIndex = index;
    // Optionally, add logic to adjust product data based on the selected region if necessary.
  }

  selectPrice(price: { amount: string; currency: string }): void {
    this.selectedPrice = price;
  }

  incrementQuantity(): void {
    if (this.quantity < 5) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
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
