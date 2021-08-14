import { Client } from "braintree-web";
import { BillingClient, PaymentMethod } from "../../models/billing";

export class BraintreeBillingClient implements BillingClient {
  private billingClient: Client;

  constructor(billingClient: Client) {
    this.billingClient = billingClient;
  }

  public addPaymentMethod = (paymentMethod: PaymentMethod): Promise<string> => {
    return new Promise((resolve, reject) => {
      const data = {
        creditCard: {
          number: paymentMethod.cardNumber,
          cvv: paymentMethod.cvv,
          expirationDate: paymentMethod.expiryDate,
          billingAddress: {
            postalCode: paymentMethod.postalCode,
          },
          options: {
            validate: false,
          },
        },
      };

      this.billingClient.request(
        {
          endpoint: "payment_methods/credit_cards",
          method: "post",
          data: data,
        },
        function (requestErr, response) {
          if (requestErr) {
            reject(new Error(requestErr.message));
          }

          console.log("SUCCESS", response);

          resolve(response.creditCards[0].nonce);
        }
      );
    });
  };
}
