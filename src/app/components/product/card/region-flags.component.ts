import { Component, Input } from '@angular/core';
import { Region } from '../../../models/product.interface';

@Component({
  selector: 'app-region-flags',
  templateUrl: './region-flags.component.html',
  styleUrls: ['./region-flags.component.css']
})
export class RegionFlagsComponent {
  @Input() regions: Region[] = [];
}