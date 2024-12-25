import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppConstants } from '../constants/app.constants';
import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);
  private tempAuthData: AuthResponse | null = null;
  
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
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
    if (token && userData) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AppConstants.apiUrl}login`, credentials)
      .pipe(
        tap(response => {
          if (response.status === 'success' && response.data) {
            this.tempAuthData = response;
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AppConstants.apiUrl}register`, userData);
  }

  completeAuthentication(): void {
    if (this.tempAuthData?.data) {
      const { access_token: token, user } = this.tempAuthData.data;
      this.setAuthState(token, user);
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.tempAuthData = null;
    this.router.navigate(['/login']);
  }

  private setAuthState(token: string, user: any): void {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
    this.currentUserSubject.next(user);
    this.tempAuthData = null;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any | null {
    return this.currentUserSubject.value;
  }
}