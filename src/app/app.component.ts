import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-white dark:bg-dark text-gray-900 dark:text-dark-text-primary" dir="rtl">
      <app-navigation></app-navigation>
      <ng-container *ngIf="isHomePage">
        <app-banner></app-banner>
        <app-category-grid></app-category-grid>
      </ng-container>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    // Apply initial dark mode state
    if (this.dataService.isDarkMode()) {
      document.documentElement.classList.add('dark');
    }
  }

  get isHomePage(): boolean {
    return this.router.url === '/';
  }
}