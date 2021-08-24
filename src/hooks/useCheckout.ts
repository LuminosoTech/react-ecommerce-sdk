import { useContext, useEffect, useState } from "react";
import { BillingClient } from "../models/billing";
import { CheckoutService } from "../services/billing/CheckoutService";
import { BraintreeBillingClient } from "../services/client/BraintreeBillingClient";
import { context } from "../store";

export const useCheckout = () => {
  const { state } = useContext(context);

  const { core, checkout } = state;

  const { ecommerceInstance } = core;
  const { billingClient } = checkout;

  const [checkoutServiceState, setCheckoutServiceState] = useState<CheckoutService>();

  useEffect(() => {
    const sdkCheckoutService = ecommerceInstance?.checkoutService();

    if (sdkCheckoutService) {
      let braintreeBillingClient: BillingClient | undefined = undefined;

      if (billingClient) {
        braintreeBillingClient = new BraintreeBillingClient(billingClient);
      }

      const checkoutService = new CheckoutService(sdkCheckoutService, braintreeBillingClient);

      setCheckoutServiceState(checkoutService);
    }
  }, [ecommerceInstance]);

  return checkoutServiceState;
};
