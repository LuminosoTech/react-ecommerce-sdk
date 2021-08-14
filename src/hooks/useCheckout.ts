import { useSelector } from "react-redux";
import { CheckoutService } from "../services/billing/CheckoutService";
import { BraintreeBillingClient } from "../services/client/BraintreeBillingClient";
import { RootState } from "../store/reducers";
import { CheckoutState } from "../store/reducers/checkout";
import { CoreState } from "../store/reducers/core/coreReducer";

export const useCheckout = () => {
  const { ecommerceInstance } = useSelector<RootState, CoreState>((state) => state.core);
  const { billingClient } = useSelector<RootState, CheckoutState>((state) => state.checkout);

  const sdkCheckoutService = ecommerceInstance?.checkoutService();

  if (billingClient && sdkCheckoutService) {
    const braintreeBillingClient = new BraintreeBillingClient(billingClient);

    const checkoutService = new CheckoutService(braintreeBillingClient, sdkCheckoutService);

    return checkoutService;
  }

  return undefined;
};
