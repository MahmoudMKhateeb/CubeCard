import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CartApiService } from './cart-api.service';
import { CartStateService } from './cart-state.service';

@Injectable({ providedIn: 'root' })
export class CartOperationsService {
  constructor(
    private cartApi: CartApiService,
    private cartState: CartStateService
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

  addItem(productUuid: string, quantity: number, region: string, currency: string): Observable<void> {
    this.cartState.setLoading(true);
    return this.cartApi.addItem({ product_uuid: productUuid, quantity, region, currency }).pipe(
      tap(() => this.loadCart()),
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
        this.cartState.setLoading(false);
      }),
      map(() => void 0)
    );
  }
}