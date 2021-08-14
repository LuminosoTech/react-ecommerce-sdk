import { PaymentMethod } from "./PaymentMethod";

export interface BillingClient {
  addPaymentMethod(data: PaymentMethod): Promise<string>;
}
