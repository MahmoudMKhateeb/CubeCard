import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { UserMenuComponent } from '../user-menu/user-menu.component';

@Component({
  selector: 'app-auth-indicator',
  standalone: true,
  imports: [CommonModule, RouterModule, UserMenuComponent],
  template: `
    <ng-container *ngIf="authService.isAuthenticated$ | async; else loginButton">
      <app-user-menu></app-user-menu>
    </ng-container>

    <ng-template #loginButton>
      <a 
        routerLink="/login"
        class="text-cyber-text-primary hover:text-cyber-accent-primary transition-colors"
        title="تسجيل دخول"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </a>
    </ng-template>
  `
})
export class AuthIndicatorComponent {
  constructor(public authService: AuthService) {}
}