import { Component, Input } from '@angular/core';
import { ProductDetails } from '../../models/product-details.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  @Input() product!: ProductDetails;
}