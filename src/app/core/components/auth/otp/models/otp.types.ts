export interface OTPDigit {
  value: string;
  index: number;
}

export interface OTPVerificationState {
  isLoading: boolean;
  error: string | null;
  isVerified: boolean;
  remainingTime: number;
  canResend: boolean;
}

export interface OTPResponse {
  status: 'success' | 'error';
  message: string;
  data?: {
    verified: boolean;
    expiresAt?: string;
  };
}