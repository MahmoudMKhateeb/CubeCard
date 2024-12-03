import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { CartService } from '../../../services/cart.service';
import { SearchBoxComponent } from '../../../features/search/components/search-box/search-box.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBoxComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  cartItemCount$ = this.cartService.getCartItems().pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0))
  );

  constructor(private cartService: CartService) {}
}