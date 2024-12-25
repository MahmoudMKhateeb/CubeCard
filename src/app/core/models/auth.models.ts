export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  country?: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data?: {
    user: {
      id: number;
      first_name: string;
      last_name: string;
      name: string;
      mobile_number: string;
      email: string;
      country: string;
      is_phone_verified: boolean;
      email_verified_at: string | null;
      created_at: string;
      updated_at: string;
    };
    access_token: string;
    token_type: string;
    requires_otp: boolean;
  };
  timestamp: string;
}

export interface LoginFormErrors {
  username: string | null;
  password: string | null;
  general: string | null;
}

export interface RegisterFormErrors {
  first_name: string | null;
  last_name: string | null;
  mobile_number: string | null;
  email: string | null;
  password: string | null;
  password_confirmation: string | null;
  general: string | null;
}