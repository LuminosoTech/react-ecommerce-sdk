import {
  CheckoutService as SdkCheckoutService,
  AccountBody,
  ShippingAccount,
  CustomerAddress,
  ClientPaymentToken,
} from "@luminoso/ecommerce-sdk";
import { BillingClient, PaymentMethod } from "../../models/billing";

export class CheckoutService {
  private billingClient: BillingClient;
  private sdkCheckoutService: SdkCheckoutService;

  constructor(billingClient: BillingClient, sdkCheckoutService: SdkCheckoutService) {
    this.billingClient = billingClient;
    this.sdkCheckoutService = sdkCheckoutService;
  }

  public postAccountInfo = (body: Partial<AccountBody>) => {
    this.sdkCheckoutService.postAccountInfo(body);
  };

  public getAddressAutocomplete = (address: string) => {
    this.sdkCheckoutService.getAddressAutocomplete(address);
  };

  public postCustomerAddress = (body: Partial<CustomerAddress>) => {
    this.sdkCheckoutService.postCustomerAddress(body);
  };

  public getClientPaymentToken = (): Promise<ClientPaymentToken> => {
    return this.sdkCheckoutService.getClientPaymentToken();
  };

  public postPaymentMethod = async (data: PaymentMethod): Promise<string> => {
    const nonce = await this.billingClient.addPaymentMethod(data);

    await this.sdkCheckoutService.postPaymentMethod(nonce);

    return "done";
  };
}
