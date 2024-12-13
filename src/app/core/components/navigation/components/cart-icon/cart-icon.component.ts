import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../../../services/cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart-icon',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <a routerLink="/cart" class="relative">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="h-6 w-6 text-cyber-text-primary hover:text-cyber-accent-primary transition-colors"
           fill="none"
           viewBox="0 0 24 24"
           stroke="currentColor">
        <path stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      <span *ngIf="(cartItemCount$ | async) && (cartItemCount$ | async)! > 0"
            class="absolute -top-2 -right-2 bg-cyber-accent-primary text-white text-xs w-5 h-5
                   flex items-center justify-center rounded-full">
        {{cartItemCount$ | async}}
      </span>
    </a>
  `
})
export class CartIconComponent {
  cartItemCount$ = this.cartService.getCartItems().pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0))
  );

  constructor(private cartService: CartService) {}
}