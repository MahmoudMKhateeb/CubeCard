export interface PaymentForm {
  paymentMethod: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface PaymentErrors {
  paymentMethod: string | null;
  general: string | null;
}