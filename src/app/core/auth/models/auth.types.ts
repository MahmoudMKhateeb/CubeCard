// Core authentication types
export interface AuthState {
  isLoggedIn: boolean;
  isOtpVerified: boolean;
  user: User | null;
  token: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  mobile_number: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  requiresOtp: boolean;
}

export interface AuthError {
  code: string;
  message: string;
}