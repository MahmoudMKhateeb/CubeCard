```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

interface Banner {
  image: string;
  alt: string;
}

@Component({
  selector: 'app-banner',
  template: `
    <section class="bg-cyber-surface">
      <div class="container-content py-4">
        <!-- Banner Container -->
        <div class="relative rounded-lg shadow-card overflow-hidden h-[400px]">
          <!-- Banner Images -->
          <div *ngFor="let banner of banners; let i = index" 
               class="absolute inset-0 transition-opacity duration-500"
               [class.opacity-0]="currentIndex !== i"
               [class.opacity-100]="currentIndex === i">
            <img [src]="banner.image" 
                 [alt]="banner.alt"
                 class="w-full h-full object-cover"
                 loading="lazy">
          </div>

          <!-- Navigation Arrows -->
          <button (click)="previousBanner()"
                  class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black-transparent text-cyber-text-primary hover:bg-black-transparent-hover transition-colors"
                  aria-label="Previous banner">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button (click)="nextBanner()"
                  class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black-transparent text-cyber-text-primary hover:bg-black-transparent-hover transition-colors"
                  aria-label="Next banner">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Navigation Dots -->
          <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            <button *ngFor="let banner of banners; let i = index" 
                    (click)="setCurrentBanner(i)"
                    [attr.aria-label]="'Go to slide ' + (i + 1)"
                    class="w-2 h-2 rounded-full transition-colors"
                    [class.bg-cyber-text-primary]="currentIndex === i"
                    [class.bg-white-transparent]="currentIndex !== i">
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }

    .transition-opacity {
      transition: opacity 500ms ease-in-out;
    }

    @media (prefers-reduced-motion: reduce) {
      .transition-opacity,
      .transition-colors {
        transition: none;
      }
    }
  `]
})
export class BannerComponent implements OnInit, OnDestroy {
  banners: Banner[] = [
    {
      image: 'https://app.rasseed.com/files/cash%20back%20copy.webp',
      alt: 'عروض الكاش باك - خصومات حصرية على جميع المنتجات'
    },
    {
      image: 'https://app.rasseed.com/files/rasseed%20delivery.webp',
      alt: 'خدمة التوصيل السريع من رصيد'
    }
  ];

  currentIndex = 0;
  private autoSlideInterval?: number;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  previousBanner(): void {
    this.currentIndex = this.currentIndex === 0 ? this.banners.length - 1 : this.currentIndex - 1;
    this.resetAutoSlide();
  }

  nextBanner(): void {
    this.currentIndex = (this.currentIndex + 1) % this.banners.length;
    this.resetAutoSlide();
  }

  setCurrentBanner(index: number): void {
    this.currentIndex = index;
    this.resetAutoSlide();
  }

  private startAutoSlide(): void {
    this.autoSlideInterval = window.setInterval(() => {
      this.nextBanner();
    }, 5000);
  }

  private stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  private resetAutoSlide(): void {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
```