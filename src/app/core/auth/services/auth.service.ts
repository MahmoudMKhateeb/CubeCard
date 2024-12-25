import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthState, LoginForm, LoginResponse, User } from '../models/auth.types';
import { TokenService } from './token.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private authState = new BehaviorSubject<AuthState>({
    isLoggedIn: false,
    isOtpVerified: false,
    user: null,
    token: null
  });

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) {
    this.initializeAuthState();
  }

  private initializeAuthState(): void {
    const token = this.tokenService.getToken();
    if (token) {
      this.validateToken(token).subscribe();
    }
  }

  login(credentials: LoginForm): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/auth/login', credentials).pipe(
      tap(response => {
        if (!response.requiresOtp) {
          this.setAuthState(response.token, response.user);
        }
      })
    );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.authState.next({
      isLoggedIn: false,
      isOtpVerified: false,
      user: null,
      token: null
    });
  }

  private setAuthState(token: string, user: User): void {
    this.tokenService.setToken(token);
    this.authState.next({
      isLoggedIn: true,
      isOtpVerified: true,
      user,
      token
    });
  }

  private validateToken(token: string): Observable<boolean> {
    return this.http.post<{ valid: boolean, user?: User }>('/api/auth/validate', { token }).pipe(
      map(response => {
        if (response.valid && response.user) {
          this.setAuthState(token, response.user);
          return true;
        }
        this.logout();
        return false;
      })
    );
  }

  getAuthState(): Observable<AuthState> {
    return this.authState.asObservable();
  }
}