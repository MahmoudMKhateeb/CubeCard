import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="relative">
      <!-- User Menu Button -->
      <button 
        (click)="toggleMenu()"
        class="flex items-center gap-2 text-cyber-text-primary hover:text-cyber-accent-primary transition-colors"
      >
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm">{{ user?.first_name || 'المستخدم' }}</span>
        </div>
      </button>

      <!-- Dropdown Menu -->
      <div *ngIf="isMenuOpen" 
           class="absolute left-0 mt-2 w-48 rounded-lg bg-cyber-card shadow-lg border border-cyber-border">
        <div class="py-2">
          <div class="px-4 py-2 border-b border-cyber-border">
            <p class="text-cyber-text-primary font-medium">{{ user?.first_name }} {{ user?.last_name }}</p>
            <p class="text-cyber-text-secondary text-sm">{{ user?.email }}</p>
          </div>
          <a routerLink="/profile" 
             class="block px-4 py-2 text-cyber-text-primary hover:bg-cyber-surface transition-colors">
            الملف الشخصي
          </a>
          <a routerLink="/orders" 
             class="block px-4 py-2 text-cyber-text-primary hover:bg-cyber-surface transition-colors">
            طلباتي
          </a>
          <button (click)="logout()" 
                  class="w-full text-right px-4 py-2 text-red-500 hover:bg-cyber-surface transition-colors">
            تسجيل خروج
          </button>
        </div>
      </div>
    </div>
  `
})
export class UserMenuComponent implements OnInit {
  isMenuOpen = false;
  user: any = null;

  constructor(
    private authService: AuthService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout(): void {
    this.authService.logout();
    this.isMenuOpen = false;
  }
}