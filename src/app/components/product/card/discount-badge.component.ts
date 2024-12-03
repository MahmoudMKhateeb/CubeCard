import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-discount-badge',
  templateUrl: './discount-badge.component.html',
  styleUrls: ['./discount-badge.component.css']
})
export class DiscountBadgeComponent {
  @Input() discount!: number;
}