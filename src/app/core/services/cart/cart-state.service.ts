import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../../models/cart.types';

@Injectable({ providedIn: 'root' })
export class CartStateService {
  private cart = new BehaviorSubject<Cart | null>(null);
  private loading = new BehaviorSubject<boolean>(false);

  cart$ = this.cart.asObservable();
  loading$ = this.loading.asObservable();

  setCart(cart: Cart | null): void {
    this.cart.next(cart);
  }

  setLoading(isLoading: boolean): void {
    this.loading.next(isLoading);
  }

  getCurrentCart(): Cart | null {
    return this.cart.getValue();
  }
}