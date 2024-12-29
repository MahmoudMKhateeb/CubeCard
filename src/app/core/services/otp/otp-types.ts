export interface OtpResponse {
  status: string;
  message: string | null;
  data: {
    message: string;
    is_verified: boolean;
  };
  timestamp: string;
}

export interface OtpRequest {
  mobile_number: string;
  otp?: string;
}