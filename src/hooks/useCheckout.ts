import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BillingClient } from "../models/billing";
import { CheckoutService } from "../services/billing/CheckoutService";
import { BraintreeBillingClient } from "../services/client/BraintreeBillingClient";
import { RootState } from "../store/reducers";
import { CheckoutState } from "../store/reducers/checkout";
import { CoreState } from "../store/reducers/core/coreReducer";

export const useCheckout = () => {
  const { ecommerceInstance } = useSelector<RootState, CoreState>((state) => state.core);
  const { billingClient } = useSelector<RootState, CheckoutState>((state) => state.checkout);

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
