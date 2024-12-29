import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CartApiService } from './cart-api.service';
import { CartStateService } from './cart-state.service';

@Injectable({ providedIn: 'root' })
export class CartCheckoutService {
  constructor(
    private cartApi: CartApiService,
    private cartState: CartStateService
  ) {}

  checkout(): Observable<{ uuid: string; total_amount: number; status: string }> {
    this.cartState.setLoading(true);
    return this.cartApi.checkout().pipe(
      tap(() => {
        this.cartState.setCart(null);
        this.cartState.setLoading(false);
      }),
      map(response => response.order)
    );
  }
}