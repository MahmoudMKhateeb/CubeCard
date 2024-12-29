import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-cyber-card rounded-lg p-6">
      <div class="aspect-square rounded-lg bg-cyber-surface p-4 flex items-center justify-center">
        <img [src]="image || defaultImage"
             [alt]="alt"
             class="w-full h-full object-contain transition-transform hover:scale-105"
             (error)="handleImageError($event)"
             loading="lazy">
      </div>

      <!-- Features Section -->
      <div *ngIf="features?.length" class="mt-6 pt-6 border-t border-cyber-border">
        <h3 class="text-lg font-medium text-cyber-text-primary mb-4">المميزات</h3>
        <ul class="space-y-3">
          <li *ngFor="let feature of features"
              class="flex items-center gap-2 text-cyber-text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-5 w-5 text-cyber-accent-primary flex-shrink-0"
                 fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7" />
            </svg>
            <span>{{ feature }}</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    @media (prefers-reduced-motion: reduce) {
      .transition-transform {
        transition: none;
      }
    }
  `]
})
export class ProductImageComponent {
  @Input() image?: string;
  @Input() alt?: string;
  @Input() features?: string[];

  readonly defaultImage = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = this.defaultImage;
    }
  }
}