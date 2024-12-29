export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  phone: string;
  mobile_number: string;
}

export interface AuthResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    user: User;
    access_token: string;
    token_type: string;
    requires_otp: boolean;
  };
  timestamp: string;
}

export interface OtpVerificationResponse {
  success: boolean;
  status: 'success' | 'error';
  message: string;
  data?: {
    is_phone_verified: boolean;
    message?: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}