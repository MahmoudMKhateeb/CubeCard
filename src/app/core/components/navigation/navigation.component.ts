import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs/operators';
import { CartService } from '../../../services/cart.service';
import { SearchBoxComponent } from '../../../features/search/components/search-box/search-box.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBoxComponent]
})
export class NavigationComponent {
  cartItemCount$ = this.cartService.getCartItems().pipe(
      map((items) => items.reduce((total, item) => total + item.quantity, 0))
  );
  isMobileMenuOpen = false;

  constructor(private cartService: CartService) {}

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}