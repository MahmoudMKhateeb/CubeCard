import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4">
        <!-- Top Bar -->
        <div class="flex justify-between items-center py-2 border-b border-gray-100">
          <div class="flex items-center space-x-4">
            <a href="/cart" class="flex items-center space-x-2 text-gray-600">
              <span class="text-sm">سلة المشتريات</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/>
              </svg>
            </a>
          </div>
          <div class="flex items-center space-x-4">
            <a href="/support" class="text-sm text-gray-600">الدعم اونلاينا</a>
            <a href="/about" class="text-sm text-gray-600">عن رصيد</a>
          </div>
        </div>
        
        <!-- Main Navigation -->
        <nav class="flex justify-between items-center py-4">
          <div class="flex items-center space-x-8">
            <a href="/" class="flex items-center">
              <app-lazy-image
                src="https://www.rasseed.com/assets/images/rasseed-logo.svg"
                alt="Rasseed"
                className="h-8 w-auto"
              ></app-lazy-image>
            </a>
            <div class="hidden md:flex items-center space-x-6">
              <a href="/categories" class="text-gray-700 hover:text-purple-600">التصنيفات</a>
              <a href="/offers" class="text-gray-700 hover:text-purple-600">العروض</a>
              <a href="/support" class="text-gray-700 hover:text-purple-600">المساعدة</a>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <button class="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              تسجيل الدخول
            </button>
            <button class="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  `
})
export class HeaderComponent {
  constructor(private dataService: DataService) {}
}