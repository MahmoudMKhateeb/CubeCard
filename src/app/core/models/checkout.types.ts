export interface CheckoutResponse {
  success: boolean;
  message: string;
  order_uuid: string;
  checkout_session_id: string;
}