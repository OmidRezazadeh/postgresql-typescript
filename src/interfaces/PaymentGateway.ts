export interface PaymentGateway {
    processPayment(cart: any): void;
  }