import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center justify-center p-4">
      <div [class]="'animate-spin rounded-full border-2 border-cyber-accent-primary border-t-transparent ' + sizeClasses"></div>
    </div>
  `,
  styles: [`
    @media (prefers-reduced-motion: reduce) {
      .animate-spin {
        animation: none;
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get sizeClasses(): string {
    switch (this.size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-8 w-8';
      default: return 'h-6 w-6';
    }
  }
}