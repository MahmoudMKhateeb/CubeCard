export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileRequest {
  first_name: string;
  last_name: string;
  email: string;
  current_password?: string;
  password?: string;
  password_confirmation?: string;
}

export interface UpdateProfileResponse {
  status: string;
  message: string;
  data?: User;
  errors?: {
    [key: string]: string[];
  };
}