export interface RegisterFormErrors {
  first_name: string;
  last_name: string;
  mobile_number: string;
  email: string;
  password: string;
  password_confirmation: string;
  general: string;
}

export interface LoginFormErrors {
  name: string;
  password: string;
  general: string;
}