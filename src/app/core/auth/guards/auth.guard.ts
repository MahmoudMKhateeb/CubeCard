import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.getAuthState().pipe(
      take(1),
      map(state => {
        if (!state.isLoggedIn || !state.isOtpVerified) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }
}