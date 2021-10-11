import { Stripe } from "@stripe/stripe-js";
import { BillingClient, PaymentMethod } from "../../models/billing";

export class StripeBillingClient implements BillingClient {
  private billingClient: Stripe;

  constructor(billingClient: Stripe) {
    this.billingClient = billingClient;
    billingClient.createToken("");
  }

  public addPaymentMethod = (paymentMethod: PaymentMethod): Promise<string> => {
    return new Promise((resolve, reject) => {});
  };
}
