import {
  CheckoutService as SdkCheckoutService,
  AccountBody,
  CustomerAddress,
  ShippingRate,
  CustomerSessionCheckout,
  PaymentService,
  ShippingSupportedCountry,
} from "@luminoso/ecommerce-sdk";
import { BillingClient, PaymentMethod } from "../../models/billing";

export class CheckoutService {
  private billingClient?: BillingClient;
  private sdkCheckoutService: SdkCheckoutService;
  private paymentService: PaymentService;

  constructor(paymentService: PaymentService, sdkCheckoutService: SdkCheckoutService, billingClient?: BillingClient) {
    this.billingClient = billingClient;
    this.paymentService = paymentService;
    this.sdkCheckoutService = sdkCheckoutService;
  }

  public postAccountInfo = (body: Partial<AccountBody>) => {
    this.sdkCheckoutService.postAccountInfo(body);
  };

  public getAddressAutocomplete = (address: string) => {
    return this.sdkCheckoutService.getAddressAutocomplete(address);
  };

  public getCustomerSessionCheckout = (): Promise<CustomerSessionCheckout> => {
    return this.sdkCheckoutService.getCustomerSessionCheckout();
  };

  public getSupportedShippingLocations = (): Promise<ShippingSupportedCountry[]> => {
    return this.sdkCheckoutService.getSupportedShippingLocations();
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

  public postPaymentMethod = async (data: PaymentMethod): Promise<string> => {
    if (this.billingClient) {
      const nonce = await this.billingClient?.addPaymentMethod(data);

      await this.paymentService.postPaymentMethod(nonce);

      return "done";
    }

    return "billintClientNotInitialized";
  };

  public placeOrder = () => {
    return this.sdkCheckoutService.postPlaceOrder();
  };
}
