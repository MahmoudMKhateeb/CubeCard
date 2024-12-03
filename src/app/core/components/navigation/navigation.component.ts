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
  template: `
    <nav class="bg-cyber-background border-b border-cyber-border">
      <div class="container-content">
        <div class="flex justify-between items-center py-3">
          <div class="flex items-center gap-8">
            <a routerLink="/" class="flex items-center">
              <img src="/assets/images/logo.png" alt="Cubecard" class="h-12">
            </a>
            <div class="flex items-center gap-6">
              <a routerLink="/" class="text-cyber-text-primary hover:text-cyber-accent-primary">الرئيسية</a>
              <a routerLink="/categories" class="text-cyber-text-primary hover:text-cyber-accent-primary">التصنيفات</a>
              <a routerLink="/about" class="text-cyber-text-primary hover:text-cyber-accent-primary">عن كيوب كارد</a>
            </div>
          </div>

          <div class="flex-1 max-w-xl mx-8">
            <app-search-box></app-search-box>
          </div>

          <div class="flex items-center gap-4">
            <a routerLink="/cart" class="relative">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyber-text-primary hover:text-cyber-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span *ngIf="(cartItemCount$ | async) && (cartItemCount$ | async)! > 0" 
                    class="absolute -top-2 -right-2 bg-cyber-accent-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {{cartItemCount$ | async}}
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
      position: sticky;
      top: 0;
      z-index: 50;
    }
  `]
})
export class NavigationComponent {
  cartItemCount$ = this.cartService.getCartItems().pipe(
    map((items) => items.reduce((total, item) => total + item.quantity, 0))
  );

  constructor(private cartService: CartService) {}
}