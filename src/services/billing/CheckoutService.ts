import {
  CheckoutService as SdkCheckoutService,
  AccountBody,
  CustomerAddress,
  ClientPaymentToken,
  ShippingRate,
  CustomerSessionCheckout,
} from "@luminoso/ecommerce-sdk";
import { BillingClient, PaymentMethod } from "../../models/billing";

export class CheckoutService {
  private billingClient?: BillingClient;
  private sdkCheckoutService: SdkCheckoutService;

  constructor(sdkCheckoutService: SdkCheckoutService, billingClient?: BillingClient) {
    this.billingClient = billingClient;
    this.sdkCheckoutService = sdkCheckoutService;
  }

  public postAccountInfo = (body: Partial<AccountBody>) => {
    this.sdkCheckoutService.postAccountInfo(body);
  };

  public getAddressAutocomplete = (address: string) => {
    this.sdkCheckoutService.getAddressAutocomplete(address);
  };

  public getCustomerSessionCheckout = (): Promise<CustomerSessionCheckout> => {
    return this.sdkCheckoutService.getCustomerSessionCheckout();
  };

  public getShippingRates = (): Promise<ShippingRate[]> => {
    return this.sdkCheckoutService.getShippingRates();
  };

  public postSelectedShippingRate = (rateId: string): Promise<void> => {
    return this.sdkCheckoutService.postSelectedShippingRate(rateId);
  };

  public postCustomerAddress = (body: Partial<CustomerAddress>) => {
    this.sdkCheckoutService.postCustomerAddress(body);
  };

  public getClientPaymentToken = (): Promise<ClientPaymentToken> => {
    return this.sdkCheckoutService.getClientPaymentToken();
  };

  public postPaymentMethod = async (data: PaymentMethod): Promise<string> => {
    if (this.billingClient) {
      const nonce = await this.billingClient?.addPaymentMethod(data);

      await this.sdkCheckoutService.postPaymentMethod(nonce);

      return "done";
    }

    return "billintClientNotInitialized";
  };
}
