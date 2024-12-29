import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

declare const Stripe: any;

@Injectable({ providedIn: 'root' })
export class StripeService {
  private stripe: any = null;

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    if (!this.stripe) {
      this.stripe = Stripe(environment.stripePublishableKey);
    }
  }

  async redirectToCheckout(sessionId: string): Promise<void> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    const { error } = await this.stripe.redirectToCheckout({ sessionId });
    if (error) {
      throw new Error(error.message);
    }
  }
}
