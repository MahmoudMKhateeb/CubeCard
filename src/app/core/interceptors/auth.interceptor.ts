import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppConstants } from '../constants/app.constants';

const PROTECTED_ROUTES = [
  `${AppConstants.apiUrl}user`,
  `${AppConstants.apiUrl}orders`,
  `${AppConstants.apiUrl}cart`,
  `${AppConstants.apiUrl}checkout`
];

const isProtectedRoute = (url: string): boolean => {
  return PROTECTED_ROUTES.some(route => url.startsWith(route));
};

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