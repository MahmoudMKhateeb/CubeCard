// Request/Response interfaces
export interface OtpVerificationRequest {
  mobile_number: string;
  otp: string;
}

export interface OtpResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    requires_otp: boolean;
    expires_at?: string;
  };
}

// State interfaces
export interface OtpState {
  isVerified: boolean;
  lastVerifiedAt?: Date;
  attemptsRemaining: number;
}

export interface TimerState {
  timeRemaining: number;
  isExpired: boolean;
}