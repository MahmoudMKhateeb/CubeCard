import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { Product } from '../../../../shared/models/product.interface';
import { ProductMainService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product?: Product;
  selectedPrice?: { amount: string; currency: string };
  quantity = 1;
  addedToCart = false;
  defaultImage = 'https://app.rasseed.com/files/itunes.jpg';

  regions = [
    { name: 'سعودي', flag: 'https://flagcdn.com/sa.svg' },
    { name: 'امريكي', flag: 'https://flagcdn.com/us.svg' },
    { name: 'بريطاني', flag: 'https://flagcdn.com/gb.svg' }
  ];

  cardValues = [
    { amount: 'SAR 50', currency: 'SAR' },
    { amount: 'SAR 75', currency: 'SAR' },
    { amount: 'SAR 100', currency: 'SAR' },
    { amount: 'SAR 150', currency: 'SAR' },
    { amount: 'SAR 250', currency: 'SAR' },
    { amount: 'SAR 300', currency: 'SAR' },
    { amount: 'SAR 350', currency: 'SAR' },
    { amount: 'SAR 400', currency: 'SAR' },
    { amount: 'SAR 450', currency: 'SAR' },
    { amount: 'SAR 500', currency: 'SAR' },
    { amount: 'SAR 550', currency: 'SAR' },
    { amount: 'SAR 600', currency: 'SAR' },
    { amount: 'SAR 700', currency: 'SAR' },
    { amount: 'SAR 750', currency: 'SAR' },
    { amount: 'SAR 800', currency: 'SAR' },
    { amount: 'SAR 900', currency: 'SAR' },
    { amount: 'SAR 950', currency: 'SAR' },
    { amount: 'SAR 1300', currency: 'SAR' },
    { amount: 'SAR 1700', currency: 'SAR' },
    { amount: 'SAR 1900', currency: 'SAR' }
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
          this.selectPrice(this.cardValues[0]);
        }
      });
    }
  }

  selectRegion(index: number): void {
    this.selectedRegionIndex = index;
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