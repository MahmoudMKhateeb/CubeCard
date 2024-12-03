import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  template: `
    <div class="min-h-screen bg-cyber-surface py-8">
      <div class="container-content">
        <!-- Breadcrumb -->
        <nav class="mb-8" aria-label="Breadcrumb">
          <ol class="flex items-center space-x-4">
            <li>
              <a routerLink="/" class="text-cyber-text-secondary hover:text-cyber-accent-primary">الرئيسية</a>
            </li>
            <li>
              <span class="mx-2 text-cyber-border">/</span>
              <span class="text-cyber-text-primary">التصنيفات</span>
            </li>
          </ol>
        </nav>

        <!-- Categories Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <a *ngFor="let category of categories"
             [routerLink]="[category.link]"
             class="block bg-cyber-card rounded-lg p-6 text-center hover:shadow-card transition-all group">
            <!-- Category Icon -->
            <div class="mb-4">
              <img [src]="category.icon"
                   [alt]="category.name"
                   class="w-16 h-16 mx-auto transition-transform group-hover:scale-110"
                   loading="lazy">
            </div>

            <!-- Category Name -->
            <h2 class="text-lg font-medium text-cyber-text-primary mb-1">
              {{category.name}}
            </h2>
            <h3 class="text-sm text-cyber-text-secondary mb-2">
              {{category.nameEn}}
            </h3>

            <!-- Item Count -->
            <span class="text-sm text-cyber-accent-primary">
              {{category.itemCount}} منتج
            </span>
          </a>
        </div>
      </div>
    </div>
  `
})
export class CategoriesPage {
  categories = [
    {
      name: 'أفلام وموسيقى',
      nameEn: 'Movies & Music',
      icon: 'https://app.rasseed.com/files/Music_&_Films.svg',
      link: '/movies-music',
      itemCount: 24
    },
    {
      name: 'الخدمات',
      nameEn: 'Services',
      icon: 'https://app.rasseed.com/files/Services.svg',
      link: '/services',
      itemCount: 15
    },
    {
      name: 'المحافظ الرقمية',
      nameEn: 'Digital Wallets',
      icon: 'https://app.rasseed.com/files/eWallet.svg',
      link: '/digital-wallets',
      itemCount: 8
    },
    {
      name: 'التسوق',
      nameEn: 'Shopping',
      icon: 'https://app.rasseed.com/files/Shopping00e504.svg',
      link: '/shopping',
      itemCount: 32
    },
    {
      name: 'الألعاب',
      nameEn: 'Games',
      icon: 'https://app.rasseed.com/files/Games99db4a.svg',
      link: '/games',
      itemCount: 45
    },
    {
      name: 'الإنترنت',
      nameEn: 'Internet',
      icon: 'https://app.rasseed.com/files/Data--01.svg',
      link: '/internet',
      itemCount: 12
    },
    {
      name: 'المتاجر الرقمية',
      nameEn: 'Digital Stores',
      icon: 'https://app.rasseed.com/files/Stores.svg',
      link: '/digital-stores',
      itemCount: 28
    },
    {
      name: 'الإتصالات',
      nameEn: 'Communications',
      icon: 'https://app.rasseed.com/files/Voice-01.svg',
      link: '/communications',
      itemCount: 19
    }
  ];
}