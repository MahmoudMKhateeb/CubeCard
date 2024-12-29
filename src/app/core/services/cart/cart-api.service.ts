import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../../constants/app.constants';
import { Cart, CartResponse, AddToCartRequest, UpdateCartItemRequest } from '../../models/cart.types';
import { CartIdService } from './cart-id.service';
import { CheckoutResponse } from '../../models/checkout.types';
import { AuthService } from '../auth.service';

@Injectable({ providedIn: 'root' })
export class CartApiService {
  private readonly apiUrl = `${AppConstants.apiUrl}cart`;

  constructor(
    private http: HttpClient,
    private cartIdService: CartIdService,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const cartId = this.cartIdService.getCartId();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Cart-ID': cartId || ''
    });
  }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl, { headers: this.getHeaders() });
  }

  addItem(request: AddToCartRequest): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${this.apiUrl}/items`, request, {
      headers: this.getHeaders()
    });
  }

  updateItemQuantity(itemId: number, request: UpdateCartItemRequest): Observable<CartResponse> {
    return this.http.put<CartResponse>(`${this.apiUrl}/items/${itemId}`, request, {
      headers: this.getHeaders()
    });
  }

  removeItem(itemId: number): Observable<CartResponse> {
    return this.http.delete<CartResponse>(`${this.apiUrl}/items/${itemId}`, {
      headers: this.getHeaders()
    });
  }

  clearCart(): Observable<CartResponse> {
    return this.http.delete<CartResponse>(this.apiUrl, {
      headers: this.getHeaders()
    });
  }

  checkout(paymentMethod: string): Observable<CheckoutResponse> {
    const user = this.authService.getCurrentUser();
    const [firstName, ...lastNameParts] = user?.name?.split(' ') || ['', ''];
    const lastName = lastNameParts.join(' ');

    return this.http.post<CheckoutResponse>(`${this.apiUrl}/checkout`, {
      payment_method: paymentMethod,
      customer_name: user?.name || '',
      customer_email: user?.email || '',
      customer_phone: user?.phone || '',
      success_url: `${window.location.origin}/order/success/{CHECKOUT.ORDER.UUID}?session_id={CHECKOUT.SESSION.ID}`,
      cancel_url: `${window.location.origin}/order/failed/{CHECKOUT.ORDER.UUID}?session_id={CHECKOUT.SESSION.ID}`
    }, {
      headers: this.getHeaders()
    });
  }
}