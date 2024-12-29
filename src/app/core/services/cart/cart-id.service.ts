import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartIdService {
  private readonly CART_ID_KEY = 'cartId';

  getCartId(): string | null {
    return localStorage.getItem(this.CART_ID_KEY);
  }

  setCartId(cartId: string): void {
    localStorage.setItem(this.CART_ID_KEY, cartId);
  }

  clearCartId(): void {
    localStorage.removeItem(this.CART_ID_KEY);
  }
}