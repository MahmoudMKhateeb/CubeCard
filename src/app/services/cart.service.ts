import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../core/components/shared/models/product.interface';

export interface CartItem {
  id: number;
  product: Product;
  selectedPrice: {
    amount: string;
    currency: string;
  };
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);

  constructor() {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        this.cartItems.next(Array.isArray(parsedCart) ? parsedCart : []);
      } catch {
        this.cartItems.next([]);
      }
    }
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product, selectedPrice: { amount: string; currency: string }, quantity: number = 1): void {
    const currentItems = this.cartItems.getValue();
    const existingItemIndex = currentItems.findIndex(item => 
      item.product.uuid === product.uuid &&
      item.selectedPrice.amount === selectedPrice.amount
    );

    let newItems: CartItem[];
    if (existingItemIndex > -1) {
      newItems = [...currentItems];
      newItems[existingItemIndex] = {
        ...newItems[existingItemIndex],
        quantity: Math.min(newItems[existingItemIndex].quantity + quantity, 5)
      };
    } else {
      const newItem: CartItem = {
        id: Date.now(),
        product,
        selectedPrice,
        quantity: Math.min(quantity, 5)
      };
      newItems = [...currentItems, newItem];
    }

    this.cartItems.next(newItems);
    this.saveCart(newItems);
  }

  removeFromCart(itemId: number): void {
    const currentItems = this.cartItems.getValue();
    const newItems = currentItems.filter(item => item.id !== itemId);
    this.cartItems.next(newItems);
    this.saveCart(newItems);
  }

  updateQuantity(itemId: number, quantity: number): void {
    if (quantity < 1 || quantity > 1) return;

    const currentItems = this.cartItems.getValue();
    const newItems = currentItems.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    this.cartItems.next(newItems);
    this.saveCart(newItems);
  }

  clearCart(): void {
    this.cartItems.next([]);
    localStorage.removeItem('cart');
  }

  getTotal(): number {
    return this.cartItems.getValue().reduce((total, item) => {
      return total + (parseFloat(item.selectedPrice.amount) * item.quantity);
    }, 0);
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
  }
}