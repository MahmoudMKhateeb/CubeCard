import { Component, Input } from '@angular/core';
import { Price } from '../../../models/product.interface';

@Component({
  selector: 'app-price-display',
  templateUrl: './price-display.component.html',
  styleUrls: ['./price-display.component.css']
})
export class PriceDisplayComponent {
  @Input() prices!: Price[];
  @Input() additionalPrices?: Price[];
}