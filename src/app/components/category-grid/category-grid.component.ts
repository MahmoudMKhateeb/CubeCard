import { Component } from '@angular/core';

interface Category {
  name: string;
  icon: string;
  link: string;
}

@Component({
  selector: 'app-category-grid',
  template: `
    <section class="bg-cyber-surface">
      <div class="container-content py-8">
        <div class="flex justify-center">
          <div class="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-4">
            <div *ngFor="let category of categories">
              <button 
                type="button" 
                [routerLink]="category.link"
                class="category-button"
              >
                <img 
                  [src]="category.icon" 
                  [alt]="category.name"
                  loading="lazy"
                  width="40"
                  height="40"
                  draggable="false"
                  class="category-icon"
                >
                <h1 class="category-title">
                  {{category.name}}
                </h1>
              </button>
            </div>

            <!-- All Categories Button -->
            <div>
              <button 
                type="button" 
                routerLink="/categories"
                class="category-button"
              >
                <div class="w-10 h-10 rounded-full bg-cyber-accent-primary bg-opacity-10 flex items-center justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyber-accent-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </div>
                <h1 class="category-title">
                  كل التصنيفات
                </h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .category-button {
      @apply bg-cyber-card border-none h-[120px] w-[120px] flex flex-col items-center justify-center p-4 rounded-lg 
             transition-all hover:shadow-card-hover hover:-translate-y-0.5;
    }

    .category-icon {
      @apply w-10 h-10 mb-2 transition-transform group-hover:scale-105;
    }

    .category-title {
      @apply text-cyber-text-primary text-sm mt-2 text-center font-normal;
    }

    @media (prefers-reduced-motion: reduce) {
      .category-button,
      .category-icon {
        @apply transition-none transform-none;
      }
    }
  `]
})
export class CategoryGridComponent {
  categories: Category[] = [
    {
      name: 'أفلام وموسيقى',
      icon: 'https://app.rasseed.com/files/Music_&_Films.svg',
      link: '/movies-music'
    },
    {
      name: 'الخدمات',
      icon: 'https://app.rasseed.com/files/Services.svg',
      link: '/services'
    },
    {
      name: 'المحافظ الرقمية',
      icon: 'https://app.rasseed.com/files/eWallet.svg',
      link: '/digital-wallets'
    },
    {
      name: 'التسوق',
      icon: 'https://app.rasseed.com/files/Shopping00e504.svg',
      link: '/shopping'
    },
    {
      name: 'الألعاب',
      icon: 'https://app.rasseed.com/files/Games99db4a.svg',
      link: '/games'
    },
    {
      name: 'الإنترنت',
      icon: 'https://app.rasseed.com/files/Data--01.svg',
      link: '/internet'
    },
    {
      name: 'المتاجر الرقمية',
      icon: 'https://app.rasseed.com/files/Stores.svg',
      link: '/digital-stores'
    },
    {
      name: 'الإتصالات',
      icon: 'https://app.rasseed.com/files/Voice-01.svg',
      link: '/communications'
    }
  ];
}