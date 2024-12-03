import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-image',
  template: `
    <div class="relative">
      <img
        [src]="src || fallbackSrc"
        [alt]="alt"
        [class]="className"
        loading="lazy"
        (error)="onImageError()"
        [style.opacity]="loaded ? 1 : 0"
        (load)="onImageLoad()"
      >
      <div 
        *ngIf="!loaded"
        class="animate-pulse bg-gray-200 dark:bg-gray-700 absolute inset-0"
        [style.width]="width"
        [style.height]="height"
      ></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
    }
    img {
      transition: opacity 0.3s ease-in-out;
    }
    @media (prefers-reduced-motion: reduce) {
      img {
        transition: none;
      }
    }
  `]
})
export class LazyImageComponent {
  @Input() src = '';
  @Input() alt = '';
  @Input() className = '';
  @Input() width = '100%';
  @Input() height = '100%';
  @Input() fallbackSrc = 'https://app.rasseed.com/files/image%20ar&en-01018109.png';

  loaded = false;

  onImageLoad(): void {
    this.loaded = true;
  }

  onImageError(): void {
    this.src = this.fallbackSrc;
  }
}