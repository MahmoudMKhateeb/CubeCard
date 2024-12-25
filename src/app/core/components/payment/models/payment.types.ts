export interface PaymentForm {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentMethod: string;
}

export interface PaymentErrors {
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  paymentMethod: string | null;
  general: string | null;
}

export interface PaymentTouched {
  phone: boolean;
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  paymentMethod: boolean;
}