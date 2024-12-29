import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { CartApiService } from './cart-api.service';
import { CartStateService } from './cart-state.service';
import { CartIdService } from './cart-id.service';
import { Cart } from '../../models/cart.types';
import { CheckoutResponse } from '../../models/checkout.types';

@Injectable({ providedIn: 'root' })
export class CartService {
  cart$ = this.cartState.cart$;
  loading$ = this.cartState.loading$;

  constructor(
    private cartApi: CartApiService,
    private cartState: CartStateService,
    private cartIdService: CartIdService
  ) {}

  loadCart(): void {
    this.cartState.setLoading(true);
    this.cartApi.getCart().subscribe({
      next: (cart) => {
        this.cartState.setCart(cart);
        this.cartState.setLoading(false);
      },
      error: () => this.cartState.setLoading(false)
    });
  }

  addToCart(productUuid: string, quantity: number, region: string, currency: string): Observable<void> {
    this.cartState.setLoading(true);
    return this.cartApi.addItem({ product_uuid: productUuid, quantity, region, currency }).pipe(
      tap(response => {
        if (response.cart_uuid) {
          this.cartIdService.setCartId(response.cart_uuid);
        }
        this.loadCart();
      }),
      map(() => void 0)
    );
  }

  updateQuantity(itemId: number, quantity: number): Observable<void> {
    this.cartState.setLoading(true);
    return this.cartApi.updateItemQuantity(itemId, { quantity }).pipe(
      tap(() => this.loadCart()),
      map(() => void 0)
    );
  }

  removeItem(itemId: number): Observable<void> {
    this.cartState.setLoading(true);
    return this.cartApi.removeItem(itemId).pipe(
      tap(() => this.loadCart()),
      map(() => void 0)
    );
  }

  clearCart(): Observable<void> {
    this.cartState.setLoading(true);
    return this.cartApi.clearCart().pipe(
      tap(() => {
        this.cartState.setCart(null);
        this.cartIdService.clearCartId();
        this.cartState.setLoading(false);
      }),
      map(() => void 0)
    );
  }

  checkout(paymentMethod: string): Observable<CheckoutResponse> {
    this.cartState.setLoading(true);
    return this.cartApi.checkout(paymentMethod).pipe(
      tap(() => {
        this.cartState.setCart(null);
        this.cartIdService.clearCartId();
        this.cartState.setLoading(false);
      })
    );
  }
}