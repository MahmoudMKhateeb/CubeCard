export interface PaymentForm {
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  paymentMethod: string;
}

export interface PaymentFormErrors {
  phone: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  paymentMethod: string | null;
}
