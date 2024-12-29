import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AppConstants } from '../constants/app.constants';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isOtpVerifiedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tempAuthData: AuthResponse | null = null;
  
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  isOtpVerified$ = this.isOtpVerifiedSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkInitialAuthState();
  }

  private checkInitialAuthState(): void {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const isOtpVerified = localStorage.getItem('isOtpVerified') === 'true';
    if (token && userData && isOtpVerified) {
      this.isAuthenticatedSubject.next(true);
      this.isOtpVerifiedSubject.next(isOtpVerified);
      this.currentUserSubject.next(JSON.parse(userData));
    } else {
      this.logout();
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AppConstants.apiUrl}login`, credentials)
      .pipe(
        tap(response => {
          if (response.status === 'success' && response.data) {
            this.tempAuthData = response;
            const rawToken = response.data.access_token.replace(/^Bearer\s+/i, '');
            this.currentUserSubject.next(response.data.user);
            this.isAuthenticatedSubject.next(false);
            this.isOtpVerifiedSubject.next(false);
            localStorage.setItem('temp_token', rawToken);
            localStorage.setItem('temp_user', JSON.stringify(response.data.user));
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AppConstants.apiUrl}register`, userData);
  }

  completeAuthentication(): void {
    const token = localStorage.getItem('temp_token');
    const userData = localStorage.getItem('temp_user');
    
    if (token && userData && this.tempAuthData?.status === 'success') {
      const rawToken = token.replace(/^Bearer\s+/i, '');
      localStorage.setItem('token', rawToken);
      localStorage.setItem('user', userData);
      localStorage.setItem('isOtpVerified', 'true');
      
      localStorage.removeItem('temp_token');
      localStorage.removeItem('temp_user');
      
      this.isAuthenticatedSubject.next(true);
      this.isOtpVerifiedSubject.next(true);
      
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isOtpVerified');
    localStorage.removeItem('temp_token');
    localStorage.removeItem('temp_user');
    this.isAuthenticatedSubject.next(false);
    this.isOtpVerifiedSubject.next(false);
    this.currentUserSubject.next(null);
    this.tempAuthData = null;
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    return token.replace(/^Bearer\s+/i, '');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateOtpVerificationState(isVerified: boolean): void {
    if (isVerified) {
      this.completeAuthentication();
    }
  }

  private validateToken(token: string): Observable<boolean> {
    const rawToken = token.replace(/^Bearer\s+/i, '');
    
    return this.http.post<AuthResponse>(`${AppConstants.apiUrl}validate-token`, { token: rawToken }).pipe(
      tap(response => {
        if (response.status === 'success' && response.data) {
          localStorage.setItem('token', rawToken);
          this.currentUserSubject.next(response.data.user);
          this.isAuthenticatedSubject.next(true);
        } else {
          this.logout();
        }
      }),
      map(response => response.status === 'success')
    );
  }
}