import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.component.html',
  styles: [`
    .payment-method-button {
      @apply flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-cyber-border 
             bg-cyber-surface hover:border-cyber-accent-primary transition-colors text-center;
    }

    .payment-method-button.selected {
      @apply border-cyber-accent-primary bg-cyber-accent-primary bg-opacity-10;
    }

    @media (prefers-reduced-motion: reduce) {
      .transition-colors {
        transition: none;
      }
    }
  `]
})
export class PaymentComponent {
  defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
  processPayment(): void {
    // Simulate payment processing
    // In a real application, this would interact with a payment gateway
    const orderId = 'ORD-001'; // This would normally come from your backend

    // Randomly simulate success or failure
    const isSuccess = Math.random() > 0.2; // 80% success rate

    if (isSuccess) {
      this.router.navigate(['/order/success', orderId]);
    } else {
      this.router.navigate(['/order/failed', orderId]);
    }
  }
}