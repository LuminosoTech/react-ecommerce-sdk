import { Client } from "braintree-web";

import { Action } from "../../../models/store/Action";
import { update } from "../../../utils/redux";
import { SET_BILLING_CLIENT, POST_PAYMENT_METHOD } from "../../types/checkout";

export interface CheckoutState {
  isFetchingBillingClient: boolean;
  billingClient?: Client;
  isPostingPaymentMethod: boolean;
}

const initialState: CheckoutState = {
  isFetchingBillingClient: false,
  billingClient: undefined,
  isPostingPaymentMethod: false,
};

const checkoutReducer = (state = initialState, action: Action): CheckoutState => {
  switch (action.type) {
    case SET_BILLING_CLIENT.REQUEST:
      return update(state, {
        isFetchingBillingClient: true,
      });
    case SET_BILLING_CLIENT.SUCCESS:
      return update(state, {
        isFetchingBillingClient: false,
        billingClient: action.payload,
      });
    case SET_BILLING_CLIENT.FAILURE:
      return update(state, {
        isFetchingBillingClient: false,
      });
    case POST_PAYMENT_METHOD.REQUEST:
      return update(state, {
        isPostingPaymentMethod: true,
      });
    case POST_PAYMENT_METHOD.SUCCESS:
      return update(state, {
        isPostingPaymentMethod: false,
      });
    case POST_PAYMENT_METHOD.FAILURE:
      return update(state, {
        isPostingPaymentMethod: false,
      });
    default:
      return state;
  }
};

export default checkoutReducer;
