import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppConstants } from '../constants/app.constants';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Only handle unauthorized errors for protected API routes
      if (error.status === 401 && isProtectedRoute(req.url)) {
        authService.logout();
      }
      return throwError(() => error);
    })
  );
};

function isProtectedRoute(url: string): boolean {
  const protectedRoutes = [
    `${AppConstants.apiUrl}user`,
    `${AppConstants.apiUrl}orders`,
    `${AppConstants.apiUrl}cart`,
    `${AppConstants.apiUrl}checkout`
  ];
  
  return protectedRoutes.some(route => url.startsWith(route));
}